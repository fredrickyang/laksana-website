// Client-safe utility functions

// Helper to get media URL from Payload media objects
// Strips localhost origin so URLs work on deployed environments
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getMediaUrl(media: any): string {
    if (!media) return ''
    if (typeof media === 'string') return stripLocalhostOrigin(media)
    if (typeof media === 'number') return '' // ID only, not populated
    return stripLocalhostOrigin(media.url || '')
}

function stripLocalhostOrigin(url: string): string {
    if (!url) return ''
    try {
        const parsed = new URL(url)
        if (parsed.hostname === 'localhost') {
            return parsed.pathname + parsed.search + parsed.hash
        }
    } catch {
        // Not an absolute URL, return as-is
    }
    return url
}
