import { watchValue } from '~/assets/ts/watchValue'
import { isBreakpoint, BREAKPOINTS } from '~/assets/ts/breakpoints'

let defaultViewport = ''

const act = () => {
  watchValue.object(isBreakpoint, 'xxs', (oldValue, newValue) => {
    const viewport = document.querySelector('meta[name="viewport"]')

    if (!viewport) {
      return
    }

    viewport.setAttribute(
      'content',
      newValue ? `width=${BREAKPOINTS.xs}` : defaultViewport,
    )
  })
}

const init = () => {
  const viewport = document.querySelector('meta[name="viewport"]')

  if (!viewport) {
    return
  }

  defaultViewport = viewport.getAttribute('content')

  viewport.setAttribute(
    'content',
    isBreakpoint.xxs ? `width=${BREAKPOINTS.xs}` : defaultViewport,
  )

  act()
}

export const viewport = {
  act,
  init,
}
