import React from 'react';
import { resolveAssetUrl } from '../utils/assetPath';

// The 5 × 5 transparent atlas contains real travel motifs.
// Six names have been restored at source so none of their lettering is clipped.
const magnetAtlas = resolveAssetUrl('/assets/travel-magnets-atlas.webp');
const magnets = [
  'Paris', 'Dubai', 'Egypt', 'Halkidiki', 'Dominican Republic',
  'Zanzibar', 'Mexico', 'Berlin', 'Gdańsk', 'Barcelona',
  'Bielefeld', 'Lech Poznań', 'Köln', 'Trzemeszno', 'Amsterdam',
  'Riga', 'Mallorca', 'Rom', 'Ksamil', 'Étretat',
  'Lanzarote', 'Malta', 'Greece', 'Santa Maria di Leuca', 'Lecce',
] as const;

type Placement = 'top' | 'side' | 'between' | 'textEnd' | 'bottom';

// No duplicates: every one of the 25 souvenirs appears once.
// Move a small collection into the space below the personal text,
// instead of leaving a large empty rectangle on the left.
const groups: Record<Placement, number[]> = {
  top: [0, 1, 2, 3],
  side: [4, 5, 6, 7, 8],
  between: [9, 10, 11, 12],
  textEnd: [13, 14, 15, 16, 17, 18, 19, 20],
  bottom: [21, 22, 23, 24],
};

const angles = [-7, 5, -4, 6, -5, 7, -6, 4, -4, 5, -3, 7, -6, 4, -5, 6, -7, 5, -4, 7, -5, 6, -6, 5, -4];
const dx = [-4, 5, -2, 4, 3, -4, 5, -2, 4, -4, 3, -5, 4, 5, -3, 4, -5, 2, -3, 4, -2, 3, -4, 4, -2];
const dy = [4, -2, 3, -3, 5, -4, 2, -3, 4, 5, -3, 2, -4, 2, -5, 4, -2, 3, -4, 5, -2, 3, -4, 4, -2];

const layouts: Record<Placement, string> = {
  top: 'mx-auto mb-6 max-w-[820px] grid-cols-2 min-[420px]:grid-cols-4 gap-x-5 gap-y-5 border-y border-[#C7A35A]/10 py-4 sm:py-5',
  side: 'my-3 grid-cols-2 min-[390px]:grid-cols-3 gap-x-3 gap-y-4 sm:my-5',
  between: 'my-1 grid-cols-2 gap-x-4 gap-y-4 sm:my-2',
  textEnd: 'mt-7 max-w-[560px] grid-cols-2 min-[420px]:grid-cols-3 sm:grid-cols-4 gap-x-4 gap-y-5 border-t border-[#C7A35A]/15 pt-5',
  bottom: 'mx-auto mt-4 max-w-[800px] grid-cols-2 min-[420px]:grid-cols-4 gap-x-4 gap-y-5 border-t border-[#C7A35A]/10 px-2 pt-5',
};

/** Presentational magnets never overlap paragraph content or active controls. */
export const TravelMagnets: React.FC<{ placement: Placement }> = ({ placement }) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none relative grid w-full items-center justify-items-center ${layouts[placement]}`}
  >
    {groups[placement].map((index) => {
      const col = index % 5;
      const row = Math.floor(index / 5);
      return (
        <span
          key={magnets[index]}
          title={magnets[index]}
          data-magnet={magnets[index]}
          className="block h-[67px] w-[86px] shrink-0 bg-no-repeat drop-shadow-[0_5px_8px_rgba(0,0,0,0.65)] sm:h-[80px] sm:w-[103px]"
          style={{
            backgroundImage: `url("${magnetAtlas}")`,
            backgroundSize: '500% 500%',
            backgroundPosition: `${col * 25}% ${row * 25}%`,
            transform: `translate(${dx[index]}px, ${dy[index]}px) rotate(${angles[index]}deg)`,
          }}
        />
      );
    })}
  </div>
);
