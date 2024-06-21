const changeTab = (
  buttons: NodeListOf<HTMLAnchorElement>,
  contents: NodeListOf<HTMLElement>,
  targetNumber: number,
): void => {
  for (let i = 0, iLength = buttons.length; i < iLength; i = i + 1) {
    const button = buttons[i]
    const isSelected = i === targetNumber

    button.setAttribute('aria-selected', String(isSelected))
    button.setAttribute('tabindex', isSelected ? '0' : '-1')
  }

  for (let i = 0, iLength = contents.length; i < iLength; i = i + 1) {
    const content = contents[i]

    if (i !== targetNumber) {
      content.setAttribute('hidden', 'until-found')
      content.removeAttribute('tabindex')

      continue
    }

    content.removeAttribute('hidden')
    content.setAttribute('tabindex', '0')
  }
}

const init = () => {
  $(document)
    .off('click.tab')
    .on('click.tab', '.JsTab__button', function () {
      const self = this as HTMLAnchorElement
      const wrapper: HTMLElement = self.closest('.JsTab')
      const buttons: NodeListOf<HTMLAnchorElement> =
        wrapper.querySelectorAll('.JsTab__button')
      const contents: NodeListOf<HTMLElement> =
        wrapper.querySelectorAll('.JsTab__contents')

      changeTab(buttons, contents, $(buttons).index($(this)))

      return false
    })

  const wrappers = document.querySelectorAll('.JsTab')

  for (let i = 0, iLength = wrappers.length; i < iLength; i = i + 1) {
    const wrapper = wrappers[i] as HTMLElement
    const buttons: NodeListOf<HTMLAnchorElement> =
      wrapper.querySelectorAll('.JsTab__button')
    const contents: NodeListOf<HTMLElement> =
      wrapper.querySelectorAll('.JsTab__contents')

    for (let j = 0, jLength = buttons.length; j < jLength; j = j + 1) {
      const button = buttons[j]

      button.setAttribute('aria-selected', 'false')
      button.setAttribute('aria-controls', contents[j].id)
      button.setAttribute('tabindex', '-1')
    }

    changeTab(buttons, contents, 0)
  }
}

export const tab = {
  init,
}
