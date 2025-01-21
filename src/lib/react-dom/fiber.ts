import * as React from '@/react'
import { updateDom } from './dom'
import type { Fiber } from './types'
import { workState } from './work'

export function commitWork(fiber?: Fiber) {
  if (!fiber) {
    return
  }

  const domParent = fiber.parent?.dom

  if (fiber.effectTag === 'PLACEMENT' && fiber.dom) {
    fiber.dom && domParent?.appendChild(fiber.dom)
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom) {
    updateDom(fiber.dom, fiber.props, fiber.alternate?.props)
  } else if (fiber.effectTag === 'DELETION' && fiber.dom) {
    domParent?.removeChild(fiber.dom)
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

export function reconcileChildren(
  fiber: Fiber,
  children: React.Element[] = []
) {
  let index = 0
  let oldFiber = fiber.alternate?.child
  let prevSibling: Fiber

  while (index < children.length || oldFiber) {
    const element = children[index]
    let newFiber: Fiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    }

    const sameType = oldFiber && element && element.type === oldFiber.type

    if (sameType) {
      newFiber = {
        ...oldFiber!,
        props: element.props,
        parent: fiber,
        alternate: oldFiber,
        effectTag: 'UPDATE',
      }
    } else if (element) {
      newFiber = {
        ...element!,
        dom: null,
        parent: fiber,
        effectTag: 'PLACEMENT',
      }
    } else if (oldFiber) {
      oldFiber.effectTag = 'DELETION'
      workState.deletions.push(oldFiber)
    }

    if (index === 0) {
      fiber.child = newFiber
    } else {
      prevSibling!.sibling = newFiber
    }

    prevSibling = newFiber
    oldFiber && (oldFiber = oldFiber.sibling)
    index++
  }
}
