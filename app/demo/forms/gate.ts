/**
 * Access gate for the public /demo/forms page.
 *
 * The demo drives the billable /api/elevenlabs/narrate endpoint with mock data
 * and offers nothing to anonymous visitors, so it is off by default and only
 * exposed when ENABLE_DEMO_FORMS is explicitly set to "true".
 */
export function demoFormsEnabled(env: NodeJS.ProcessEnv | Record<string, string | undefined>): boolean {
  return env.ENABLE_DEMO_FORMS === 'true';
}
