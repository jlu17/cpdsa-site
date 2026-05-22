import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_WEIGHTS } from '@/lib/constants/typography';
import SkateCircleMapSvg from './SkateCircleMapSvg';

interface LegendItem {
  label: string;
  type: 'dot' | 'bar';
  color: string;
  icon?: 'star' | 'signal';
}

const LEGEND_ITEMS: LegendItem[] = [
  { label: 'Entrance', type: 'dot', color: COLORS.brand.purple, icon: 'star' },
  { label: 'DJ Booth', type: 'dot', color: COLORS.brand.purple, icon: 'signal' },
  { label: 'Fencing', type: 'bar', color: COLORS.text.muted },
  { label: 'Bench', type: 'bar', color: COLORS.ui.bench },
  { label: 'Painted areas', type: 'bar', color: 'rgba(255,255,255,0.6)' },
  { label: 'Green space', type: 'bar', color: COLORS.brand.green },
];

export default function SkateMap() {
  return (
    <div className="flex flex-col gap-2 w-full sm:flex-shrink-0 sm:w-[643px]" style={{ opacity: 0.7 }}>
      {/* Map illustration — inline SVG preserves crisp vector rendering at any size */}
      <div className="rounded-[4px] overflow-hidden aspect-[643/833]" style={{ backgroundColor: '#a7a7a7' }}>
        <SkateCircleMapSvg className="w-full h-full" />
      </div>

      {/* Legend */}
      <div className="flex gap-6 items-start px-4 flex-wrap">
        {LEGEND_ITEMS.map(({ label, type, color, icon }) => (
          <div key={label} className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <LegendIcon type={type} color={color} icon={icon} />
              <span
                className="text-sm whitespace-nowrap"
                style={{ fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.medium, color: COLORS.text.body, letterSpacing: '0.14px' }}
              >
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LegendIcon({ type, color, icon }: Pick<LegendItem, 'type' | 'color' | 'icon'>) {
  return (
    <div
      className="flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0"
      style={{ border: `1px solid ${COLORS.border.subtle}` }}
    >
      {type === 'dot' && icon === 'star' && <StarIcon color={color} />}
      {type === 'dot' && icon === 'signal' && <SignalIcon color={color} />}
      {type === 'bar' && <BarIcon color={color} />}
    </div>
  );
}

function StarIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={color} stroke="none" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function SignalIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16" />
    </svg>
  );
}

function BarIcon({ color }: { color: string }) {
  return (
    <span
      className="block rounded-sm"
      style={{ width: 14, height: 4, backgroundColor: color, border: color === 'rgba(255,255,255,0.6)' ? `1px solid ${COLORS.border.subtle}` : undefined }}
    />
  );
}
