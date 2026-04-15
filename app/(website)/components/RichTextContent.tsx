"use client"
import Image from "next/image"
import { getMediaUrl } from "@/lib/utils"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Node {
    type: string
    [key: string]: any
}

interface RichTextData {
    root: {
        children: Node[]
    }
}

// Lexical format bitmask: 1=bold, 2=italic, 4=strikethrough, 8=underline
function renderInlineNodes(nodes: Node[]) {
    if (!nodes) return null
    return nodes.map((node, i) => {
        if (node.type === 'link') {
            const url = node.fields?.url || '#'
            const newTab = node.fields?.newTab
            return (
                <a
                    key={i}
                    href={url}
                    className="text-[#1d2088] hover:underline font-medium"
                    {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                    {renderInlineNodes(node.children)}
                </a>
            )
        }
        if (node.type === 'linebreak') {
            return <br key={i} />
        }
        if (node.type === 'text') {
            const format = node.format || 0
            const text: string = node.text || ''

            // Split text at \n characters and insert <br> elements
            const parts = text.split('\n')
            let content: React.ReactNode
            if (parts.length > 1) {
                content = parts.map((part, pi) => (
                    <span key={`t-${i}-${pi}`}>
                        {pi > 0 && <br />}
                        {part}
                    </span>
                ))
            } else {
                content = text
            }

            if (format & 1) content = <strong key={`b-${i}`}>{content}</strong>
            if (format & 2) content = <em key={`i-${i}`}>{content}</em>
            if (format & 4) content = <s key={`s-${i}`}>{content}</s>
            if (format & 8) content = <span key={`u-${i}`} className="underline">{content}</span>
            return <span key={i}>{content}</span>
        }
        return null
    })
}

interface RichTextContentProps {
    data: RichTextData | string | null | undefined
    className?: string
}

export default function RichTextContent({ data, className = '' }: RichTextContentProps) {
    if (!data) return null

    // Fallback for string/markdown data
    if (typeof data === 'string') {
        return (
            <div className={`prose prose-neutral max-w-none ${className}`}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {data.replace(/<br\s*\/?>/gi, '  \n')}
                </ReactMarkdown>
            </div>
        )
    }

    if (!data.root?.children) return null

    return (
        <div className={`prose prose-neutral max-w-none ${className}`}>
            {data.root.children.map((block, i) => {
                switch (block.type) {
                    case 'heading': {
                        const tag = block.tag
                        const inner = renderInlineNodes(block.children)
                        if (tag === 'h1') return <h1 key={i} className="text-4xl font-bold mb-6">{inner}</h1>
                        if (tag === 'h2') return <h2 key={i} className="text-3xl font-bold mb-5">{inner}</h2>
                        if (tag === 'h3') return <h3 key={i} className="text-2xl font-bold mb-4">{inner}</h3>
                        if (tag === 'h4') return <h4 key={i} className="text-xl font-semibold mb-3">{inner}</h4>
                        return <h3 key={i} className="text-2xl font-bold mb-4">{inner}</h3>
                    }
                    case 'list': {
                        const items = block.children.map((li: Node, j: number) => (
                            <li key={j}>
                                {renderInlineNodes(li.children)}
                            </li>
                        ))
                        return block.listType === 'number'
                            ? <ol key={i} className="list-decimal pl-6 space-y-2">{items}</ol>
                            : <ul key={i} className="list-disc pl-6 space-y-2">{items}</ul>
                    }
                    case 'upload': {
                        const media = block.value
                        if (!media) return null
                        const src = getMediaUrl(media)
                        if (!src) return null
                        return (
                            <div key={i} className="my-8 relative aspect-video w-full overflow-hidden rounded-lg">
                                <Image
                                    src={src}
                                    alt={media.alt || 'Content image'}
                                    fill
                                    className="object-cover"
                                />
                                {media.caption && (
                                    <p className="mt-2 text-sm text-gray-500 text-center">{media.caption}</p>
                                )}
                            </div>
                        )
                    }
                    case 'paragraph':
                    default:
                        if (!block.children || block.children.length === 0) return null
                        return (
                            <p key={i} className="mb-4 last:mb-0">
                                {renderInlineNodes(block.children)}
                            </p>
                        )
                }
            })}
        </div>
    )
}
