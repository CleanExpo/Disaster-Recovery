import { AgLoadingState } from '@/components/antigravity';

export default function TrackLoading() {
  return (
    <div className="ag-page-elevated min-h-[50vh] flex items-center justify-center px-4">
      <AgLoadingState label="Loading claim tracker…" />
    </div>
  );
}
