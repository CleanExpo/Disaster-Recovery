// Demo storage using localStorage for persistence
// In production, this would use a real database

interface ClaimData {
  [key: string]: any;
}

class DemoStorage {
  private storageKey = 'demoClaimsDB';
  private claims: Map<string, ClaimData>;

  constructor() {
    this.claims = new Map();
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
          const data = JSON.parse(stored);
          this.claims = new Map(data);
        }
      } catch (e) {
        console.error('Failed to load from localStorage:', e);
      }
    }
  }

  private saveToStorage(): void {
    if (typeof window !== 'undefined') {
      try {
        const data = Array.from(this.claims.entries());
        localStorage.setItem(this.storageKey, JSON.stringify(data));
      } catch (e) {
        console.error('Failed to save to localStorage:', e);
      }
    }
  }

  set(key: string, value: ClaimData): void {
    this.claims.set(key, value);
    this.saveToStorage();
  }

  get(key: string): ClaimData | undefined {
    return this.claims.get(key);
  }

  has(key: string): boolean {
    return this.claims.has(key);
  }

  delete(key: string): boolean {
    const result = this.claims.delete(key);
    if (result) {
      this.saveToStorage();
    }
    return result;
  }

  getAll(): ClaimData[] {
    return Array.from(this.claims.values());
  }

  getAllByStatus(status: string): ClaimData[] {
    return Array.from(this.claims.values()).filter(claim => claim.status === status);
  }

  clear(): void {
    this.claims.clear();
    this.saveToStorage();
  }
}

// Export singleton instance
export const demoStorage = new DemoStorage();