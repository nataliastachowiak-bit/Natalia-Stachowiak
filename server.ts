import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Modality } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error('GEMINI_API_KEY is not configured in server environment.');
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '25mb' }));

  // Ensure public and static uploads/assets folders exist
  const publicDir = path.join(process.cwd(), 'public');
  const assetsDir = path.join(publicDir, 'assets');
  const uploadsDir = path.join(publicDir, 'uploads');
  const dataDir = path.join(process.cwd(), 'data');

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Explicit static file serving for assets and uploads
  app.get(['/assets/ChatGPT-Bild*', '/ChatGPT-Bild*'], (req, res, next) => {
    const targetFile = path.join(assetsDir, 'ChatGPT-Bild 29. Sept. 2026, 12_37_59.png');
    if (fs.existsSync(targetFile)) {
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      return res.sendFile(targetFile);
    }
    next();
  });

  // Dedicated robust handler for ALL PDF requests (CV and certificates) with proper MIME, inline disposition & CORS
  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    const cleanPath = req.path.toLowerCase();
    if (!cleanPath.endsWith('.pdf')) return next();

    try {
      const decodedUrl = decodeURIComponent(req.path);
      const filename = path.basename(decodedUrl);
      const candidates = [
        path.join(publicDir, decodedUrl),
        path.join(assetsDir, filename),
        path.join(assetsDir, 'certificates', filename),
        path.join(publicDir, filename),
      ];
      for (const file of candidates) {
        if (fs.existsSync(file) && fs.statSync(file).isFile()) {
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'inline; filename="' + encodeURIComponent(filename) + '"');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
          res.setHeader('Cache-Control', 'public, max-age=3600');
          return res.sendFile(file);
        }
      }
    } catch (err) {
      console.error('[PDF Handler] Error serving PDF:', err);
    }
    next();
  });

  const imagesDir = path.join(publicDir, 'images');

  app.use('/assets', express.static(assetsDir, { maxAge: '1h' }));
  app.use('/images', express.static(imagesDir, { maxAge: '1h' }));
  app.use('/uploads', express.static(uploadsDir, { maxAge: '1h' }));
  app.use(express.static(publicDir));

  const mediaStorageFile = path.join(dataDir, 'server_media.json');

  // API Routes FIRST
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // Media sync: GET all server-persisted media assets (sync across devices)
  app.get('/api/media', (req, res) => {
    try {
      if (fs.existsSync(mediaStorageFile)) {
        const data = fs.readFileSync(mediaStorageFile, 'utf-8');
        return res.json({ success: true, media: JSON.parse(data) });
      }
      return res.json({ success: true, media: {} });
    } catch (err: any) {
      console.warn('Could not read server media storage:', err);
      return res.status(500).json({ error: 'Failed to read media storage' });
    }
  });

  // Media sync: POST save or update an asset
  app.post('/api/media/save', (req, res) => {
    try {
      const { key, value } = req.body;
      if (!key) {
        return res.status(400).json({ error: 'Key is required' });
      }

      let currentMedia: Record<string, string> = {};
      if (fs.existsSync(mediaStorageFile)) {
        try {
          currentMedia = JSON.parse(fs.readFileSync(mediaStorageFile, 'utf-8'));
        } catch {}
      }

      let finalValue = value;
      // If value is a base64 image string, write to uploads directory for permanent clean URL
      if (typeof value === 'string' && value.startsWith('data:image/')) {
        const matches = value.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
        if (matches) {
          const rawExt = matches[1].toLowerCase();
          const ext = rawExt.includes('png') ? 'png' : rawExt.includes('webp') ? 'webp' : 'jpg';
          const base64Data = matches[2];
          const fileName = `${key}_${Date.now()}.${ext}`;
          const filePath = path.join(uploadsDir, fileName);
          fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
          finalValue = `/uploads/${fileName}`;
          console.log(`[Media] Saved uploaded image to ${filePath} -> ${finalValue}`);
        }
      } else if (typeof value === 'string' && value.startsWith('data:application/pdf;base64,')) {
        const base64Data = value.replace(/^data:application\/pdf;base64,/, '');
        const fileName = `${key}_${Date.now()}.pdf`;
        const filePath = path.join(uploadsDir, fileName);
        fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
        finalValue = `/uploads/${fileName}`;
        console.log(`[Media] Saved uploaded PDF to ${filePath} -> ${finalValue}`);
      }

      if (finalValue === '') {
        delete currentMedia[key];
      } else {
        currentMedia[key] = finalValue;
      }

      fs.writeFileSync(mediaStorageFile, JSON.stringify(currentMedia, null, 2), 'utf-8');
      return res.json({ success: true, key, value: finalValue });
    } catch (err: any) {
      console.error('[Media] Error saving media asset:', err);
      return res.status(500).json({ error: 'Failed to save media asset' });
    }
  });

  const certsDir = path.join(assetsDir, 'certificates');
  if (!fs.existsSync(certsDir)) {
    fs.mkdirSync(certsDir, { recursive: true });
  }
  const certsMetaFile = path.join(dataDir, 'certificates_meta.json');

  // Certificate Status: check all certificate files on disk
  app.get('/api/certificates/status', (req, res) => {
    try {
      let meta: Record<string, any> = {};
      if (fs.existsSync(certsMetaFile)) {
        try {
          meta = JSON.parse(fs.readFileSync(certsMetaFile, 'utf-8'));
        } catch {}
      }

      const files = fs.existsSync(certsDir) ? fs.readdirSync(certsDir) : [];
      const statusMap: Record<string, { exists: boolean; size: number; path: string; updatedAt?: string; isAuthentic?: boolean }> = {};

      for (const file of files) {
        if (!file.endsWith('.pdf')) continue;
        const filePath = path.join(certsDir, file);
        const stats = fs.statSync(filePath);
        const id = file.replace(/\.pdf$/, '');
        statusMap[id] = {
          exists: stats.size > 0,
          size: stats.size,
          path: `/assets/certificates/${file}`,
          updatedAt: stats.mtime.toISOString(),
          isAuthentic: meta[id]?.isAuthentic ?? (stats.size > 0),
        };
      }

      res.json({ success: true, certificates: statusMap, meta });
    } catch (err: any) {
      console.error('[Certificates] Error getting status:', err);
      res.status(500).json({ error: 'Failed to retrieve certificate status' });
    }
  });

  // Certificate Upload: upload authentic original PDF
  app.post('/api/certificates/upload', (req, res) => {
    try {
      const { certId, pdfBase64, fileName } = req.body;
      if (!certId || !pdfBase64) {
        return res.status(400).json({ error: 'certId and pdfBase64 are required' });
      }

      const cleanBase64 = pdfBase64.replace(/^data:application\/pdf;base64,/, '');
      const buffer = Buffer.from(cleanBase64, 'base64');

      // Verify PDF header magic bytes "%PDF-"
      if (buffer.length < 5 || buffer.toString('utf-8', 0, 5) !== '%PDF-') {
        return res.status(400).json({ error: 'Invalid file format. File must be an authentic PDF document starting with %PDF-.' });
      }

      // Save to public/assets/certificates/<certId>.pdf
      const targetFilePath = path.join(certsDir, `${certId}.pdf`);
      fs.writeFileSync(targetFilePath, buffer);
      console.log(`[Certificates] Stored authentic PDF for ${certId} (${buffer.length} bytes) at ${targetFilePath}`);

      // Also copy to dist if dist exists
      const distCertsDir = path.join(process.cwd(), 'dist', 'assets', 'certificates');
      if (fs.existsSync(distCertsDir)) {
        fs.writeFileSync(path.join(distCertsDir, `${certId}.pdf`), buffer);
      }

      // Also copy with original fileName if available
      if (fileName && fileName.endsWith('.pdf')) {
        const cleanName = path.basename(fileName);
        fs.writeFileSync(path.join(certsDir, cleanName), buffer);
        fs.writeFileSync(path.join(publicDir, cleanName), buffer);
      }

      // Update certificates_meta.json
      let meta: Record<string, any> = {};
      if (fs.existsSync(certsMetaFile)) {
        try {
          meta = JSON.parse(fs.readFileSync(certsMetaFile, 'utf-8'));
        } catch {}
      }
      meta[certId] = {
        certId,
        fileName: fileName || `${certId}.pdf`,
        fileSize: buffer.length,
        uploadedAt: new Date().toISOString(),
        isAuthentic: true,
      };
      fs.writeFileSync(certsMetaFile, JSON.stringify(meta, null, 2), 'utf-8');

      const pdfUrl = `/assets/certificates/${certId}.pdf`;
      return res.json({
        success: true,
        certId,
        pdfUrl,
        fileSize: buffer.length,
        fileName: fileName || `${certId}.pdf`,
      });
    } catch (err: any) {
      console.error('[Certificates] Error uploading certificate:', err);
      return res.status(500).json({ error: 'Failed to upload certificate PDF' });
    }
  });

  // Music generation with Lyria (lyria-3-clip-preview / lyria-3-pro-preview)
  app.post('/api/music/generate', async (req, res) => {
    try {
      const { prompt, model = 'lyria-3-clip-preview', section } = req.body;
      if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ error: 'Prompt is required and must be a string' });
      }

      const validModels = ['lyria-3-clip-preview', 'lyria-3-pro-preview'];
      const selectedModel = validModels.includes(model) ? model : 'lyria-3-clip-preview';

      const ai = getAI();

      console.log(`[Music] Generating track with ${selectedModel} for prompt: "${prompt.slice(0, 80)}..."`);

      const response = await ai.models.generateContentStream({
        model: selectedModel,
        contents: prompt,
        config: {
          responseModalities: [Modality.AUDIO],
        },
      });

      let audioBase64 = '';
      let lyrics = '';
      let mimeType = 'audio/wav';

      for await (const chunk of response) {
        const parts = chunk.candidates?.[0]?.content?.parts;
        if (!parts) continue;

        for (const part of parts) {
          if (part.inlineData?.data) {
            if (!audioBase64 && part.inlineData.mimeType) {
              mimeType = part.inlineData.mimeType;
            }
            audioBase64 += part.inlineData.data;
          }
          if (part.text && !lyrics) {
            lyrics = part.text;
          }
        }
      }

      if (!audioBase64) {
        return res.status(502).json({
          error: 'No audio data received from Lyria model',
        });
      }

      res.json({
        success: true,
        audioBase64,
        mimeType,
        lyrics,
        model: selectedModel,
        section: section || 'general',
      });
    } catch (err: any) {
      console.error('[Music] Error generating music:', err);
      const isMissingKey = !process.env.GEMINI_API_KEY;
      res.status(isMissingKey ? 401 : 500).json({
        error: err.message || 'Failed to generate music track with Lyria',
        isMissingKey,
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
