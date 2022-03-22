// ==UserScript==
// @name         Hide YouTube suggestions
// @namespace    https://www.youtube.com
// @version      0.1
// @description  Hide the annoying YouTube suggestions
// @author       polv
// @match        https://www.youtube.com/watch?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

;(function () {
  'use script'

  window.addEventListener('keypress', (ev) => {
    if (ev.key !== 's') return

    const el = document.querySelector('#secondary')
    if (!el) return

    const target = /** @type {HTMLElement} */ (ev.target)

    if (['INPUT', 'TEXTAREA'].includes(target.tagName.toLocaleUpperCase()))
      return

    if (target.hasAttribute('contenteditable')) return

    el.style.display = el.style.display === 'none' ? 'block' : 'none'
  })

  const beginObserver = new MutationObserver(() => {
    const el = document.querySelector('#secondary')
    if (!el) return

    el.style.display = 'none'
    beginObserver.disconnect()
  })

  beginObserver.observe(document.body, {
    childList: true,
    subtree: true
  })
})()
