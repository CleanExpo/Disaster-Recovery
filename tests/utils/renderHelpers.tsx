import React, { ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Custom providers wrapper for testing
 */
interface ProvidersProps {
  children: React.ReactNode;
}

function AllTheProviders({ children }: ProvidersProps) {
  // Add all your providers here (Theme, Auth, etc.)
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}

/**
 * Custom render function that wraps components with all providers
 */
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult & { user: ReturnType<typeof userEvent.setup> } {
  const user = userEvent.setup();
  const result = render(ui, { wrapper: AllTheProviders, ...options });
  return { ...result, user };
}

/**
 * Re-export everything from testing-library
 */
export * from '@testing-library/react';
export { customRender as render };
export { userEvent };

/**
 * Render hook for testing custom hooks
 */
export function renderHook<T>(
  hook: () => T
): { result: { current: T }; rerender: () => void } {
  let result: { current: T } = { current: undefined as T };

  function TestComponent() {
    result.current = hook();
    return null;
  }

  const { rerender: rerenderComponent } = render(<TestComponent />);

  return {
    result,
    rerender: () => rerenderComponent(<TestComponent />),
  };
}

/**
 * Wait for element to be removed from DOM
 */
export async function waitForElementToBeRemoved(
  callback: () => Element | null,
  options?: { timeout?: number }
): Promise<void> {
  const { timeout = 5000 } = options || {};
  const startTime = Date.now();

  while (callback() !== null) {
    if (Date.now() - startTime > timeout) {
      throw new Error('Element was not removed within timeout');
    }
    await new Promise(resolve => setTimeout(resolve, 50));
  }
}

/**
 * Mock window.matchMedia for responsive component testing
 */
export function mockMatchMedia(matches: boolean = false): void {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

/**
 * Mock IntersectionObserver for visibility testing
 */
export function mockIntersectionObserver(): void {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  });
  window.IntersectionObserver = mockIntersectionObserver as any;
}

/**
 * Mock ResizeObserver for resize testing
 */
export function mockResizeObserver(): void {
  const mockResizeObserver = jest.fn();
  mockResizeObserver.mockReturnValue({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  });
  window.ResizeObserver = mockResizeObserver as any;
}

/**
 * Creates a mock file for file upload testing
 */
export function createMockFile(
  name: string = 'test.pdf',
  size: number = 1024,
  type: string = 'application/pdf'
): File {
  const file = new File([''], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
}

/**
 * Simulates a file drop event
 */
export function createDropEvent(files: File[]): Partial<DragEvent> {
  return {
    dataTransfer: {
      files: files as any,
      items: files.map(file => ({
        kind: 'file',
        type: file.type,
        getAsFile: () => file,
      })) as any,
      types: ['Files'],
    } as DataTransfer,
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  };
}
