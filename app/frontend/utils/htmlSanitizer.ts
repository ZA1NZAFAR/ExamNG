/**
 * Convert string to HTML element
 * @param {string} str - HTML string
 * @returns {HTMLElement} - HTML element
 * @private
 */
function stringToHTML(str: string): HTMLElement {
	const parser = new DOMParser();
	const doc = parser.parseFromString(str, 'text/html');
	return doc.body || document.createElement('body');
}

/**
 * Remove scripts from HTML element
 * @param {HTMLElement} html - HTML element
 * @returns {void}
 * @private
 */
function removeScripts(html: HTMLElement): void {
	const scripts = html.querySelectorAll('script');
	scripts.forEach((script) => script.remove());
}

/**
 * Check if attribute is dangerous
 * @param {string} name - Attribute name
 * @param {string} value - Attribute value
 * @returns {boolean} - True if attribute is dangerous
 * @private
 */
function isDangerous(name: string, value: string): boolean {
	const dangerousAttributes = ['src', 'href', 'xlink:href'];
	const dangerousProtocols = ['javascript:', 'data:', 'vbscript:'];
	const normalizedValue = value.replace(/\s+/g, '').toLowerCase().trim();
	if (dangerousAttributes.includes(name)) {
		for (const protocol of dangerousProtocols) {
			if (normalizedValue.includes(protocol)) {
				return true;
			}
		}
	}
	if (name.startsWith('on')) {
		return true;
	}
	return false;
}

/**
 * Remove attributes from HTML element
 * @param {Element} html - HTML element
 * @returns {void}
 * @private
 */
function removeAttributes(html: Element): void {
	const attributes = html.attributes;
	for (const attribute of attributes) {
		if (isDangerous(attribute.name, attribute.value)) {
			html.removeAttribute(attribute.name);
		}
	}
}

/**
 * Clean node from attributes
 * @param {Element} node - Node to clean
 * @returns {void}
 * @private
 */

function cleanNode(node: Element): void {
	const nodes = node.children;
	for (const node of nodes) {
		removeAttributes(node);
		cleanNode(node);
	}
}

/**
 * Sanitize HTML string
 * @param {string} str - HTML string
 * @returns {string} - Sanitized HTML string
 */
function HTMLSanitize(str: string): string {
	const html = stringToHTML(str);
	removeScripts(html);
	cleanNode(html);
	return html.innerHTML;
}

export default HTMLSanitize;
