import { createDOM } from "./dom";
import type { Fiber } from "./types";

export function performUnitOfWork(fiber: Fiber) {
  if (!fiber.dom) {
    fiber.dom = createDOM(fiber);
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
