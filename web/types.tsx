export interface Token {
  access: string
  refresh: string
}

export interface User {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  groups: Group[]
}

export interface Group {
  id: number
  name: string
}
