import { SCROLLING } from '~/assets/ts/className'

// スクロールが止まった時の処理
const scrollStop = (scrollSpeed: number) => {
  setTimeout(function () {
    $('body').removeClass(SCROLLING)
  }, scrollSpeed)
}

const act = (target: string, speed?: number) => {
  const targetElm = target === '#' ? $('body') : $(target)
  const scrollSpeed = speed ?? 300

  if (!targetElm) {
    return
  }

  const pos = targetElm.offset().top
  const header = $('.JsHeader')
  const headerHeight = header ? header.outerHeight(true) : 0

  const scrollPos = pos - 24 - headerHeight

  $('body').addClass(SCROLLING)

  setTimeout(() => {
    $('html, body').animate(
      {
        scrollTop: scrollPos,
      },
      scrollSpeed,
    )

    scrollStop(scrollSpeed)
  }, 10)
}

const init = () => {
  $(document)
    .off('click.smoothScroll')
    .on(
      'click.smoothScroll',
      'a[href^="#"]:not(.JsNotSmoothScroll)',
      function () {
        const self = $(this)

        act(self.attr('href'))

        return false
      },
    )
}

export const smoothScroll = {
  init,
  act,
  scrollStop,
}
