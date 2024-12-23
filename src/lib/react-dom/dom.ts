import * as React from '@/react'
import type { CSSProperties } from 'react'
import { SVG_TAG_NAMES } from './const'
import type { Fiber } from './types'
import { isEvent, isGone, isNew, isProperty, toKebab } from './utils'

function toStylesAttribute(styles: CSSProperties): string {
  return Object.entries(styles)
    .map(([key, value]) => {
      return `${toKebab(key)}: ${value};`
    })
    .join(' ')
}

export function createDOM(fiber: React.Element) {
  const dom =
    fiber.type === 'TEXT_ELEMENT'
      ? document.createTextNode(fiber.props.nodeValue)
      : SVG_TAG_NAMES.has(fiber.type)
      ? document.createElementNS('http://www.w3.org/2000/svg', fiber.type)
      : document.createElement(fiber.type)

  updateDom(dom, fiber.props)
  return dom
}

export function updateDom(
  dom: Fiber['dom'],
  nextProps: React.Element['props'],
  prevProps: React.Element['props'] = {}
) {
  if (!(dom instanceof Element)) {
    return
  }

  Object.keys(prevProps)
    .filter(isEvent)
    .filter(
      key =>
        isGone(prevProps, nextProps)(key) || isNew(prevProps, nextProps)(key)
    )
    .forEach(key => {
      const eventType = key.toLowerCase().substring(2)
      dom.removeEventListener(eventType, prevProps[key])
    })

  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(key => {
      // @ts-ignore
      dom[key] = ''
    })

  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(key => {
      // @ts-ignore
      if (key === 'style' && typeof nextProps[key] === 'object') {
        const styleString = toStylesAttribute(nextProps[key])
        dom.setAttribute('style', styleString)
        return
      }
      // @ts-ignore
      dom[key] = nextProps[key]
      dom.setAttribute(toKebab(key), nextProps[key])
    })

  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(key => {
      const eventType = key.toLowerCase().substring(2)
      dom.addEventListener(eventType, nextProps[key])
    })
}
