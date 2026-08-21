import { FONTS } from '@/lib/constants/typography';

const CANCELLED_COLOR = 'rgba(0,0,0,0.5)';

interface Props {
  names: string[];
  onDjClick?: (name: string) => void;
  mobileFontSize: number;
  desktopFontSize: number;
  color: string;
  cancelled?: boolean;
  cancelReason?: string | null;
}

export default function DJNameDisplay({ names, onDjClick, mobileFontSize, desktopFontSize, color, cancelled, cancelReason }: Props) {
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
    </>
  );
}
