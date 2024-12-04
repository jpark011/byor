import * as React from "@/react";
import { render } from "./render";

export function createDOM(fiber: React.Element) {
  const dom =
    fiber.type == "TEXT_ELEMENT"
      ? document.createTextNode(fiber.props.nodeValue)
      : document.createElement(fiber.type);

  if (dom instanceof HTMLElement) {
    Object.keys(fiber.props)
      .filter((key) => key !== "children")
      .forEach((name) => {
        dom.setAttribute(name, fiber.props[name]);
      });
    fiber.props.children?.forEach((child) => render(child, dom));
  }

  return dom;
}
