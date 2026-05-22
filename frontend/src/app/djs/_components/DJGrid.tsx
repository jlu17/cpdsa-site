'use client';

import { useState } from 'react';
import { DJ } from '@/lib/graphql';
import DJCard from './DJCard';
import DJDrawer from './DJDrawer';

export default function DJGrid({ djs }: { djs: DJ[] }) {
  const [selectedDj, setSelectedDj] = useState<DJ | null>(null);

  const sorted = [...djs].sort((a, b) => {
    const aHasPhoto = !!a.djFields.djPhoto;
    const bHasPhoto = !!b.djFields.djPhoto;
    if (aHasPhoto !== bHasPhoto) return aHasPhoto ? -1 : 1;
    return a.djFields.djName.localeCompare(b.djFields.djName);
  });

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 w-full px-6">
        {sorted.map((dj) => (
          <DJCard key={dj.databaseId} dj={dj} onClick={() => setSelectedDj(dj)} />
        ))}
      </div>
      {selectedDj && (
        <DJDrawer dj={selectedDj} onClose={() => setSelectedDj(null)} />
      )}
    </>
  );
}
