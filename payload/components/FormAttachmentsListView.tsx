'use client'

import React from 'react'
import type { ListViewClientProps } from 'payload'
import { DefaultListView } from '@payloadcms/ui'
import { FormAttachmentSafeDeleteButton } from './FormAttachmentSafeDeleteButton'

export const FormAttachmentsListView: React.FC<ListViewClientProps> = (props) => {
  return (
    <DefaultListView
      {...props}
      BeforeListTable={
        <>
          {props.BeforeListTable}
          <FormAttachmentSafeDeleteButton />
        </>
      }
      disableBulkDelete
    />
  )
}
