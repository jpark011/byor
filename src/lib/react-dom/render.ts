import * as React from "@/react";

export function render(element: React.Element, container: HTMLElement) {
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode(element.props.nodeValue)
      : document.createElement(element.type);

  if (dom instanceof HTMLElement) {
    Object.keys(element.props)
      .filter((key) => key !== "children")
      .forEach((name) => {
        dom.setAttribute(name, element.props[name]);
      });
    element.props.children?.forEach((child) => render(child, dom));
  }

  container.appendChild(dom);
}
