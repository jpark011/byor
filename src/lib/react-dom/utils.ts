export function toKebab(camelCase: string): string {
  return camelCase.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export function isProperty(key: string): boolean {
  return key !== 'children' && !isEvent(key)
}

export function isEvent(key: string): boolean {
  return key.startsWith('on')
}

export function isNew(
  prev: Record<string, any>,
  next: Record<string, any>
): (key: string) => boolean {
  return (key: string) => prev[key] !== next[key]
}

export function isGone(
  prev: Record<string, any>,
  next: Record<string, any>
): (key: string) => boolean {
  return (key: string) => !(key in next)
}
