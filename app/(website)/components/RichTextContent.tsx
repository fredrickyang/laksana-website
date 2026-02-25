"use client"

interface TextNode {
    type: 'text'
    text: string
    format?: number
}

interface LinkNode {
    type: 'link'
    children: TextNode[]
    fields: {
        url: string
        newTab?: boolean
        linkType?: string
    }
}

interface ListItemNode {
    type: 'listitem'
    children: (TextNode | LinkNode)[]
}

interface ListNode {
    type: 'list'
    listType: 'bullet' | 'number'
    children: ListItemNode[]
}

interface HeadingNode {
    type: 'heading'
    tag: string
    children: (TextNode | LinkNode)[]
}

interface ParagraphNode {
    type: 'paragraph'
    children: (TextNode | LinkNode)[]
}

type BlockNode = ParagraphNode | HeadingNode | ListNode

interface RichTextData {
    root: {
        children: BlockNode[]
    }
}

// Lexical format bitmask: 1=bold, 2=italic
function renderInlineNodes(nodes: (TextNode | LinkNode)[]) {
    return nodes.map((node, i) => {
        if (node.type === 'link') {
            const url = node.fields?.url || '#'
            const newTab = node.fields?.newTab
            return (
                <a
                    key={i}
                    href={url}
                    className="text-blue-600 hover:text-blue-800 font-semibold underline"
                    {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                    {node.children?.map((c, j) => renderTextNode(c, j))}
                </a>
            )
        }
        return renderTextNode(node, i)
    })
}

function renderTextNode(node: TextNode, key: number) {
    const format = node.format || 0
    let content: React.ReactNode = node.text
    if (format & 1) content = <strong key={`b-${key}`}>{content}</strong>
    if (format & 2) content = <em key={`i-${key}`}>{content}</em>
    return <span key={key}>{content}</span>
}

interface RichTextContentProps {
    data: RichTextData | null | undefined
    className?: string
}

export default function RichTextContent({ data, className = '' }: RichTextContentProps) {
    if (!data?.root?.children) return null

    return (
        <div className={className}>
            {data.root.children.map((block, i) => {
                switch (block.type) {
                    case 'heading': {
                        const tag = (block as HeadingNode).tag
                        const inner = renderInlineNodes(block.children)
                        if (tag === 'h3') return <h3 key={i} className="text-2xl font-bold text-gray-900 mb-4">{inner}</h3>
                        if (tag === 'h4') return <h4 key={i} className="text-xl font-semibold text-gray-800 mb-3">{inner}</h4>
                        if (tag === 'h5') return <h5 key={i} className="font-bold text-gray-900 mb-2">{inner}</h5>
                        return <h3 key={i} className="text-2xl font-bold text-gray-900 mb-4">{inner}</h3>
                    }
                    case 'list': {
                        const listNode = block as ListNode
                        const items = listNode.children.map((li, j) => (
                            <li key={j} className="flex gap-3 text-gray-700">
                                <span className="text-blue-600 font-bold shrink-0">
                                    {listNode.listType === 'number' ? `${j + 1}.` : '•'}
                                </span>
                                <span>{renderInlineNodes(li.children)}</span>
                            </li>
                        ))
                        return listNode.listType === 'number'
                            ? <ol key={i} className="space-y-3">{items}</ol>
                            : <ul key={i} className="space-y-3">{items}</ul>
                    }
                    case 'paragraph':
                    default:
                        return (
                            <p key={i} className="text-gray-700 leading-relaxed">
                                {renderInlineNodes((block as ParagraphNode).children || [])}
                            </p>
                        )
                }
            })}
        </div>
    )
}
