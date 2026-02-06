// Client-safe utility functions

// Helper to get media URL from Payload media objects
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getMediaUrl(media: any): string {
    if (!media) return ''
    if (typeof media === 'string') return media
    if (typeof media === 'number') return '' // ID only, not populated
    return media.url || ''
}
