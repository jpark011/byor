import * as React from "@/react";
import { workState } from "./work";

export function render(element: React.Element, container: HTMLElement) {
  workState.nextUnitOfWork = {
    type: "div",
    dom: container,
    props: {
      children: [element],
    },
  };
}
