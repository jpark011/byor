import type { WorkState } from './types'

export const workState: WorkState = {
  wipRoot: null,
  currentRoot: null,
  nextUnitOfWork: null,
  deletions: [],
}
