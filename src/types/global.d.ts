interface Window {
  dataLayer?: any[];
  clarity?: (action: string, ...args: any[]) => void;
  gtag?: (...args: any[]) => void;
  fbq?: (...args: any[]) => void;
}

interface PerformanceNavigationTiming {
  navigationStart?: number;
}