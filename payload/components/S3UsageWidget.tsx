import { getPayload } from 'payload'
import config from '@payload-config'

const TIERS_GB = [1, 5, 10, 25, 50, 100]

function formatGB(bytes: number): string {
  return (bytes / 1_073_741_824).toFixed(2)
}

function getTierGB(usageBytes: number): number {
  const usageGB = usageBytes / 1_073_741_824
  return TIERS_GB.find((tier) => usageGB <= tier) ?? TIERS_GB[TIERS_GB.length - 1]
}

export default async function S3UsageWidget() {
  try {
    const payload = await getPayload({ config })

    const { docs } = await payload.find({
      collection: 'media',
      limit: 0,
      pagination: false,
      select: {
        filesize: true,
      },
    })

    const usageBytes = docs.reduce((sum, doc) => sum + (Number(doc.filesize) || 0), 0)
    const tierGB = getTierGB(usageBytes)
    const tierBytes = tierGB * 1_073_741_824
    const percentage = Math.min((usageBytes / tierBytes) * 100, 100)

    return (
      <div
        style={{
          background: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '20px 24px',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          <span style={{ fontWeight: 600, fontSize: '14px', color: '#1a1a2e' }}>
            Cloud Storage ({tierGB} GB)
          </span>
          <span style={{ fontSize: '14px', color: '#64748b' }}>
            {formatGB(usageBytes)} GB Used
          </span>
        </div>
        <div
          style={{
            width: '100%',
            height: '8px',
            backgroundColor: '#e2e8f0',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${percentage}%`,
              height: '100%',
              backgroundColor:
                percentage > 90 ? '#ef4444' : percentage > 70 ? '#f59e0b' : '#3b82f6',
              borderRadius: '4px',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
        <div
          style={{
            textAlign: 'right',
            marginTop: '6px',
            fontSize: '12px',
            color: '#94a3b8',
          }}
        >
          {percentage.toFixed(1)}%
        </div>
      </div>
    )
  } catch (error) {
    console.error('S3UsageWidget error:', error)
    return null
  }
}
