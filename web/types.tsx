export const TODAY = 'today'
export const TOMORROW = 'tomorrow'

export type DateType = typeof TODAY | typeof TOMORROW

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

export interface Home {
  id: number
  name: string
  address: string
}

export interface Device {
  id: number
  name: string
  deviceType: string
  priority: number
  power: number | null
  capacity: number | null
}

export interface Constraint {
  id: number
  constraintType: string
  constraintDirection: string
  start: string
  stop: string
  sourceId: string
}

export interface Schedule {
  id: number
  date: string
  elements: ScheduleElement[]
}

export interface ScheduleElement {
  id: number
  device: Device
  power: number[]
}
