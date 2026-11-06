import React from 'react';
import { resolveAssetUrl } from '../utils/assetPath';

// Transparent, uncropped 5x5 sprite sheet: all 25 genuine travel souvenir motifs stay visible.
const magnetAtlas = resolveAssetUrl('/assets/travel-magnets-atlas.webp');
const magnets = [
  'Paris', 'Dubai', 'Egypt', 'Halkidiki', 'Dominican Republic',
  'Zanzibar', 'Mexico', 'Berlin', 'Gdańsk', 'Barcelona',
  'Bielefeld', 'Lech Poznań', 'Köln', 'Trzemeszno', 'Amsterdam',
  'Riga', 'Mallorca', 'Rom', 'Ksamil', 'Étretat',
  'Lanzarote', 'Malta', 'Greece', 'Santa Maria di Leuca', 'Lecce',
];

type Placement = 'top' | 'side' | 'between' | 'bottom';

// Each magnet appears exactly once, in small independent pockets of negative space.
// The original two-row, eleven-magnet strip below the narrative is replaced by five.
const groups: Record<Placement, number[]> = {
  top: [0, 1, 2, 3, 4, 5, 6, 7],
  side: [8, 9, 10, 11, 12, 13, 14, 15],
  between: [16, 17, 18, 19],
  bottom: [20, 21, 22, 23, 24],
};

// Irregular yet restrained tilt and offset. The icon remains entirely in its grid cell.
const rotation = [-8, 6, -5, 9, -7, 5, -6, 8, -4, 8, -7, 5, -8, 6, -5, 7, 9, -5, 8, -7, -6, 7, -5, 8, -4];
const offsetY = [4, -3, 2, -5, 5, -2, 3, -4, -3, 5, -4, 2, -3, 4, -2, 5, -3, 4, -5, 3, 5, -3, 3, -4, 2];
const offsetX = [-2, 4, -4, 3, -3, 2, -3, 4, 4, -3, 3, -4, 2, -3, 4, -2, 3, -2, 4, -3, 2, -3, 3, -4, 2];

// On narrow screens the souvenirs wrap, not overlap photos or paragraph text.
const layouts: Record<Placement, string> = {
  top: 'mx-auto mb-8 max-w-[980px] grid-cols-3 min-[420px]:grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-x-1 gap-y-5 border-y border-[#C7A35A]/10 px-1 py-6 sm:gap-y-7 lg:gap-x-1',
  side: 'my-4 grid-cols-2 min-[390px]:grid-cols-3 gap-x-2 gap-y-5 sm:my-6 sm:gap-x-2 sm:gap-y-7',
  between: 'my-1 grid-cols-2 gap-x-2 gap-y-5 px-1 sm:my-3 sm:gap-y-7',
  bottom: 'mx-auto mt-5 max-w-[900px] grid-cols-2 min-[420px]:grid-cols-3 sm:grid-cols-5 gap-x-3 gap-y-6 border-t border-[#C7A35A]/15 px-2 pt-7 sm:gap-x-4',
};

/** Pure decoration. The magnet rows remain in normal layout flow and never cover the story. */
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
          className="block h-[67px] w-[86px] shrink-0 bg-no-repeat drop-shadow-[0_5px_7px_rgba(0,0,0,0.65)] sm:h-[84px] sm:w-[108px]"
          style={{
            backgroundImage: `url("${magnetAtlas}")`,
            backgroundSize: '500% 500%',
            backgroundPosition: `${col * 25}% ${row * 25}%`,
            transform: `translate(${offsetX[index]}px, ${offsetY[index]}px) rotate(${rotation[index]}deg)`,
          }}
        />
      );
    })}
  </div>
);
