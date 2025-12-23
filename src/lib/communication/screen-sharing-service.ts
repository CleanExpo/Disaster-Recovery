/**
 * Screen Sharing Service
 * Handles screen sharing during calls
 */

export interface ScreenShare {
  id: string;
  callId: string;
  userId: string;
  status: 'active' | 'stopped';
  startedAt: Date;
  endedAt?: Date;
}

export interface StartScreenShareOptions {
  callId: string;
  userId: string;
}

class ScreenSharingService {
  async startScreenShare(options: StartScreenShareOptions): Promise<ScreenShare> {
    const screenShare: ScreenShare = {
      id: `share_${Date.now()}`,
      callId: options.callId,
      userId: options.userId,
      status: 'active',
      startedAt: new Date(),
    };

    return screenShare;
  }

  async stopScreenShare(screenShareId: string): Promise<ScreenShare> {
    // Stub implementation
    return {
      id: screenShareId,
      callId: 'stub',
      userId: 'stub',
      status: 'stopped',
      startedAt: new Date(),
      endedAt: new Date(),
    };
  }

  async getActiveScreenShare(callId: string): Promise<ScreenShare | null> {
    // Stub implementation
    return null;
  }
}

export const screenSharingService = new ScreenSharingService();
