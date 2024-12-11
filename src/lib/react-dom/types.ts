import * as React from "@/react";

export type Fiber = React.Element & {
  dom: Element | Text | null;
  parent?: Fiber;
  child?: Fiber;
  sibling?: Fiber;
};

export type WorkState = {
  wipRoot: Fiber | null;
  nextUnitOfWork: Fiber | null;
};
