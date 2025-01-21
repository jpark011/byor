import * as React from '@/react'
import { workLoop } from './work'
import { workState } from './work-state'

export function render(element: React.Element, container: Element) {
  workState.wipRoot = {
    type: element.type,
    dom: container,
    props: {
      children: element.props.children,
    },
    alternate: workState.currentRoot || undefined,
  }
  workState.nextUnitOfWork = workState.wipRoot
  requestIdleCallback(workLoop)
}
