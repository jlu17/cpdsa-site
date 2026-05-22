'use client';

import { useState } from 'react';
import { DJ, SkateEvent } from '@/lib/graphql';
import DJDrawer from '@/app/djs/_components/DJDrawer';
import ThisWeekSection from './ThisWeekSection';
import UpcomingSection from './UpcomingSection';

export default function ScheduleWithDrawer({
  thisWeek,
  upcoming,
  djs,
}: {
  thisWeek: SkateEvent[];
  upcoming: SkateEvent[];
  djs: DJ[];
}) {
  const [selectedDj, setSelectedDj] = useState<DJ | null>(null);

  const handleDjClick = (name: string) => {
    const dj = djs.find(
      (d) => d.djFields.djName === name || d.title === name
    );
    if (dj) setSelectedDj(dj);
  };

  return (
    <>
      <div className="flex flex-col w-full gap-4">
        <ThisWeekSection events={thisWeek} onDjClick={handleDjClick} />
        <UpcomingSection events={upcoming} onDjClick={handleDjClick} />
      </div>
      {selectedDj && (
        <DJDrawer dj={selectedDj} onClose={() => setSelectedDj(null)} />
      )}
    </>
  );
}
