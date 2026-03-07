'use client';

import { AntigravityNavbar } from './AntigravityNavbar';
import { AntigravityFooter } from './AntigravityFooter';

interface AgPageWrapperProps {
  children: React.ReactNode;
  /** Hide navbar/footer (e.g. for portal pages with custom chrome) */
  hideChrome?: boolean;
}

/**
 * AgPageWrapper — Standard wrapper: AG navbar + content + footer.
 */
export function AgPageWrapper({ children, hideChrome = false }: AgPageWrapperProps) {
  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <AntigravityNavbar />
      <div className="ag-page-content">
        {children}
      </div>
      <AntigravityFooter />
    </>
  );
}
