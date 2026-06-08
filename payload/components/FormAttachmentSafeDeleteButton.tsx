'use client'

import React from 'react'
import { Button, ConfirmationModal, toast, useModal } from '@payloadcms/ui'
import { SelectAllStatus, useSelection } from '@payloadcms/ui/providers/Selection'
import { useRouter } from 'next/navigation'

type Reference = {
  collection: string
  field: string
  fieldLabel: string
  id: number | string
  title: string
}

type Preview = {
  attachments: Array<{
    filename: string | null
    id: number | string
    references: Reference[]
    title: string
  }>
  parentSubmissions: Reference[]
  unreferencedAttachmentIds: Array<number | string>
}

const MODAL_SLUG = 'form-attachment-safe-delete-confirm'

function getCollectionLabel(collection: string) {
  if (collection === 'form-company-submissions') return 'company submission'
  if (collection === 'form-personal-submissions') return 'personal submission'
  return collection
}

function ModalBody({ preview }: { preview: Preview }) {
  const referencedAttachments = preview.attachments.filter((attachment) => attachment.references.length > 0)
  const parentCount = preview.parentSubmissions.length

  return (
    <div>
      {parentCount > 0 ? (
        <>
          <p>
            {referencedAttachments.length} selected attachment(s) still belong to parent submission(s).
            Confirming will delete those parent submission(s), so Payload can clean up the related files safely.
          </p>
          <ul>
            {referencedAttachments.map((attachment) => (
              <li key={attachment.id}>
                <strong>{attachment.title}</strong>
                <ul>
                  {attachment.references.map((reference) => (
                    <li key={`${attachment.id}-${reference.collection}-${reference.id}-${reference.field}`}>
                      {getCollectionLabel(reference.collection)} #{reference.id} ({reference.title}) via {reference.fieldLabel}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No parent submissions were found for the selected attachments.</p>
      )}
      {preview.unreferencedAttachmentIds.length > 0 && (
        <p>{preview.unreferencedAttachmentIds.length} selected orphan attachment(s) will be deleted directly.</p>
      )}
    </div>
  )
}

export const FormAttachmentSafeDeleteButton: React.FC = () => {
  const router = useRouter()
  const { closeModal, openModal } = useModal()
  const { count, selectAll, selectedIDs, toggleAll } = useSelection()
  const [loading, setLoading] = React.useState(false)
  const [preview, setPreview] = React.useState<Preview | null>(null)

  const selectedIds = React.useMemo(() => selectedIDs.map(String), [selectedIDs])

  const handleOpen = async () => {
    if (selectAll === SelectAllStatus.AllAvailable) {
      toast.error('Safe delete supports selected rows on the current page. Please select the visible rows you want to delete.')
      return
    }

    if (selectedIds.length === 0) {
      toast.error('Select one or more attachments first.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/form-attachments/safe-delete', {
        body: JSON.stringify({ ids: selectedIds }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || 'Could not prepare safe delete.')
      }

      setPreview(data.preview)
      openModal(MODAL_SLUG)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not prepare safe delete.')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = async () => {
    if (!preview) return

    const response = await fetch('/api/form-attachments/safe-delete', {
      body: JSON.stringify({ apply: true, ids: selectedIds }),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data?.error || 'Could not delete selected attachments.')
    }

    toast.success('Selected attachments were cleaned up.')
    closeModal(MODAL_SLUG)
    toggleAll()
    router.refresh()
  }

  if (count === 0) {
    return null
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <Button buttonStyle="secondary" disabled={loading} onClick={handleOpen} size="small" type="button">
        {loading ? 'Checking references...' : `Delete selected safely (${count})`}
      </Button>
      {preview && (
        <ConfirmationModal
          body={<ModalBody preview={preview} />}
          confirmLabel="Yes, delete safely"
          confirmingLabel="Deleting..."
          heading="Delete selected attachments?"
          modalSlug={MODAL_SLUG}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  )
}
