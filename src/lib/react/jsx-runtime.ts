export type ElementType =
  | keyof HTMLElementTagNameMap
  | keyof SVGElementTagNameMap
  | 'TEXT_ELEMENT'
  | Function
export type Element = {
  type: ElementType
  props: WithChildren<Record<string, any>>
}
type WithChildren<T> = T & { children?: Element[] }

export function createElement(
  type: ElementType,
  props?: Record<string, any> | null,
  ...children: any[]
): Element {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === 'object' ? child : createTextElement(child)
      ),
    },
  }
}

function createTextElement(text: string) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  }
}
