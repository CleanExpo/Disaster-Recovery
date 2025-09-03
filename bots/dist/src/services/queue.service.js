"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueService = void 0;
const bull_1 = __importDefault(require("bull"));
class QueueService {
    redis;
    queues = new Map();
    processors = new Map();
    constructor(redis) {
        this.redis = redis;
    }
    getQueue(name) {
        if (!this.queues.has(name)) {
            const queue = new bull_1.default(name, {
                redis: {
                    host: process.env.REDIS_HOST || 'localhost',
                    port: parseInt(process.env.REDIS_PORT || '6379'),
                    password: process.env.REDIS_PASSWORD
                }
            });
            queue.on('completed', (job) => {
                console.log(`✅ Job ${job.id} completed in queue ${name}`);
            });
            queue.on('failed', (job, error) => {
                console.error(`❌ Job ${job.id} failed in queue ${name}:`, error);
            });
            queue.on('stalled', (job) => {
                console.warn(`⚠️ Job ${job.id} stalled in queue ${name}`);
            });
            this.queues.set(name, queue);
        }
        return this.queues.get(name);
    }
    async add(queueName, data, options) {
        const queue = this.getQueue(queueName);
        const jobOptions = {
            removeOnComplete: true,
            removeOnFail: false,
            attempts: 3,
            backoff: {
                type: 'exponential',
                delay: 2000
            },
            ...options
        };
        return queue.add(data, jobOptions);
    }
    process(queueName, processor, concurrency = 1) {
        const queue = this.getQueue(queueName);
        this.processors.set(queueName, processor);
        queue.process(concurrency, async (job) => {
            console.log(`Processing job ${job.id} in queue ${queueName}`);
            return processor(job);
        });
    }
    async getQueueStatus(queueName) {
        const queue = this.getQueue(queueName);
        const [waiting, active, completed, failed, delayed] = await Promise.all([
            queue.getWaitingCount(),
            queue.getActiveCount(),
            queue.getCompletedCount(),
            queue.getFailedCount(),
            queue.getDelayedCount()
        ]);
        return {
            waiting,
            active,
            completed,
            failed,
            delayed
        };
    }
    async getJob(queueName, jobId) {
        const queue = this.getQueue(queueName);
        return queue.getJob(jobId);
    }
    async retryFailedJobs(queueName) {
        const queue = this.getQueue(queueName);
        const failedJobs = await queue.getFailed();
        for (const job of failedJobs) {
            await job.retry();
        }
    }
    async clean(queueName, grace = 0, status = 'completed') {
        const queue = this.getQueue(queueName);
        return queue.clean(grace, status);
    }
    async pause(queueName) {
        const queue = this.getQueue(queueName);
        await queue.pause();
    }
    async resume(queueName) {
        const queue = this.getQueue(queueName);
        await queue.resume();
    }
    async empty(queueName) {
        const queue = this.getQueue(queueName);
        await queue.empty();
    }
    async close() {
        for (const [name, queue] of this.queues) {
            console.log(`Closing queue: ${name}`);
            await queue.close();
        }
        this.queues.clear();
        this.processors.clear();
    }
    async isHealthy() {
        try {
            if (this.queues.size > 0) {
                const queue = this.queues.values().next().value;
                await queue.getJobCounts();
                return true;
            }
            const testQueue = this.getQueue('health-check');
            await testQueue.getJobCounts();
            await testQueue.close();
            this.queues.delete('health-check');
            return true;
        }
        catch (error) {
            console.error('Queue health check failed:', error);
            return false;
        }
    }
    async addEmergencyJob(data) {
        return this.add('emergency', data, {
            priority: 1,
            delay: 0,
            attempts: 5
        });
    }
    async addStandardJob(data) {
        return this.add('standard', data, {
            priority: 10,
            delay: 0,
            attempts: 3
        });
    }
    async addScheduledJob(data, delay) {
        return this.add('scheduled', data, {
            delay,
            attempts: 3
        });
    }
}
exports.QueueService = QueueService;
//# sourceMappingURL=queue.service.js.map