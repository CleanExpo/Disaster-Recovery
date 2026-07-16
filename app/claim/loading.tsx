import { AgLoadingState } from '@/components/antigravity';

export default function ClaimLoading() {
  return (
    <div className="ag-page-elevated flex items-center justify-center py-24 px-4">
      <AgLoadingState label="Loading claim form…" />
    </div>
  );
}
