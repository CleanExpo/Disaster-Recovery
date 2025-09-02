// Help & Support Types

export type TicketStatus = 'open' | 'in_progress' | 'pending' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketCategory = 'technical' | 'billing' | 'compliance' | 'account' | 'feature_request' | 'other';
export type SupportChannel = 'chat' | 'email' | 'email' | 'ticket';

// Knowledge Base
export interface KnowledgeArticle {
  id: string;
  title: string;
  slug: string;
  category: ArticleCategory;
  subcategory?: string;
  content: string;
  excerpt: string;
  tags: string[];
  author: string;
  isPublished: boolean;
  isFeatured: boolean;
  helpfulCount: number;
  notHelpfulCount: number;
  viewCount: number;
  relatedArticles?: string[];
  attachments?: Attachment[];
  lastUpdated: Date;
  createdAt: Date;
}

export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  articleCount: number;
  subcategories?: ArticleSubcategory[];
  order: number;
}

export interface ArticleSubcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  articleCount: number;
}

export interface ArticleFeedback {
  id: string;
  articleId: string;
  userId: string;
  helpful: boolean;
  comment?: string;
  createdAt: Date;
}

// Support Tickets
export interface SupportTicket {
  id: string;
  ticketNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  category: TicketCategory;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignedTo?: string;
  assignedToName?: string;
  channel: SupportChannel;
  attachments?: Attachment[];
  tags?: string[];
  internalNotes?: TicketNote[];
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
  closedAt?: Date;
  firstResponseAt?: Date;
  slaDeadline?: Date;
  satisfaction?: number;
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  senderId: string;
  senderName: string;
  senderType: 'user' | 'agent' | 'system';
  message: string;
  attachments?: Attachment[];
  isInternal: boolean;
  createdAt: Date;
  readAt?: Date;
}

export interface TicketNote {
  id: string;
  ticketId: string;
  authorId: string;
  authorName: string;
  note: string;
  createdAt: Date;
}

export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
}

// Live Chat
export interface ChatSession {
  id: string;
  userId: string;
  userName: string;
  agentId?: string;
  agentName?: string;
  status: 'waiting' | 'active' | 'ended';
  startedAt: Date;
  endedAt?: Date;
  messages: ChatMessage[];
  transcript?: string;
  rating?: number;
  tags?: string[];
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  senderId: string;
  senderName: string;
  senderType: 'user' | 'agent' | 'bot';
  message: string;
  timestamp: Date;
  readAt?: Date;
  attachments?: Attachment[];
}

export interface ChatAgent {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  activeChats: number;
  maxChats: number;
  skills: string[];
  languages: string[];
  rating: number;
  totalChats: number;
}

// Feedback & Feature Requests
export interface FeedbackSubmission {
  id: string;
  type: 'feedback' | 'feature_request' | 'bug_report';
  userId?: string;
  userName?: string;
  userEmail?: string;
  isAnonymous: boolean;
  category: string;
  title: string;
  description: string;
  impact?: 'low' | 'medium' | 'high';
  attachments?: Attachment[];
  status: 'new' | 'under_review' | 'planned' | 'in_progress' | 'completed' | 'declined';
  priority?: TicketPriority;
  votes: number;
  adminNotes?: string;
  response?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Onboarding
export interface OnboardingChecklist {
  id: string;
  userId: string;
  items: OnboardingItem[];
  completedCount: number;
  totalCount: number;
  completionPercentage: number;
  startedAt: Date;
  completedAt?: Date;
  lastActivity: Date;
}

export interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  category: 'account' | 'compliance' | 'billing' | 'training' | 'setup';
  order: number;
  isRequired: boolean;
  isCompleted: boolean;
  completedAt?: Date;
  helpArticleId?: string;
  helpArticleUrl?: string;
  actionUrl?: string;
  actionLabel?: string;
  icon?: string;
  estimatedTime?: string; // e.g., "5 minutes"
}

// Support Metrics
export interface SupportMetrics {
  tickets: {
    open: number;
    inProgress: number;
    pending: number;
    resolved: number;
    totalToday: number;
    totalWeek: number;
    totalMonth: number;
  };
  responseTime: {
    average: number; // in minutes
    median: number;
    target: number;
    compliance: number; // percentage meeting SLA
  };
  satisfaction: {
    average: number;
    totalRatings: number;
    distribution: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
    };
  };
  chat: {
    activeChats: number;
    waitingQueue: number;
    averageWaitTime: number; // in seconds
    averageDuration: number; // in minutes
  };
  knowledge: {
    totalArticles: number;
    totalViews: number;
    helpfulPercentage: number;
    popularArticles: Array<{
      id: string;
      title: string;
      views: number;
    }>;
  };
}

// Support Configuration
export interface SupportConfig {
  businessHours: {
    timezone: string;
    schedule: {
      [key in 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday']: {'
        isOpen: boolean;
        openTime?: string; // HH:MM format
        closeTime?: string;
      };
    };
    holidays: Array<{
      date: string;
      name: string;
    }>;
  };
  sla: {
    firstResponse: {
      urgent: number; // in minutes
      high: number;
      medium: number;
      low: number;
    };
    resolution: {
      urgent: number; // in hours
      high: number;
      medium: number;
      low: number;
    };
  };
  chat: {
    enabled: boolean;
    maxWaitTime: number; // in seconds
    inactivityTimeout: number; // in minutes
    maxConcurrentChats: number;
    welcomeMessage: string;
    offlineMessage: string;
  };
  
    mainNumber: string;
    emergencyNumber: string;
    businessHours: string;
    afterHours: string;
  };
  email: {
    supportEmail: string;
    autoReplyEnabled: boolean;
    autoReplyMessage: string;
  };
}

// Search
export interface SearchResult {
  type: 'article' | 'ticket' | 'faq';
  id: string;
  title: string;
  excerpt: string;
  url: string;
  category?: string;
  relevanceScore: number;
  lastUpdated: Date;
}

export interface SearchFilters {
  query: string;
  types?: ('article' | 'ticket' | 'faq')[];'
  categories?: string[];
  tags?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  limit?: number;
}

// FAQ
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isPublished: boolean;
  helpfulCount: number;
  viewCount: number;
  relatedArticles?: string[];
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Constants
export const TICKET_PRIORITIES: Record<TicketPriority, {
  label: string;
  colour: string;
  slaHours: number;
}> = {
  urgent: {
    label: 'Urgent','
    colour: 'red','
    slaHours: 2
  },
  high: {
    label: 'High','
    colour: 'orange','
    slaHours: 8
  },
  medium: {
    label: 'Medium','
    colour: 'yellow','
    slaHours: 24
  },
  low: {
    label: 'Low','
    colour: 'gray','
    slaHours: 72
  }
};

export const TICKET_CATEGORIES: Record<TicketCategory, {
  label: string;
  icon: string;
  description: string;
}> = {
  technical: {
    label: 'Technical Issue','
    icon: 'wrench','
    description: 'Platform bugs, login issues, or technical problems'
  },
  billing: {
    label: 'Billing & Payments','
    icon: 'credit-card','
    description: 'Subscription, invoices, or payment questions'
  },
  compliance: {
    label: 'Compliance & Certification','
    icon: 'shield','
    description: 'Certification requirements, compliance questions'
  },
  account: {
    label: 'Account Management','
    icon: 'user','
    description: 'Profile, settings, or account access'
  },
  feature_request: {
    label: 'Feature Request','
    icon: 'lightbulb','
    description: 'Suggestions for new features or improvements'
  },
  other: {
    label: 'Other','
    icon: 'help-circle','
    description: 'General questions or other topics'
  }
};

export const DEFAULT_BUSINESS_HOURS: SupportConfig['businessHours'] = {
  timezone: 'Australia/Sydney',
  schedule: {
    monday: { isOpen: true, openTime: '08:00', closeTime: '18:00' },
    tuesday: { isOpen: true, openTime: '08:00', closeTime: '18:00' },
    wednesday: { isOpen: true, openTime: '08:00', closeTime: '18:00' },
    thursday: { isOpen: true, openTime: '08:00', closeTime: '18:00' },
    friday: { isOpen: true, openTime: '08:00', closeTime: '17:00' },
    saturday: { isOpen: false },
    sunday: { isOpen: false }
  },
  holidays: []
};