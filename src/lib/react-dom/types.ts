import * as React from '@/react'

export type Fiber = React.Element & {
  dom: Element | Text | null
  parent?: Fiber
  child?: Fiber
  sibling?: Fiber
  alternate?: Fiber
  effectTag?: 'UPDATE' | 'PLACEMENT' | 'DELETION'
}

export type WorkState = {
  wipRoot: Fiber | null
  currentRoot: Fiber | null
  nextUnitOfWork: Fiber | null
  deletions: Fiber[]
}
