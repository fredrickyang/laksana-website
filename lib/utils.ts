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

/**
 * Formats all numbers within a string with thousand separators (commas).
 * Example: "360000 m²" -> "360,000 m²"
 */
export function formatNumberInString(str: string): string {
    if (!str) return '';
    // This regex finds integer-looking number sequences
    return str.replace(/\d+/g, (match) => {
        const number = parseInt(match, 10);
        return number.toLocaleString('en-US');
    });
}
