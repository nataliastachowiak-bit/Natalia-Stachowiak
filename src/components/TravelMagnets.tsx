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

const rotation = [-7, 5, -4, 9, -5, 3, -8, 7, -4, 6, -6, 5, -3, 8, -7, 3, 6, -5, 9, -4, 3, -8, 7, -5, 4];
const offset = [4, -4, 2, 7, -2, 5, -5, 3, 4, -3, 6, -2, 4, -5, 3, 6, -4, 2, -5, 4, -3, 5, 2, -4, 3];

/** The souvenirs are decoration, never covering copy or blocking any controls. */
export const TravelMagnets: React.FC<{ placement: Placement }> = ({ placement }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none flex flex-wrap items-center justify-center gap-x-0.5 gap-y-1 sm:gap-x-2 sm:gap-y-2 ${placement === 'top' ? 'mx-auto mb-7 max-w-[860px] justify-around border-y border-[#C7A35A]/10 py-3' : placement === 'side' ? 'my-5 sm:my-7' : 'mx-auto mt-9 max-w-[890px] border-t border-[#C7A35A]/15 pt-6'}`}
    >
      {groups[placement].map((index) => {
        const col = index % 5;
        const row = Math.floor(index / 5);
        return (
          <span
            key={magnets[index]}
            title={magnets[index]}
            className="block h-[56px] w-[72px] shrink-0 bg-no-repeat drop-shadow-[0_5px_7px_rgba(0,0,0,0.65)] sm:h-[73px] sm:w-[94px]"
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
