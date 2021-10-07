export const isFunction = (value: any) => {
  return typeof value === 'function' || value instanceof Function
}

export const exchangeKey = (key: string): string => {
  switch (key) {
    case 'd+':
      return 'days'
    case 'h+':
      return 'hours'
    case 'm+':
      return 'minutes'
    case 's+':
      return 'seconds'
    case 'i+':
      return 'milliseconds'
    default:
      return ''
  }
}
