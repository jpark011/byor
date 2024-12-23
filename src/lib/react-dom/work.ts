import { commitWork, performUnitOfWork } from './fiber'
import type { WorkState } from './types'

export const workState: WorkState = {
  wipRoot: null,
  currentRoot: null,
  nextUnitOfWork: null,
  deletions: [],
}

const workLoop: IdleRequestCallback = deadline => {
  let shouldYield = false
  while (workState.nextUnitOfWork && !shouldYield) {
    workState.nextUnitOfWork = performUnitOfWork(workState.nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }

  if (!workState.nextUnitOfWork && workState.wipRoot) {
    commitRoot()
  }

  requestIdleCallback(workLoop)
}
requestIdleCallback(workLoop)

function commitRoot() {
  workState.deletions.forEach(commitWork)
  commitWork(workState.wipRoot?.child || undefined)
  workState.currentRoot = workState.wipRoot
  workState.wipRoot = null
}
