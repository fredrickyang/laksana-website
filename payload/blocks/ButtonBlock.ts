import type { Block } from 'payload'

export const ButtonBlock: Block = {
    slug: 'button',
    labels: {
        singular: 'Button',
        plural: 'Buttons',
    },
    fields: [
        {
            name: 'label',
            type: 'text',
            required: true,
        },
        {
            name: 'url',
            type: 'text',
            required: true,
        },
        {
            name: 'style',
            type: 'select',
            defaultValue: 'primary',
            options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Outline', value: 'outline' },
            ],
        },
    ],
}
