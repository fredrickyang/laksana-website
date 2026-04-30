'use client'
import React from 'react'
import { Button } from '@payloadcms/ui'
import { usePathname } from 'next/navigation'

export const ExportAssetsButton: React.FC = () => {
  const [loading, setLoading] = React.useState(false)
  const pathname = usePathname()
  
  // Extract collection slug from URL (e.g. /admin/collections/form-company-submissions)
  const parts = pathname.split('/')
  const collectionSlug = parts[parts.indexOf('collections') + 1]

  const handleExport = () => {
    if (!collectionSlug) {
      alert('Could not determine collection slug')
      return
    }
    setLoading(true)
    // Simply redirect to the API endpoint which triggers the download
    window.location.href = `/api/export-zip?collection=${collectionSlug}`
    
    // Reset loading state after a delay
    setTimeout(() => setLoading(false), 5000)
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <Button
        buttonStyle="secondary"
        onClick={handleExport}
        disabled={loading}
        size="small"
      >
        {loading ? 'Preparing ZIP...' : 'Download All Assets (.zip)'}
      </Button>
    </div>
  )
}
