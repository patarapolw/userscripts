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

  /** @type {HTMLDivElement} */
  let elSecondary
  /** @type {HTMLDivElement} */
  let elPanels
  /** @type {HTMLDivElement} */
  let elRelated

  /**
   *
   * @param {boolean} makeHidden
   */
  function doToggle(makeHidden) {
    elSecondary = document.querySelector('#secondary')
    if (!elSecondary) return

    elPanels = document.querySelector('#panels')
    elRelated = document.querySelector('#related')

    /**
     *
     * @param {HTMLDivElement} el
     */
    const toggleOn = (el) => {
      if (makeHidden) {
        el.style.display = 'block'
      }
      el.sytle.display = el.style.display === 'none' ? 'block' : 'none'
    }

    if (
      elPanels &&
      elRelated &&
      elPanels.querySelector(
        '[visibility="ENGAGEMENT_PANEL_VISIBILITY_EXPANDED"]'
      )
    ) {
      toggleOn(elRelated)
    } else {
      toggleOn(elSecondary)
    }
  }

  window.addEventListener('keypress', (ev) => {
    if (ev.key !== 's') return

    const target = /** @type {HTMLElement} */ (ev.target)

    if (['INPUT', 'TEXTAREA'].includes(target.tagName.toLocaleUpperCase())) {
      return
    }

    if (target.hasAttribute('contenteditable')) return

    doToggle()
  })

  const beginObserver = new MutationObserver(() => {
    elSecondary = document.querySelector('#secondary')
    if (!elSecondary) return

    doToggle(true)

    beginObserver.disconnect()

    new MutationObserver(() => {
      doToggle()
      doToggle()
    }).observe(document.querySelector('.ytp-size-button'), {
      childList: true,
      subtree: true
    })
  })

  beginObserver.observe(document.body, {
    childList: true,
    subtree: true
  })
})()
