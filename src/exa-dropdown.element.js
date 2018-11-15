class DropdownElement extends HTMLBaseElement {
  static get observedAttributes() { return ['mode']; }

  get mode() { return this.getAttribute('mode'); }
  set mode(value) { return this.setAttribute('mode', value); }

  constructor() {
    super();
  }

  /* Lifecycle, element appended to the DOM */
  connectedCallback() {
    super.setup();
  }

  childrenAvailableCallback() {
    const trigger = this.firstElementChild;

    // Set the trigger mode
    this.mode = this.mode === 'hover' ? 'mouseover' : 'click';

    // Set the accessibility attributes
    trigger.setAttribute('aria-haspopup', true);
    trigger.setAttribute('aria-expanded', false);

    trigger.addEventListener(this.mode, () => {
      if (this.hasAttribute('expanded')) {
        // Remove the "expanded" attribute to hide the dropdown
        this.removeAttribute('expanded');
        trigger.setAttribute('aria-expanded', false);

        this.dispatchCustomEvent('exa.dropdown.hide');
      } else {
        // Set the "expanded" attribute to show the dropdown
        this.setAttribute('expanded', '');
        trigger.setAttribute('aria-expanded', true);

        // Dispatch the "exa.dropdown.show" event
        this.dispatchCustomEvent('exa.dropdown.show');
      }

      // Hide the dropdown
      document.addEventListener(this.mode, (event) => {
        if (event.target !== trigger && !this.findAncestor(event.target, 'exa-dropdown')) {
          this.close();
        }
      });
    });
  }

  /* Lifecycle, element removed from the DOM */
  disconnectedCallback() {
    this.removeEventListener('exa.dropdown.show', this.close, true);
    this.removeEventListener('exa.dropdown.hide', this.close, true);
    this.removeEventListener('mouseover', this.close, true);
    this.removeEventListener('click', this.close, true);
  }

  /* Method to close the dropdown */
  close() {
    this.removeAttribute('expanded');
    this.firstElementChild.setAttribute('aria-expanded', false);
    // Remove the event listener
    this.dispatchCustomEvent('exa.dropdown.hide');
  }

  /* Method to dispatch events. Internal */
  dispatchCustomEvent(eventName) {
    const OriginalCustomEvent = new CustomEvent(eventName, { bubbles: true, cancelable: true });
    OriginalCustomEvent.relatedTarget = this;
    this.dispatchEvent(OriginalCustomEvent);
    this.removeEventListener(eventName, this);
  }

  /* eslint-disable */
  findAncestor(el, tagName) {
    while ((el = el.parentElement) && el.nodeName.toLowerCase() !== tagName);
    return el;
  }
  /* eslint-enable */
}

customElements.define('exa-dropdown', DropdownElement);
