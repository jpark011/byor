import * as React from '@/react'
import { workState } from './work'

export function render(element: React.Element, container: Element) {
  workState.wipRoot = {
    type: 'div',
    dom: container,
    props: {
      children: [element],
    },
    alternate: workState.currentRoot || undefined,
  }
  workState.nextUnitOfWork = workState.wipRoot
}
