import { FONT_WEIGHTS, FONTS } from '@/lib/constants/typography';
import { COLORS } from '@/lib/constants/colors';

const CANCELLED_COLOR = 'rgba(0,0,0,0.5)';

interface Props {
  names: string[];
  onDjClick?: (name: string) => void;
  mobileFontSize: number;
  desktopFontSize: number;
  color: string;
  cancelled?: boolean;
  cancelReason?: string | null;
  helperText?: string | null;
}

export default function DJNameDisplay({ names, onDjClick, mobileFontSize, desktopFontSize, color, cancelled, cancelReason, helperText }: Props) {
  if (!cancelled && names.length === 0) {
    const baseStyle = { fontFamily: FONTS.anton, color, letterSpacing: '0.26px' };
    return (
      <>
        <div className="block sm:hidden uppercase leading-[1.05] w-full" style={{ ...baseStyle, fontSize: mobileFontSize }}>Skating</div>
        <div className="hidden sm:block uppercase leading-[1.05] w-full" style={{ ...baseStyle, fontSize: desktopFontSize }}>Skating</div>
      </>
    );
  }

  const resolvedColor = cancelled ? CANCELLED_COLOR : color;
  const baseStyle = { fontFamily: FONTS.anton, color: resolvedColor, letterSpacing: '0.26px' };

  const content = cancelled
    ? <span>{cancelReason ?? 'NO SKATING'}</span>
    : names.map((name, i) => (
        <span key={name}>
          {i > 0 && ' B2B '}
          <span
            onClick={() => onDjClick?.(name)}
            style={{ cursor: onDjClick ? 'pointer' : undefined }}
          >
            {name}
          </span>
        </span>
      ));

  return (
    <>
      <div className="block sm:hidden uppercase leading-[1.05] w-full" style={{ ...baseStyle, fontSize: mobileFontSize }}>
        {content}
      </div>
      <div className="hidden sm:block uppercase leading-[1.05] w-full" style={{ ...baseStyle, fontSize: desktopFontSize }}>
        {content}
      </div>
      {helperText && (
        <p className="text-base mt-1 sm:block" style={{ color: COLORS.text.body, fontFamily: FONTS.poppins, fontWeight: FONT_WEIGHTS.bold }}>
          {helperText}
        </p>
      )}
    </>
  );
}
