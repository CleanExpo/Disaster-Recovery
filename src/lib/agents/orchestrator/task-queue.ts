export interface QueuedTask {
  id: string;
  type: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  payload: any;
  requiredAgents: string[];
  dependencies?: string[];
  deadline?: Date;
  retries?: number;
  status?: 'pending' | 'processing' | 'completed' | 'failed';
  enqueueTime?: Date;
  startTime?: Date;
  completionTime?: Date;
}

interface QueueMetrics {
  totalEnqueued: number;
  totalProcessed: number;
  totalFailed: number;
  avgWaitTime: number;
  avgProcessingTime: number;
  queueDepth: number;
}

export class TaskQueue {
  private queues: Map<string, QueuedTask[]>;
  private history: QueuedTask[] = [];
  private maxHistorySize = 1000;
  private metrics: QueueMetrics;
  private routingRules: Map<string, any>;
  private isPaused = false;
  private nonCriticalPaused = false;

  constructor() {
    this.queues = new Map([
      ['critical', []],
      ['high', []],
      ['medium', []],
      ['low', []]
    ]);
    
    this.metrics = {
      totalEnqueued: 0,
      totalProcessed: 0,
      totalFailed: 0,
      avgWaitTime: 0,
      avgProcessingTime: 0,
      queueDepth: 0
    };
    
    this.routingRules = new Map();
  }

  public enqueue(task: QueuedTask): void {
    if (this.isPaused) return;
    
    task.enqueueTime = new Date();
    task.status = 'pending';
    
    const queue = this.queues.get(task.priority);
    if (queue) {
      // Check dependencies
      if (task.dependencies && task.dependencies.length > 0) {
        const pendingDeps = this.checkDependencies(task.dependencies);
        if (pendingDeps.length > 0) {
          // Defer task until dependencies are complete
          setTimeout(() => this.enqueue(task), 1000);
          return;
        }
      }
      
      // Apply routing rules
      const optimizedTask = this.applyRoutingRules(task);
      
      // Add to appropriate queue
      queue.push(optimizedTask);
      this.metrics.totalEnqueued++;
      this.updateQueueDepth();
    }
  }

  public dequeue(): QueuedTask | null {
    if (this.isPaused) return null;
    
    // Priority order: critical > high > medium > low
    const priorities = ['critical', 'high', 'medium', 'low'];
    
    for (const priority of priorities) {
      // Skip non-critical if paused
      if (this.nonCriticalPaused && priority !== 'critical') {
        continue;
      }
      
      const queue = this.queues.get(priority);
      if (queue && queue.length > 0) {
        const task = queue.shift()!;
        task.startTime = new Date();
        task.status = 'processing';
        
        // Update wait time metric
        if (task.enqueueTime) {
          const waitTime = task.startTime.getTime() - task.enqueueTime.getTime();
          this.updateAvgWaitTime(waitTime);
        }
        
        this.updateQueueDepth();
        return task;
      }
    }
    
    return null;
  }

  public complete(taskId: string, success: boolean = true): void {
    const task = this.findTask(taskId);
    
    if (task) {
      task.completionTime = new Date();
      task.status = success ? 'completed' : 'failed';
      
      if (success) {
        this.metrics.totalProcessed++;
      } else {
        this.metrics.totalFailed++;
      }
      
      // Update processing time metric
      if (task.startTime) {
        const processingTime = task.completionTime.getTime() - task.startTime.getTime();
        this.updateAvgProcessingTime(processingTime);
      }
      
      // Add to history
      this.addToHistory(task);
    }
  }

  private findTask(taskId: string): QueuedTask | undefined {
    for (const queue of this.queues.values()) {
      const task = queue.find(t => t.id === taskId);
      if (task) return task;
    }
    
    return this.history.find(t => t.id === taskId);
  }

  private checkDependencies(dependencies: string[]): string[] {
    const pendingDeps: string[] = [];
    
    for (const depId of dependencies) {
      const dep = this.findTask(depId);
      if (!dep || dep.status !== 'completed') {
        pendingDeps.push(depId);
      }
    }
    
    return pendingDeps;
  }

  private applyRoutingRules(task: QueuedTask): QueuedTask {
    const rules = this.routingRules.get(task.type);
    
    if (rules) {
      // Apply priority override
      if (rules.priorityOverride) {
        task.priority = rules.priorityOverride;
      }
      
      // Apply agent assignment
      if (rules.preferredAgents) {
        task.requiredAgents = rules.preferredAgents;
      }
      
      // Apply deadline
      if (rules.defaultDeadline && !task.deadline) {
        task.deadline = new Date(Date.now() + rules.defaultDeadline);
      }
    }
    
    return task;
  }

  private updateQueueDepth(): void {
    let total = 0;
    
    for (const queue of this.queues.values()) {
      total += queue.length;
    }
    
    this.metrics.queueDepth = total;
  }

  private updateAvgWaitTime(waitTime: number): void {
    const currentAvg = this.metrics.avgWaitTime;
    const count = this.metrics.totalEnqueued;
    
    this.metrics.avgWaitTime = (currentAvg * (count - 1) + waitTime) / count;
  }

  private updateAvgProcessingTime(processingTime: number): void {
    const currentAvg = this.metrics.avgProcessingTime;
    const count = this.metrics.totalProcessed;
    
    if (count === 0) {
      this.metrics.avgProcessingTime = processingTime;
    } else {
      this.metrics.avgProcessingTime = (currentAvg * (count - 1) + processingTime) / count;
    }
  }

  private addToHistory(task: QueuedTask): void {
    this.history.push(task);
    
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
    }
  }

  // Queue Management Methods
  
  public pause(): void {
    this.isPaused = true;
  }

  public resume(): void {
    this.isPaused = false;
  }

  public pauseNonCritical(): void {
    this.nonCriticalPaused = true;
  }

  public resumeNonCritical(): void {
    this.nonCriticalPaused = false;
  }

  public clear(priority?: string): void {
    if (priority) {
      const queue = this.queues.get(priority);
      if (queue) {
        queue.length = 0;
      }
    } else {
      for (const queue of this.queues.values()) {
        queue.length = 0;
      }
    }
    
    this.updateQueueDepth();
  }

  public requeue(taskId: string): boolean {
    const task = this.findTask(taskId);
    
    if (task && task.status === 'failed') {
      task.retries = (task.retries || 0) + 1;
      task.status = 'pending';
      delete task.startTime;
      delete task.completionTime;
      
      this.enqueue(task);
      return true;
    }
    
    return false;
  }

  // Analytics Methods
  
  public getMetrics(): QueueMetrics {
    return { ...this.metrics };
  }

  public getHistory(): QueuedTask[] {
    return [...this.history];
  }

  public getCompletionTimes(): Array<{ id: string; duration: number }> {
    return this.history
      .filter(t => t.startTime && t.completionTime)
      .map(t => ({
        id: t.id,
        duration: t.completionTime!.getTime() - t.startTime!.getTime()
      }));
  }

  public getQueueLengths(): Record<string, number> {
    const lengths: Record<string, number> = {};
    
    for (const [priority, queue] of this.queues.entries()) {
      lengths[priority] = queue.length;
    }
    
    return lengths;
  }

  public getOldestTask(): QueuedTask | null {
    let oldest: QueuedTask | null = null;
    let oldestTime = Date.now();
    
    for (const queue of this.queues.values()) {
      for (const task of queue) {
        if (task.enqueueTime && task.enqueueTime.getTime() < oldestTime) {
          oldest = task;
          oldestTime = task.enqueueTime.getTime();
        }
      }
    }
    
    return oldest;
  }

  public getTasksByType(type: string): QueuedTask[] {
    const tasks: QueuedTask[] = [];
    
    for (const queue of this.queues.values()) {
      tasks.push(...queue.filter(t => t.type === type));
    }
    
    return tasks;
  }

  public getOverdueTasks(): QueuedTask[] {
    const now = Date.now();
    const overdue: QueuedTask[] = [];
    
    for (const queue of this.queues.values()) {
      overdue.push(...queue.filter(t => 
        t.deadline && t.deadline.getTime() < now
      ));
    }
    
    return overdue;
  }

  // Optimization Methods
  
  public updateRoutingRules(rules: Map<string, any>): void {
    this.routingRules = new Map([...this.routingRules, ...rules]);
  }

  public optimizeRouting(pattern: any): void {
    // Implement routing optimization based on patterns
    if (pattern.frequency > 20) {
      this.routingRules.set(pattern.pattern, {
        priorityOverride: 'high',
        preferredAgents: ['optimized-agent']
      });
    }
  }

  public rebalance(): void {
    // Rebalance tasks across queues based on current load
    const allTasks: QueuedTask[] = [];
    
    // Collect all tasks
    for (const queue of this.queues.values()) {
      allTasks.push(...queue);
      queue.length = 0;
    }
    
    // Redistribute based on updated priorities
    for (const task of allTasks) {
      // Re-evaluate priority based on age and deadline
      if (task.enqueueTime) {
        const age = Date.now() - task.enqueueTime.getTime();
        
        if (age > 60000 && task.priority === 'low') {
          task.priority = 'medium';
        } else if (age > 120000 && task.priority === 'medium') {
          task.priority = 'high';
        }
      }
      
      if (task.deadline) {
        const timeToDeadline = task.deadline.getTime() - Date.now();
        
        if (timeToDeadline < 60000) {
          task.priority = 'critical';
        } else if (timeToDeadline < 300000 && task.priority !== 'critical') {
          task.priority = 'high';
        }
      }
      
      // Re-enqueue
      const queue = this.queues.get(task.priority);
      if (queue) {
        queue.push(task);
      }
    }
    
    this.updateQueueDepth();
  }

  // Status Methods
  
  public size(): number {
    return this.metrics.queueDepth;
  }

  public isEmpty(): boolean {
    return this.metrics.queueDepth === 0;
  }

  public isPausedStatus(): boolean {
    return this.isPaused;
  }

  public getStatus(): any {
    return {
      paused: this.isPaused,
      nonCriticalPaused: this.nonCriticalPaused,
      queueLengths: this.getQueueLengths(),
      metrics: this.getMetrics(),
      oldestTask: this.getOldestTask(),
      overdueTasks: this.getOverdueTasks().length
    };
  }
}

export default TaskQueue;