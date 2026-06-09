'use client'

import React from 'react'
import { ConfirmationModal, toast, useModal, useSelection } from '@payloadcms/ui'
import { ListSelectionButton } from '@payloadcms/ui/elements/ListSelection'
import { createPortal } from 'react-dom'
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
  const { count, getSelectedIds, selectedIDs, toggleAll } = useSelection()
  const [loading, setLoading] = React.useState(false)
  const [preview, setPreview] = React.useState<Preview | null>(null)
  const [deleteIds, setDeleteIds] = React.useState<string[]>([])
  const [portalTarget, setPortalTarget] = React.useState<Element | null>(null)

  const selectedIds = React.useMemo(() => selectedIDs.map(String), [selectedIDs])
  const selectedCount = count ?? selectedIds.length

  React.useEffect(() => {
    const updatePortalTarget = () => {
      setPortalTarget(document.querySelector('.collection-list--form-attachments .list-selection'))
    }

    updatePortalTarget()

    const observer = new MutationObserver(updatePortalTarget)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  const handleOpen = async () => {
    const activeIds = getSelectedIds().map(String)

    if (activeIds.length === 0) {
      toast.error('Select one or more attachments first.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/form-attachments/safe-delete', {
        body: JSON.stringify({ ids: activeIds }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || 'Could not prepare safe delete.')
      }

      setPreview(data.preview)
      setDeleteIds(activeIds)
      openModal(MODAL_SLUG)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not prepare safe delete.')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = async () => {
    if (!preview) return

    try {
      const response = await fetch('/api/form-attachments/safe-delete', {
        body: JSON.stringify({ apply: true, ids: deleteIds }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || 'Could not delete selected attachments.')
      }

      toast.success('Selected attachments were cleaned up.')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Could not delete selected attachments.')
    } finally {
      closeModal(MODAL_SLUG)
      setPreview(null)
      setDeleteIds([])
      toggleAll()
      router.refresh()
      window.setTimeout(() => {
        window.location.reload()
      }, 250)
    }
  }

  if (selectedCount === 0) {
    return null
  }

  const button = (
    <div className="form-attachment-safe-delete">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .collection-list--form-attachments .form-attachment-safe-delete .list-selection__button {
              white-space: nowrap;
            }

            .collection-list--form-attachments .collection-list__wrap > .form-attachment-safe-delete {
              margin: 16px 0;
            }
          `,
        }}
      />
      <ListSelectionButton disabled={loading} onClick={handleOpen} type="button">
        {loading ? 'Checking...' : 'Delete'}
      </ListSelectionButton>
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

  return portalTarget ? createPortal(button, portalTarget) : button
}
