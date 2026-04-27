import type { Access } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user && user.role === 'admin')
}

export const isArticleCreator: Access = ({ req: { user } }) => {
  return Boolean(user && (user.role === 'admin' || user.role === 'article-creator'))
}

export const isLegal: Access = ({ req: { user } }) => {
  return Boolean(user && (user.role === 'admin' || user.role === 'legal'))
}

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin') return true
  return {
    id: {
      equals: user.id,
    },
  }
}
