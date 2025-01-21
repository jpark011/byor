import * as React from '@/react'
import { createDOM } from './dom'
import type { Fiber } from './types'
import { workState } from './work-state'

export function updateHostComponent(fiber: Fiber) {
  if (!fiber.dom) {
    fiber.dom = createDOM(fiber)
  }

  reconcileChildren(fiber, fiber.props.children)
}

export function updateFunctionComponent(fiber: Fiber) {
  if (!(fiber.type instanceof Function)) {
    return
  }
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
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
