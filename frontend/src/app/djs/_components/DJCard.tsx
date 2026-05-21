import { DJ } from '@/lib/graphql';
import { FONTS } from '@/lib/constants/typography';

export default function DJCard({ dj, onClick }: { dj: DJ; onClick: () => void }) {
  const { djName, djPhoto } = dj.djFields;
  const photoUrl = djPhoto?.node.sourceUrl ?? '';
  const altText = djPhoto?.node.altText || djName;

  return (
    <div
      className="relative rounded-[4px] overflow-hidden aspect-square bg-[#a7a7a7] cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {photoUrl && (
        <img
          src={photoUrl}
          alt={altText}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Radial vignette — darkens edges, keeps center clear */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.45) 100%)',
        }}
      />

      {/* Name + role pinned to bottom-left */}
      <div className="absolute bottom-0 left-0 p-4">
        <p
          className="uppercase leading-[1.2]"
          style={{
            fontFamily: FONTS.anton,
            fontSize: 29,
            color: '#ffffff',
          }}
        >
          {djName}
        </p>
      </div>
    </div>
  );
}
