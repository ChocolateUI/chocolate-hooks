import React, { useState, useEffect, useRef, useCallback } from 'react'

interface UseCountDownProps {
  total?: number
  endTime?: number
  format: string | ((progress: number) => string) // 展示的格式
  diff?: number // 循环的时间
  onStart?: () => void
  onStep?: (step: number) => void
  onEnd?: () => void
}

interface StateProps {
  endTime: number // 结束时间
  progress: number | string // 当前时间
  status: 'pending' | 'running' | 'suspend' | 'ended' // 状态
}

const useCountDown: React.FC<UseCountDownProps> = (props) => {
  const [counter, setCounter] = useState<StateProps>(() => ({
    status: 'pending',
    endTime: 0,
    progress: 0,
  }))

  const timer = useRef(0)
  const countRef = useRef<number>(0)

  const { diff, format, endTime, total } = props

  const formatTime = (
    timestamp: number,
    formation: string = 'dd hh:mm:ss.ii',
  ): string => {
    const dateFormat: any = {
      'd+': Math.floor(timestamp / 1000 / 60 / 60 / 24), // 天
      'h+': Math.floor((timestamp / 1000 / 60 / 60) % 24), // 时
      'm+': Math.floor((timestamp / 1000 / 60) % 60), // 分
      's+': Math.floor((timestamp / 1000) % 60), // 秒
      'i+': timestamp % 1000, // 毫秒
    }

    Object.keys(dateFormat).forEach((key) => {
      if (new RegExp(`(${key})`).test(formation)) {
        formation = formation.replace(RegExp.$1, () => {
          const regLen = RegExp.$1.length
          if (/i+/.test(RegExp.$1)) {
            return `${dateFormat[key]}000`.substr(0, regLen)
          }
          return regLen === 1
            ? dateFormat[key]
            : `00${dateFormat[key]}`.substr(`${dateFormat[key]}`.length)
        })
      }
    })
    return formation
  }

  // 触发 props 中传过来的回调
  const execute = useCallback(
    (fn: string, ...params: string[] | number[]) => {
      const func = (props as any)[fn]
      if (typeof func === 'function') {
        func(...params)
      }
    },
    [props],
  )

  const stop = useCallback(() => {
    // 停止倒计时
    clearInterval(timer.current)
    setCounter((pre) => ({ ...pre, status: 'ended' }))
    execute('onEnd')
  }, [execute])

  const start = useCallback(() => {
    execute('onStart')
    setCounter((pre) => ({
      ...pre,
      status: 'running',
    }))

    const running = () => {
      const now = Date.now()
      const progress = Math.max(countRef.current - now, 0)
      let currProgress = ''
      if (typeof format === 'string') {
        currProgress = formatTime(progress, format)
      } else if (typeof format === 'function') {
        currProgress = format.call(null, progress)
      }
      setCounter((pre) => ({
        ...pre,
        progress: currProgress,
      }))

      execute('onStep', currProgress)
      if (progress === 0) {
        stop()
      }
      return progress
    }

    if (diff && diff >= 17) {
      timer.current = window.setInterval(() => {
        running()
      }, diff)
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
          if (progress > 0) {
            requestAnimFrame(loop)
          }
        })()
      }, 0)
    }
  }, [diff, execute, format, stop])

  useEffect(() => {
    if (!endTime && !total) {
      // 至少需要一个参数
      console.error(`endTime and total need least one`)
    } else {
      const now = Date.now()
      let endPrams = 0
      if (!endTime) {
        endPrams = now + (total || 0)
      } else {
        endPrams = endTime
      }
      // 为防止结束时间比当前时间早，没有格式
      // 无论当前是否已结束，均执行一次流程
      setCounter((pre) => ({ ...pre, endTime: endPrams }))
      countRef.current = endPrams
      start()
    }
  }, [endTime, start, total])

  return <p>{counter.progress}</p>
}

useCountDown.defaultProps = {
  // disabled: false,
}

export default useCountDown
