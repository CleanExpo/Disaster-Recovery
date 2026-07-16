import { AgLoadingState } from '@/components/antigravity';

export default function AccountLoading() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center px-4">
      <AgLoadingState label="Loading your account…" />
    </div>
  );
}
