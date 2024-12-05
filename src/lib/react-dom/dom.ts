import * as React from "@/react";
import type { CSSProperties } from "react";
import { render } from "./render";
import { toKebab } from "./utils";

function toStylesAttribute(styles: CSSProperties): string {
  return Object.entries(styles)
    .map(([key, value]) => {
      return `${toKebab(key)}: ${value};`;
    })
    .join(" ");
}

export function createDOM(fiber: React.Element) {
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode(fiber.props.nodeValue)
      : fiber.type === "svg"
      ? document.createElementNS("http://www.w3.org/2000/svg", fiber.type)
      : document.createElement(fiber.type);

  if (dom instanceof Element) {
    Object.keys(fiber.props)
      .filter((key) => key !== "children")
      .forEach((name) => {
        if (name === "style" && typeof fiber.props[name] === "object") {
          const styleString = toStylesAttribute(fiber.props[name]);
          dom.setAttribute("style", styleString);
          return;
        }
        // @ts-ignore
        dom[name] = fiber.props[name];
        dom.setAttribute(toKebab(name), fiber.props[name]);
      });
    fiber.props.children?.forEach((child) => render(child, dom));
  }

  return dom;
}
