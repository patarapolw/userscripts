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

;(function () {
  'use script'

  /**
   *
   * @param {HTMLElement} selector
   * @param {object} opts
   * @param {HTMLElement} [opts.node]
   * @param {(el: HTMLElement) => void} opts.action
   */
  function doAction(selector, opts) {
    const el = /** @type {HTMLDivElement} */ (
      (opts.node || document.body).querySelector(selector)
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

    const target = /** @type {HTMLElement} */ (ev.target)

    if (['INPUT', 'TEXTAREA'].includes(target.tagName.toLocaleUpperCase())) {
      return
    }

    if (target.hasAttribute('contenteditable')) {
      return
    }

    SEL.doToggle()
  })
})()
