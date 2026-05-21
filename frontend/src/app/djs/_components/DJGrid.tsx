'use client';

import { useState } from 'react';
import { DJ } from '@/lib/graphql';
import DJCard from './DJCard';
import DJDrawer from './DJDrawer';

export default function DJGrid({ djs }: { djs: DJ[] }) {
  const [selectedDj, setSelectedDj] = useState<DJ | null>(null);

  return (
    <>
      <div className="grid grid-cols-4 gap-2 w-full px-6">
        {djs.map((dj) => (
          <DJCard key={dj.databaseId} dj={dj} onClick={() => setSelectedDj(dj)} />
        ))}
      </div>
      {selectedDj && (
        <DJDrawer dj={selectedDj} onClose={() => setSelectedDj(null)} />
      )}
    </>
  );
}
