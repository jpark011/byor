import * as React from "@/react";
import { createDOM } from "./dom";

type Fiber = React.Element & {
  dom: HTMLElement | Text | null;
  parent?: Fiber;
  child?: Fiber;
  sibling?: Fiber;
};
type WorkState = {
  nextUnitOfWork: Fiber | null;
};

export const workState: WorkState = {
  nextUnitOfWork: null,
};

const workLoop: IdleRequestCallback = (deadline) => {
  let shouldYield = false;
  while (workState.nextUnitOfWork && !shouldYield) {
    workState.nextUnitOfWork = performUnitOfWork(workState.nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
};
requestIdleCallback(workLoop);

function performUnitOfWork(fiber: Fiber) {
  if (!fiber.dom) {
    fiber.dom = createDOM(fiber);
  }
  if (fiber.parent?.dom) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  const { children } = fiber.props;
  let index = 0;
  let prevSibling: Fiber;

  while (children && index < children.length) {
    const element = children[index];
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling!.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }

  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber: Fiber | undefined = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }

  return null;
}
