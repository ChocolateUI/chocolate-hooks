import { useMethodsNative } from '../useNativeMethod'

const reducers = {
  on() {
    return true
  },
  off() {
    return false
  },
  toggle(prevState: boolean, arg: unknown) {
    return typeof arg === 'boolean' ? arg : !prevState
  },
}

export function useBoolean(initialValue: boolean = false) {
  return useMethodsNative(reducers, initialValue)
}

export function useSwitch(initialValue: boolean = false) {
  const [value, { on, off, toggle }] = useBoolean(initialValue)
  return [value, on, off, toggle] as const
}
