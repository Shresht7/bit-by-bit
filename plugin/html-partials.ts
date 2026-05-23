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

    const partialsPath = path.resolve(process.cwd(), partialsDir)
    if (!fs.existsSync(partialsPath)) {
        console.warn(`[${PLUGIN_NAME}] Partials directory not found: ${partialsPath}`);
    }

    return {
        name: PLUGIN_NAME,

        transformIndexHtml(html) {
            // Replace <!-- partial:filename.html --> with the contents of src/partials/filename.html
            return html.replace(/<!--\s*partial:([\w./\-]+)\s*-->/g, (match, file) => {
                const filePath = path.resolve(process.cwd(), partialsDir, file.trim());
                if (!fs.existsSync(filePath)) {
                    console.warn(`[${PLUGIN_NAME}] Partial file not found: ${filePath}`);
                    return match; // Return the original comment if file not found
                }
                return fs.readFileSync(filePath, 'utf-8'); // Replace the comment with the file contents
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
