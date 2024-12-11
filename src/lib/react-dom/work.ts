import { performUnitOfWork } from "./fiber";
import type { WorkState } from "./types";

export const workState: WorkState = {
  nextUnitOfWork: null,
  wipRoot: null,
};

const workLoop: IdleRequestCallback = (deadline) => {
  let shouldYield = false;
  while (workState.nextUnitOfWork && !shouldYield) {
    workState.nextUnitOfWork = performUnitOfWork(workState.nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!workState.nextUnitOfWork && workState.wipRoot) {
    commitRoot();
  }

  requestIdleCallback(workLoop);
};
requestIdleCallback(workLoop);

function commitRoot() {
  throw new Error("Function not implemented.");
}
