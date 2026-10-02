import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

// Alle Seiten sind zur Build-Zeit statisch vorgerendert. Der Static-Assets-Cache liefert sie
// aus den Worker-Assets aus (ohne KV/R2) – sonst melden dynamische Routen 404 (NoFallbackError).
export default defineCloudflareConfig({ incrementalCache: staticAssetsIncrementalCache });
