/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import config from '@payload-config'
import '@payloadcms/next/css'
import { handleServerFunctions } from '@payloadcms/next/layouts'
import { RootLayout } from '@payloadcms/next/layouts'
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import React from 'react'

import './custom.scss'

import { importMap } from './admin/importMap'

async function serverFunction(args: any) {
    'use server'
    return handleServerFunctions({
        ...args,
        config,
        importMap,
    })
}

type Args = {
    children: React.ReactNode
}

const Layout = ({ children }: Args) => (
    <RootLayout
        config={config}
        importMap={importMap}
        serverFunction={serverFunction}
    >
        {children}
    </RootLayout>
)

export default Layout
