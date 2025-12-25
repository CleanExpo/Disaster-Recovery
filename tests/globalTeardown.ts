export default async function globalTeardown() {
  console.log('\n[Global Teardown] Cleaning up test environment');

  // Any global cleanup tasks can go here
  // For example: close database connections, stop test containers, etc.
}
