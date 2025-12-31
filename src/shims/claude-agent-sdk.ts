/**
 * Shim for `@anthropic-ai/claude-agent-sdk`.
 *
 * This repo currently imports the Claude Agent SDK in multiple agent modules, but the dependency
 * is not installed. Next.js builds fail at compile-time with "Module not found".
 *
 * This shim allows the app to build and deploy while keeping agent endpoints disabled until the
 * real SDK is added. The exported APIs intentionally throw when invoked.
 */

export interface AgentConfig {
  name?: string;
  instructions?: string;
  model?: string;
  tools?: unknown[];
  [key: string]: unknown;
}

export type HookCallback<TInput = unknown, TOutput = unknown> = (
  input: TInput
) => Promise<TOutput> | TOutput;

export class Agent {
  // Accept any config to match upstream SDK constructors.
  constructor(_config?: AgentConfig) {}

  async run(): Promise<never> {
    throw new Error(
      'Claude Agent SDK is not installed. Install `@anthropic-ai/claude-agent-sdk` or disable agent endpoints.'
    );
  }
}

/**
 * The real SDK exposes a `query(...)` helper used as an async iterator in this codebase.
 * We provide a compatible shape that throws on first iteration.
 */
export function query(_args: unknown): AsyncIterable<unknown> {
  async function* generator(): AsyncGenerator<unknown> {
    throw new Error(
      'Claude Agent SDK is not installed. Install `@anthropic-ai/claude-agent-sdk` or disable agent endpoints.'
    );
  }

  return generator();
}

