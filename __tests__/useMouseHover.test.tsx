import { renderHook, act } from '@testing-library/react-hooks'
import useMouseHover from '../src/hooks/useMouseHover/index'

const timeout = (time) => new Promise((resolve) => setTimeout(resolve, time))

test('initial hook', () => {
  const { result } = renderHook(() => useMouseHover())
  expect(result.current[0]).toBe(false)
  expect(typeof result.current[1].onMouseEnter).toBe('function')
  expect(typeof result.current[1].onMouseLeave).toBe('function')
})

test('enter', () => {
  const { result } = renderHook(() => useMouseHover())
  act(() => result.current[1].onMouseEnter())
  expect(result.current[0]).toBe(true)
})

test('leave', () => {
  const { result } = renderHook(() => useMouseHover())
  act(() => result.current[1].onMouseEnter())
  act(() => result.current[1].onMouseLeave())
  expect(result.current[0]).toBe(false)
})

test('delay', async () => {
  const { result } = renderHook(() => useMouseHover({ delay: 4 }))
  act(() => result.current[1].onMouseEnter())
  expect(result.current[0]).toBe(false)
  await act(() => timeout(20))
  expect(result.current[0]).toBe(true)
})

test('leave cancel delayed enter', async () => {
  const enter = jest.fn()
  const leave = jest.fn()
  const { result } = renderHook(() =>
    useMouseHover({ delay: 10, onEnter: enter, onLeave: leave }),
  )
  act(() => result.current[1].onMouseEnter())
  await timeout(5)
  act(() => result.current[1].onMouseLeave())
  await act(() => timeout(10))
  expect(result.current[0]).toBe(false)
  expect(enter).not.toHaveBeenCalled()
  expect(leave).not.toHaveBeenCalled()
})

test('enter when hovered', async () => {
  const enter = jest.fn()
  const leave = jest.fn()
  const { result } = renderHook(() =>
    useMouseHover({ delay: 10, onEnter: enter, onLeave: leave }),
  )
  act(() => result.current[1].onMouseEnter())
  await act(() => timeout(15))
  expect(result.current[0]).toBe(true)
  act(() => result.current[1].onMouseLeave())
  await timeout(5)
  expect(result.current[0]).toBe(true)
  act(() => result.current[1].onMouseEnter())
  await act(() => timeout(10))
  expect(result.current[0]).toBe(true)
  expect(enter).toHaveBeenCalledTimes(1)
  expect(leave).not.toHaveBeenCalled()
})

test('leave when not hovered', async () => {
  const enter = jest.fn()
  const leave = jest.fn()
  const { result } = renderHook(() =>
    useMouseHover({ delay: 10, onEnter: enter, onLeave: leave }),
  )
  act(() => result.current[1].onMouseEnter())
  await act(() => timeout(5))
  expect(result.current[0]).toBe(false)
  act(() => result.current[1].onMouseLeave())
  await timeout(10)
  expect(result.current[0]).toBe(false)
  expect(enter).not.toHaveBeenCalled()
  expect(leave).not.toHaveBeenCalled()
})

test('extra callback', () => {
  const enter = jest.fn()
  const leave = jest.fn()
  const { result } = renderHook(() =>
    useMouseHover({ onEnter: enter, onLeave: leave }),
  )
  const enterEvent = new MouseEvent('mouseenter')
  act(() => result.current[1].onMouseEnter(enterEvent))
  expect(enter).toHaveBeenCalledTimes(1)
  expect(enter).toHaveBeenCalledWith(enterEvent)
  const leaveEvent = new MouseEvent('mouseleave')
  act(() => result.current[1].onMouseLeave(leaveEvent))
  expect(leave).toHaveBeenCalledTimes(1)
  expect(leave).toHaveBeenCalledWith(leaveEvent)
})
