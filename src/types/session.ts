export interface SessionUser {
  id: string
  email?: string | null
  name?: string | null
  image?: string | null
}

export interface Session {
  user: SessionUser
}
