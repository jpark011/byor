type ElementType = React.ElementType | "TEXT_ELEMENT";

export function createElement(
  type: ElementType,
  props?: Record<string, any> | null,
  ...children: any[]
) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text: string) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
