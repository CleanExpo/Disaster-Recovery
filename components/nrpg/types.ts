/**
 * NRPG Components - Shared TypeScript Types
 *
 * Centralized type definitions for NRPG UI components
 */

// ========================================
// MegaMenu Types
// ========================================

export interface MegaMenuItem {
  id: string;
  title: string;
  subtitle?: string;
  label: string;
  description?: string;
  image: string;
  slug: string;
  labelColor?: string;
}

export interface MegaMenuProps {
  items: MegaMenuItem[];
  isOpen: boolean;
  onClose: () => void;
  basePath?: string;
  columns?: 2 | 4;
  className?: string;
}

// ========================================
// HeroCarousel Types
// ========================================

export interface HeroScenario {
  id: string;
  title: string;
  sector: string;
  hazard: string;
  status: string;
  image: string;
  description?: string;
  cta?: {
    label: string;
    href: string;
  };
}

export interface HeroCarouselProps {
  scenarios: HeroScenario[];
  interval?: number;
  showHUD?: boolean;
  showScanningBeam?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  onSlideChange?: (index: number, scenario: HeroScenario) => void;
}

// ========================================
// PillarCard Types
// ========================================

export type ProtocolColor = 'blue' | 'orange' | 'green' | 'red' | 'purple' | 'yellow';

export interface PillarCardData {
  id: string;
  title: string;
  subtitle?: string;
  protocol: string;
  protocolColor?: ProtocolColor | string;
  image: string;
  slug: string;
  services?: string[];
  description?: string;
}

export interface PillarCardProps {
  data: PillarCardData;
  basePath?: string;
  isLoading?: boolean;
  onClick?: (data: PillarCardData) => void;
  className?: string;
  interactive?: boolean;
}

export interface PillarCardGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

// ========================================
// Utility Types
// ========================================

export interface WithClassName {
  className?: string;
}

export interface WithChildren {
  children: React.ReactNode;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface CTAButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'emergency';
}

// ========================================
// Design System Types (from design-tokens.ts)
// ========================================

export type ServicePillarId = 'water' | 'fire' | 'mould' | 'bio';
export type ClientSectorId = 'residential' | 'commercial' | 'industrial' | 'insurance';
export type StateCode = 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'ACT' | 'NT';

// ========================================
// Component State Types
// ========================================

export interface MenuState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export interface CarouselState {
  currentIndex: number;
  isPaused: boolean;
  isTransitioning: boolean;
  goToNext: () => void;
  goToPrevious: () => void;
  goToSlide: (index: number) => void;
}

export interface LoadingState {
  isLoading: boolean;
  error?: Error | null;
  data?: any;
}

// ========================================
// Event Handler Types
// ========================================

export type OnClickHandler<T = void> = (data: T) => void;
export type OnChangeHandler<T = any> = (value: T) => void;
export type OnSlideChangeHandler = (index: number, scenario: HeroScenario) => void;
export type OnMenuCloseHandler = () => void;
