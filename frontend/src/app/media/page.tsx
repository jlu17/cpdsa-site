import MediaTabSwitcher from './_components/MediaTabSwitcher';
import { COLORS } from '@/lib/constants/colors';
import PageHero from '@/components/ui/PageHero';
import { getVideos } from '@/lib/graphql';

export default async function MediaPage() {
  const videos = await getVideos();

  return (
    <div className="flex flex-col gap-6 items-center pt-6">
      <PageHero title="MEDIA" color={COLORS.brand.purple} />
      <MediaTabSwitcher videos={videos} />
    </div>
  );
}
