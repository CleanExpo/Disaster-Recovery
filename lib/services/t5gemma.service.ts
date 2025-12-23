// import { pipeline, env } from 'transformers';
// import NodeCache from 'node-cache';
// import pino from 'pino';

// const logger = pino();

interface T5GemmaConfig {
    modelSize: string;
    device: string;
    maxLength: number;
    batchSize: number;
    cacheTTL: number;
}

interface T5GemmaTask {
    type: 'summarization' | 'qa' | 'generation' | 'extraction';
    input: string;
    context?: string;
    parameters?: Record<string, any>;
}

interface T5GemmaResponse {
    success: boolean;
    result?: string;
    error?: string;
    processingTime: number;
    cached: boolean;
}

class T5GemmaService {
    private pipeline: any = null;
    private cache: NodeCache;
    private config: T5GemmaConfig;
    private isInitialized: boolean = false;
    private initPromise: Promise<void> | null = null;

  constructor(config: Partial<T5GemmaConfig> = {}) {
        this.config = {
                modelSize: process.env.T5GEMMA_MODEL_SIZE || '2b',
                device: process.env.T5GEMMA_DEVICE || 'cpu',
                maxLength: parseInt(process.env.T5GEMMA_MAX_LENGTH || '512'),
                batchSize: parseInt(process.env.T5GEMMA_BATCH_SIZE || '8'),
                cacheTTL: 3600,
                ...config,
        };

      this.cache = new NodeCache({ stdTTL: this.config.cacheTTL });
        env.allowLocalModels = true;
  }

  async initialize(): Promise<void> {
        if (this.isInitialized) return;
        if (this.initPromise) return this.initPromise;

      this.initPromise = this._initializeModel();
        await this.initPromise;
  }

  private async _initializeModel(): Promise<void> {
        try {
                logger.info(
                          `Initializing T5Gemma ${this.config.modelSize} on ${this.config.device}`
                        );

          const modelId = `google/t5gemma-${this.config.modelSize}`;

          this.pipeline = await pipeline('text2text-generation', modelId, {
                    device: this.config.device === 'cuda' ? 0 : -1,
                    model: {
                                cache_dir: process.env.T5GEMMA_CACHE_DIR || './models',
                    },
          });

          this.isInitialized = true;
                logger.info('T5Gemma initialized successfully');
        } catch (error) {
                logger.error('Failed to initialize T5Gemma:', error);
                throw error;
        }
  }

  async process(task: T5GemmaTask): Promise<T5GemmaResponse> {
        const startTime = Date.now();

      try {
              await this.initialize();

          const cacheKey = this.generateCacheKey(task);
              const cachedResult = this.cache.get<string>(cacheKey);

          if (cachedResult) {
                    logger.info(`Cache hit for task: ${task.type}`);
                    return {
                                success: true,
                                result: cachedResult,
                                processingTime: Date.now() - startTime,
                                cached: true,
                    };
          }

          let result: string;

          switch (task.type) {
            case 'summarization':
                        result = await this.summarize(task.input);
                        break;
            case 'qa':
                        result = await this.answerQuestion(task.input, task.context || '');
                        break;
            case 'generation':
                        result = await this.generate(task.input);
                        break;
            case 'extraction':
                        result = await this.extract(task.input);
                        break;
            default:
                        throw new Error(`Unknown task type: ${task.type}`);
          }

          this.cache.set(cacheKey, result);

          return {
                    success: true,
                    result,
                    processingTime: Date.now() - startTime,
                    cached: false,
          };
      } catch (error) {
              logger.error(`T5Gemma processing error (${task.type}):`, error);
              return {
                        success: false,
                        error: error instanceof Error ? error.message : 'Unknown error',
                        processingTime: Date.now() - startTime,
                        cached: false,
              };
      }
  }

  private async summarize(text: string): Promise<string> {
        const output = await this.pipeline(`summarize: ${text}`, {
                max_length: this.config.maxLength,
                min_length: 50,
        });
        return output[0].summary_text;
  }

  private async answerQuestion(
        question: string,
        context: string
      ): Promise<string> {
        const output = await this.pipeline(`question: ${question} context: ${context}`, {
                max_length: this.config.maxLength,
        });
        return output[0].generated_text;
  }

  private async generate(prompt: string): Promise<string> {
        const output = await this.pipeline(prompt, {
                max_length: this.config.maxLength,
                min_length: 50,
        });
        return output[0].generated_text;
  }

  private async extract(text: string): Promise<string> {
        const output = await this.pipeline(`extract key information: ${text}`, {
                max_length: this.config.maxLength,
        });
        return output[0].generated_text;
  }

  private generateCacheKey(task: T5GemmaTask): string {
        return `t5_${task.type}_${task.input.substring(0, 50).replace(/\s+/g, '_')}`;
  }

  async healthCheck(): Promise<boolean> {
        try {
                await this.initialize();
                return this.isInitialized;
        } catch {
                return false;
        }
  }
}

let instance: T5GemmaService | null = null;

export function getT5GemmaService(): T5GemmaService {
    if (!instance) {
          instance = new T5GemmaService();
    }
    return instance;
}

export default T5GemmaService;
