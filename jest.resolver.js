const fs = require('fs');
const path = require('path');

/**
 * Custom Jest Resolver
 *
 * Matches tsconfig.json path resolution:
 * "@/*": ["./*", "./src/*"]
 *
 * Tries to resolve imports from root directory first, then src/
 */
module.exports = (request, options) => {
  // Use default resolver for non-@ imports
  if (!request.startsWith('@/')) {
    return options.defaultResolver(request, options);
  }

  // Extract the path after @/
  const importPath = request.substring(2); // Remove '@/'

  // Define search paths in priority order (root first, then src)
  const searchPaths = [
    path.join(options.rootDir, importPath),
    path.join(options.rootDir, 'src', importPath)
  ];

  // Try each path with common extensions
  const extensions = ['.ts', '.tsx', '.js', '.jsx', '.json', ''];

  for (const basePath of searchPaths) {
    for (const ext of extensions) {
      const fullPath = basePath + ext;

      // Check if file exists
      if (fs.existsSync(fullPath)) {
        // Check if it's a file (not directory)
        const stats = fs.statSync(fullPath);
        if (stats.isFile()) {
          return fullPath;
        }
      }

      // Check for index file in directory
      if (ext === '' && fs.existsSync(basePath)) {
        const stats = fs.statSync(basePath);
        if (stats.isDirectory()) {
          const indexPaths = [
            path.join(basePath, 'index.ts'),
            path.join(basePath, 'index.tsx'),
            path.join(basePath, 'index.js'),
            path.join(basePath, 'index.jsx')
          ];

          for (const indexPath of indexPaths) {
            if (fs.existsSync(indexPath)) {
              return indexPath;
            }
          }
        }
      }
    }
  }

  // If not found, fall back to default resolver
  try {
    return options.defaultResolver(request, options);
  } catch (error) {
    throw new Error(
      `Cannot find module '${request}'. Searched in:\n${searchPaths.join('\n')}`
    );
  }
};
