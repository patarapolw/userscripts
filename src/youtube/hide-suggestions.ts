// ==UserScript==
// @name         Hide YouTube suggestions
// @namespace    https://www.youtube.com
// @version      0.1
// @description  Hide the annoying YouTube suggestions
// @author       polv
// @match        https://www.youtube.com/watch
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

async function main() {
  function doAction(
    selector: string,
    opts: {
      node?: HTMLElement
      action: (el: HTMLElement) => void
    }
  ) {
    const el: HTMLDivElement = (opts.node || document.body).querySelector(
      selector
    )
    if (el) {
      opts.action(el)
    }
  }

  const SEL = {
    selector: '#secondary',
    display: 'block',
    doHide() {
      return doAction(this.selector, {
        action: (el) => {
          if (el.style.display !== 'none') {
            this.display = el.style.display
            el.style.display = 'none'
          }
        }
      })
    },
    doToggle() {
      return doAction(this.selector, {
        action: (el) =>
          el.style.display === 'none'
            ? (el.style.display = this.display)
            : (el.style.display = 'none')
      })
    }
  }

  SEL.doHide()

  window.addEventListener('keypress', (ev) => {
    if (ev.key !== 's') {
      return
    }

    const target = ev.target as HTMLElement

    if (['INPUT', 'TEXTAREA'].includes(target.tagName.toLocaleUpperCase())) {
      return
    }

    if (target.hasAttribute('contenteditable')) {
      return
    }

    SEL.doToggle()
  })
}

main()
