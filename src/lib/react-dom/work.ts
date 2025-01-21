import { updateDom } from './dom'

import { updateFunctionComponent, updateHostComponent } from './fiber'
import type { Fiber } from './types'
import { workState } from './work-state'

export const workLoop: IdleRequestCallback = deadline => {
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

function commitRoot() {
  workState.deletions.forEach(commitWork)
  commitWork(workState.wipRoot?.child || undefined)
  workState.currentRoot = workState.wipRoot
  workState.wipRoot = null
}

function commitWork(fiber?: Fiber) {
  if (!fiber) {
    return
  }

  let parentFiber = fiber.parent
  while (!parentFiber?.dom) {
    parentFiber = parentFiber?.parent
  }
  const domParent = fiber.parent?.dom

  if (fiber.effectTag === 'PLACEMENT' && fiber.dom) {
    fiber.dom && domParent?.appendChild(fiber.dom)
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom) {
    updateDom(fiber.dom, fiber.props, fiber.alternate?.props)
  } else if (fiber.effectTag === 'DELETION' && fiber.dom) {
    const deleteChild = (fiber: Fiber, parent: Fiber['dom']): unknown =>
      fiber.dom
        ? parent?.removeChild(fiber.dom)
        : fiber.child
        ? deleteChild(fiber.child, parent)
        : undefined
    domParent && deleteChild(fiber, domParent)
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

function performUnitOfWork(fiber: Fiber) {
  if (fiber.type instanceof Function) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }

  if (fiber.child) {
    return fiber.child
  }

  let nextFiber: Fiber | undefined = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.parent
  }

  return null
}
