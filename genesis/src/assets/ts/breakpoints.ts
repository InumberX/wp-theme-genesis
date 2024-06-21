export const BREAKPOINTS = {
  xs: 360,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
} as const

export const isBreakpoint = {
  xxs: false,
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
  xxl: false,
}

const setCurrentBreakPoint = (target: string) => {
  Object.keys(isBreakpoint).forEach((key) => {
    if (key === target) {
      isBreakpoint[key] = true
    } else {
      isBreakpoint[key] = false
    }
  })
}

const checkBreakPointXxs = (e: MediaQueryList | MediaQueryListEvent) => {
  if (e.matches) {
    breakpoints.setCurrentBreakPoint('xxs')
  }
}

const checkBreakPointXs = (e: MediaQueryList | MediaQueryListEvent) => {
  if (e.matches) {
    breakpoints.setCurrentBreakPoint('xs')
  }
}

const checkBreakPointSm = (e: MediaQueryList | MediaQueryListEvent) => {
  if (e.matches) {
    breakpoints.setCurrentBreakPoint('sm')
  }
}

const checkBreakPointMd = (e: MediaQueryList | MediaQueryListEvent) => {
  if (e.matches) {
    breakpoints.setCurrentBreakPoint('md')
  }
}

const checkBreakPointLg = (e: MediaQueryList | MediaQueryListEvent) => {
  if (e.matches) {
    breakpoints.setCurrentBreakPoint('lg')
  }
}

const checkBreakPointXl = (e: MediaQueryList | MediaQueryListEvent) => {
  if (e.matches) {
    breakpoints.setCurrentBreakPoint('xl')
  }
}

const checkBreakPointXxl = (e: MediaQueryList | MediaQueryListEvent) => {
  if (e.matches) {
    breakpoints.setCurrentBreakPoint('xxl')
  }
}

const init = () => {
  // ブレイクポイント判定
  const matchMediaXxs = window.matchMedia(
    `screen and (max-width: ${BREAKPOINTS.xs - 1}px)`,
  )
  const matchMediaXs = window.matchMedia(
    `screen and (min-width: ${BREAKPOINTS.xs}px) and (max-width: ${BREAKPOINTS.sm - 1}px)`,
  )
  const matchMediaSm = window.matchMedia(
    `screen and (min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.md - 1}px)`,
  )
  const matchMediaMd = window.matchMedia(
    `screen and (min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.xl - 1}px)`,
  )
  const matchMediaLg = window.matchMedia(
    `screen and (min-width: ${BREAKPOINTS.lg}px) and (max-width: ${BREAKPOINTS.xl - 1}px)`,
  )
  const matchMediaXl = window.matchMedia(
    `screen and (min-width: ${BREAKPOINTS.xl}px) and (max-width: ${BREAKPOINTS.xxl - 1}px)`,
  )
  const matchMediaXxl = window.matchMedia(
    `screen and (min-width: ${BREAKPOINTS.xxl}px)`,
  )

  // ブレイクポイントの瞬間に発火
  matchMediaXxs.addEventListener('change', breakpoints.checkBreakPointXxs)
  matchMediaXs.addEventListener('change', breakpoints.checkBreakPointXs)
  matchMediaSm.addEventListener('change', breakpoints.checkBreakPointSm)
  matchMediaMd.addEventListener('change', breakpoints.checkBreakPointMd)
  matchMediaLg.addEventListener('change', breakpoints.checkBreakPointLg)
  matchMediaXl.addEventListener('change', breakpoints.checkBreakPointXl)
  matchMediaXxl.addEventListener('change', breakpoints.checkBreakPointXxl)

  // 初回チェック
  breakpoints.checkBreakPointXxs(matchMediaXxs)
  breakpoints.checkBreakPointXs(matchMediaXs)
  breakpoints.checkBreakPointSm(matchMediaSm)
  breakpoints.checkBreakPointMd(matchMediaMd)
  breakpoints.checkBreakPointLg(matchMediaLg)
  breakpoints.checkBreakPointXl(matchMediaXl)
  breakpoints.checkBreakPointXxl(matchMediaXxl)
}

export const breakpoints = {
  setCurrentBreakPoint,
  checkBreakPointXxs,
  checkBreakPointXs,
  checkBreakPointSm,
  checkBreakPointMd,
  checkBreakPointLg,
  checkBreakPointXl,
  checkBreakPointXxl,
  init,
}
