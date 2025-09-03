import { Job, JobOptions } from 'bull';
import { RedisService } from './redis.service';
export interface JobData {
    id?: string;
    type: string;
    data: any;
    priority?: number;
    timestamp?: Date;
}
export declare class QueueService {
    private redis;
    private queues;
    private processors;
    constructor(redis: RedisService);
    private getQueue;
    add(queueName: string, data: any, options?: JobOptions): Promise<Job>;
    process(queueName: string, processor: (job: Job) => Promise<any>, concurrency?: number): void;
    getQueueStatus(queueName: string): Promise<{
        waiting: number;
        active: number;
        completed: number;
        failed: number;
        delayed: number;
    }>;
    getJob(queueName: string, jobId: string): Promise<Job | null>;
    retryFailedJobs(queueName: string): Promise<void>;
    clean(queueName: string, grace?: number, status?: 'completed' | 'failed'): Promise<Job[]>;
    pause(queueName: string): Promise<void>;
    resume(queueName: string): Promise<void>;
    empty(queueName: string): Promise<void>;
    close(): Promise<void>;
    isHealthy(): Promise<boolean>;
    addEmergencyJob(data: any): Promise<Job>;
    addStandardJob(data: any): Promise<Job>;
    addScheduledJob(data: any, delay: number): Promise<Job>;
}
//# sourceMappingURL=queue.service.d.ts.map