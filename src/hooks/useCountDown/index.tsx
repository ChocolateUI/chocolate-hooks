/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useCallback } from 'react'
import { exchangeKey } from '../../utils/function'
import useSetState from '../useSetState'
/**
 * 倒计时 hooks，支持毫秒级
 * 当 diff 小于 16.6ms ≈ 17ms 时直接使用 raf，由浏览器调度
 * 
 * 使用方法：
  const [dateString, allOptions] = useCountDown({
    total: 60 * 9 * 1000,
    endTime: Date.now() + 60 * 9 * 1000,
    format: 'mm分ss秒',
    diff: 1000,
    onStart: () => console.log('start');
    onStep: () => console.log('step');
    onEnd: () => console.log('end'),
  });
  const { days, hours, minutes, seconds, milliseconds } = allOptions || {}; // 返回所有项，便于添加样式
  dateString 即是经过 format 转换之后的时刻
 *
 */
interface CountDownProps {
  /**
   * 倒计时的时间，单位 ms。onHand = true 时可以不传入
   */
  total?: number
  /**
   * 结束的时间点，与 total 二选一，且优先级更高，单位 ms。onHand = true 时可以不传入
   */
  endTime?: number
  /**
   * 要展示的时间格式 mm:ss || mm-ss etc...
   */
  format: string
  /**
   * 递减频率
   */
  diff?: number
  /**
   * 开始时回调
   */
  onStart?: () => void
  /**
   * 每次更新时执行的回调
   */
  onStep?: (step: number) => void
  /**
   * 结束时回调
   */
  onEnd?: () => void
  /**
   * 手动控制开始。为 true 时，需配合 setEndTime:(date) => void 使用。使用场景：验证码倒计时
   * 传入 Date.now() + $time 开始计时
   * 传入 undefined 停止计时
   */
  onHand?: boolean
}

export type TDate = number | undefined

export interface StateProps {
  endTime: number // 结束时间
  progress: number | string | undefined // 当前时间
  status: 'pending' | 'running' | 'suspend' | 'ended' // 状态
  allOptions?: OptionsType
}

export interface OptionsType {
  days: number | undefined
  hours: number | undefined
  minutes: number | undefined
  seconds: number | undefined
  milliseconds: number | undefined
}

export interface FormattedRes {
  'd+': number
  'h+': number
  'm+': number
  's+': number
  'i+': number
  [propName: string]: number
}

export interface TimeProps {
  format: string
  dateFormat: FormattedRes
}

const useCountDown = (props: CountDownProps) => {
  // let timer: number = 0

  const [state, setState] = useSetState<StateProps>({
    status: 'pending',
    endTime: 0,
    progress: undefined,
    allOptions: {
      days: undefined,
      hours: undefined,
      minutes: undefined,
      seconds: undefined,
      milliseconds: undefined,
    },
  })

  const timer = useRef(0)

  const countRef = useRef<TDate>()
  const { diff, format, endTime = undefined, total, onHand = false } = props

  const stopRaf = useRef(true)

  const execute = useCallback((fn: string, ...params: string[] | number[]) => {
    const func = (props as any)[fn]
    if (typeof func === 'function') {
      func(...params)
    }
  }, [])

  const formatTime = (
    timestamp: number,
    formatStr: string = 'dd hh:mm:ss.ii',
  ): TimeProps => {
    const dateFormat: FormattedRes = {
      'd+': Math.floor(timestamp / 1000 / 60 / 60 / 24), // 天
      'h+': Math.floor((timestamp / 1000 / 60 / 60) % 24), // 时
      'm+': Math.floor((timestamp / 1000 / 60) % 60), // 分
      's+': Math.floor((timestamp / 1000) % 60), // 秒
      'i+': timestamp % 1000, // 毫秒
    }

    Object.keys(dateFormat).forEach((key) => {
      if (new RegExp(`(${key})`).test(formatStr)) {
        formatStr = formatStr.replace(RegExp.$1, () => {
          const regLen = RegExp.$1.length
          if (/i+/.test(RegExp.$1)) {
            return `${dateFormat[key]}000`.substr(0, regLen)
          }
          return regLen === 1
            ? `${dateFormat[key]}`
            : `00${dateFormat[key]}`.substr(`${dateFormat[key]}`.length)
        })
      }
    })

    const dateFormatReturn = {} as FormattedRes
    Object.keys(dateFormat).forEach((key) => {
      const ele = dateFormat[key]
      dateFormatReturn[exchangeKey(key)] = ele
    })

    return { format: formatStr, dateFormat: dateFormatReturn }
  }

  // 停止倒计时
  const stop = () => {
    if (diff && diff >= 17) {
      clearInterval(timer.current)
      timer.current = 0
    } else {
      stopRaf.current = false
    }
    setState({ progress: undefined })
    execute('onEnd')
  }

  // 倒计时逻辑

  const running = useCallback(() => {
    const now = Date.now()
    const progress = countRef.current ? Math.max(countRef.current - now, 0) : 0
    let progressTemp = ''

    const { format: formatString, dateFormat } = formatTime(progress, format)
    progressTemp = formatString
    const allOptions = (dateFormat as unknown) as OptionsType

    setState({ progress: progressTemp, allOptions })
    execute('onStep', progressTemp)
    if (progress === 0) {
      stop()
    }
    return progress
  }, [])

  const start = () => {
    execute('onStart')
    // setState({ status: 'running' });

    if (diff && diff >= 17) {
      if (!timer.current) {
        timer.current = window.setInterval(() => {
          running()
        }, diff)
      }
    } else {
      const requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60)
        }

      setTimeout(() => {
        ;(function loop() {
          const progress = running()
          if (progress > 0 && stopRaf.current) {
            requestAnimFrame(loop)
          }
        })()
      }, 0)
    }
  }

  const setEndTime = useCallback((date: TDate) => {
    if (!onHand) return
    if (date) {
      countRef.current = date
      // 开始前立即设置下当前时间
      const { format: formatString, dateFormat } = formatTime(
        date - Date.now() - 1000,
        format,
      )
      setState({
        progress: formatString,
        allOptions: (dateFormat as unknown) as OptionsType,
      })
      if (diff && diff < 17) stopRaf.current = true
      start()
    } else {
      stop()
    }
  }, [])

  useEffect(() => {
    if (onHand) return
    if (!endTime && !total) {
      // 至少需要一个参数
      return
    }
    const now = Date.now() + 1000
    let endTimeTemp = 0
    if (!endTime) {
      endTimeTemp = now + (total || 0)
    } else {
      endTimeTemp = endTime + 1000
    }
    // 为防止结束时间比当前时间早，没有格式
    // 无论当前是否已结束，均执行一次流程
    setState({ endTime: endTimeTemp })
    countRef.current = endTimeTemp
    start()

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(timer.current)
    }
  }, [endTime])

  return [state.progress, state.allOptions, setEndTime] as const
}

export default useCountDown
