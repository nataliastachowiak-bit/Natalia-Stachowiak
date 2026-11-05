import React from 'react';
import { resolveAssetUrl } from '../utils/assetPath';

// Individual magnet cutouts from the approved travel-magnet artwork.
// A single transparent atlas reduces network requests and keeps the collage lightweight.
const magnetAtlas = resolveAssetUrl('/assets/travel-magnets-atlas.webp');
const magnets = [
  'Paris', 'Dubai', 'Egypt', 'Halkidiki', 'Dominican Republic',
  'Zanzibar', 'Mexico', 'Berlin', 'Gdańsk', 'Barcelona',
  'Bielefeld', 'Lech Poznań', 'Köln', 'Trzemeszno', 'Amsterdam',
  'Riga', 'Mallorca', 'Rom', 'Ksamil', 'Étretat',
  'Lanzarote', 'Malta', 'Greece', 'Santa Maria di Leuca', 'Lecce',
];

type Placement = 'top' | 'side' | 'bottom';

const groups: Record<Placement, number[]> = {
  top: [0, 1, 2, 3, 4, 5, 6, 7],
  side: [8, 9, 10, 11, 12, 13],
  bottom: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
};

// Small, controlled offsets preserve the scattered look without cutting off a souvenir.
// Each magnet occupies its own responsive grid cell.
const rotation = [-5, 4, -3, 5, -4, 3, -5, 4, -3, 5, -4, 3, -3, 5, -4, 3, 4, -3, 5, -4, 3, -5, 4, -3, 3];
const offset = [2, -2, 1, 3, -1, 2, -2, 1, 2, -1, 3, -1, 2, -2, 1, 3, -2, 1, -2, 2, -1, 2, 1, -2, 1];

const layout: Record<Placement, string> = {
  top: 'mx-auto mb-7 max-w-[950px] grid-cols-3 min-[420px]:grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 border-y border-[#C7A35A]/10 py-5',
  side: 'my-5 sm:my-7 grid-cols-3 gap-y-6',
  bottom: 'mx-auto mt-9 max-w-[950px] grid-cols-3 min-[420px]:grid-cols-4 sm:grid-cols-6 lg:grid-cols-7 border-t border-[#C7A35A]/15 pt-7',
};

/** The souvenirs are decoration, never covering copy or blocking any controls. */
export const TravelMagnets: React.FC<{ placement: Placement }> = ({ placement }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none grid w-full justify-items-center items-center gap-x-4 gap-y-6 sm:gap-x-5 sm:gap-y-7 ${layout[placement]}`}
    >
      {groups[placement].map((index) => {
        const col = index % 5;
        const row = Math.floor(index / 5);
        return (
          <span
            key={magnets[index]}
            title={magnets[index]}
            data-magnet={magnets[index]}
            className="block h-[56px] w-[72px] shrink-0 bg-no-repeat drop-shadow-[0_5px_7px_rgba(0,0,0,0.65)] sm:h-[70px] sm:w-[90px]"
            style={{
              backgroundImage: `url("${magnetAtlas}")`,
              backgroundSize: '500% 500%',
              backgroundPosition: `${col * 25}% ${row * 25}%`,
              transform: `rotate(${rotation[index]}deg) translateY(${offset[index]}px)`,
            }}
          />
        );
      })}
    </div>
  );
};
