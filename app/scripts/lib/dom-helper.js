/**
 * Dom Helpers - get rid of jQuery.
 */


 ////////////////////////////        Helpers       ////////////////////////////


/**
 * Get HTMLElementSets
 * @param selector
 * @returns {NodeList}
 */
export function query(selector) {
	const that = this instanceof HTMLElement ? this : document
	return that.querySelectorAll(selector)
}

/**
 * Generate DOM element from HTML string
 * @param {String} html
 * @returns {HTMLElement}
 */
export function parseHTML(html) {
	const wrapper = document.createElement('div')
	wrapper.innerHTML = html
	return wrapper.childNodes[0]
}


////////////////////////////      DOM Methods      ////////////////////////////


export function prepend(element) {
  this.insertBefore(element, this.firstChild)
  return this
}

/**
 * Attach an event handler function for one or more events to elements.
 *
 * @param {String} events
 * @param {String} [selector]
 * @param {Function} handler
 * @description
 * HTMLElementsList::on( events [, selector ] handler )
 */
export function on(events, selector, handler) {
}

/**
 * Get or set attributes of element
 * @param {String} name
 * @param {String} [value]
 */
export function attr(name, value) {
}

/**
 * Add class name to elements
 * @param value
 */
export function addClass(value) {
}
