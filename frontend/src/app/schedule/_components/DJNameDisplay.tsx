import { FONTS } from '@/lib/constants/typography';

interface Props {
  names: string[];
  onDjClick?: (name: string) => void;
  mobileFontSize: number;
  desktopFontSize: number;
  color: string;
}

export default function DJNameDisplay({ names, onDjClick, mobileFontSize, desktopFontSize, color }: Props) {
  if (names.length === 0) return null;

  const baseStyle = { fontFamily: FONTS.anton, color, letterSpacing: '0.26px' };

  const names_jsx = names.map((name, i) => (
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
        {names_jsx}
      </div>
      <div className="hidden sm:block uppercase leading-[1.05] w-full" style={{ ...baseStyle, fontSize: desktopFontSize }}>
        {names_jsx}
      </div>
    </>
  );
}
