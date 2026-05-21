import { COLORS } from '@/lib/constants/colors';
import { FONTS, FONT_SIZES } from '@/lib/constants/typography';

interface PageHeroProps {
  title: string;
  color?: string;
}

export default function PageHero({ title, color = COLORS.brand.yellow }: PageHeroProps) {
  return (
    <div className="w-full px-6">
      <p
        style={{
          fontFamily: FONTS.anton,
          fontSize: FONT_SIZES.pageHero,
          color,
          lineHeight: 0.9,
          letterSpacing: '0.26px',
        }}
      >
        {title}
      </p>
    </div>
  );
}
