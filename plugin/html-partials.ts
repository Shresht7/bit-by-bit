// Library
import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

const PLUGIN_NAME = 'html-partials';

/** Options to configure the HTML partials plugin */
type PluginOptions = {
    /** Directory where partial HTML files are located (default: 'src/partials') */
    partialsDir?: string;
}

/** Factory function to create the HTML partials plugin for Vite */
export default function htmlPartials(options: PluginOptions = {}): Plugin {

    const { partialsDir = 'src/partials' } = options;

    // Resolve the absolute path to the partials directory and check if it exists
    const partialsPath = path.join(process.cwd(), partialsDir)
    if (!fs.existsSync(partialsPath)) {
        console.warn(`[${PLUGIN_NAME}] Partials directory not found: ${partialsPath}`);
    }

    return {
        name: PLUGIN_NAME,

        transformIndexHtml(html) {
            // Replace <!-- partial:filename.html --> with the contents of src/partials/filename.html
            return html.replace(/<!--\s*partial:([\w./\-]+)\s*-->/g, (match, file) => {

                // Resolve the file path for the partial
                const filePath = path.resolve(partialsPath, file.trim());

                // Security check: Ensure the resolved file path is within the partials directory to prevent directory traversal attacks
                if (!isPathInside(partialsPath, filePath)) {
                    console.warn(`[${PLUGIN_NAME}] Partial file escapes partials directory: ${filePath}`);
                    return match;
                }

                // Check if the file exists before trying to read it
                if (!fs.existsSync(filePath)) {
                    console.warn(`[${PLUGIN_NAME}] Partial file not found: ${filePath}`);
                    return match; // Return the original comment if file not found
                }

                // Replace the comment with the file contents
                return fs.readFileSync(filePath, 'utf-8');

            })
        },

        configureServer(server) {
            // Watch the partials directory for changes and trigger a full page reload when a partial file is modified
            server.watcher.add(partialsPath)
            server.watcher.on('change', (file) => {
                if (file.startsWith(partialsPath)) {
                    server.ws.send({ type: 'full-reload' })
                }
            })
        }
    }

}

// -------
// HELPERS
// -------

/** 
 * Normalizes a file path by resolving it to an absolute path and normalizing it.
 * On Windows, it also converts the path to lowercase for case-insensitive comparison.
 * @param filePath - The file path to normalize.
 * @returns The normalized file path.
 */
function normalizePath(filePath: string): string {
    const normalizedPath = path.normalize(path.resolve(filePath))
    return process.platform === 'win32' ? normalizedPath.toLowerCase() : normalizedPath;
}

/**
 * Checks if a given child path is inside a parent path.
 * This is used to prevent directory traversal attacks by ensuring that the resolved file path for a partial is within the designated partials directory.
 * @param parent - The parent directory path.
 * @param child - The child path to check.
 * @returns True if the child path is inside the parent path, false otherwise.
 */
function isPathInside(parent: string, child: string): boolean {
    const normalizedParent = normalizePath(parent);
    const normalizedChild = normalizePath(child);
    return normalizedChild === normalizedParent || normalizedChild.startsWith(normalizedParent + path.sep);
}
