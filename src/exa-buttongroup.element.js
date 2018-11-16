class ButtonGroupElement extends HTMLBaseElement {
  constructor() {
    super();
    this.buttons = [];
    this.multiselect = true;
  }

  /* Lifecycle, element appended to the DOM */
  connectedCallback() {
    super.setup();
  }

  childrenAvailableCallback() {
    this.buttons = [].slice.call(this.querySelectorAll('[type="checkbox"]'));
    // Checkboxes, multi selection
    if (!this.buttons.length) {
      this.buttons = [].slice.call(this.querySelectorAll('[type="radio"]'));
      this.multiselect = false;
    }
    this.buttons.forEach((button, index) => {
      if (button.parentNode.tagName.toLowerCase() !== 'label') {
        return;
      }
      if (button.getAttribute('checked') || button.parentNode.classList.contains('active')) {
        button.setAttribute('checked', '');
        button.parentNode.setAttribute('aria-pressed', 'true');
      } else {
        button.removeAttribute('checked');
        button.parentNode.setAttribute('aria-pressed', 'false');
      }
      if(this.multiselect) {
        button.setAttribute('tabindex', index);
      }
      // add click event
      button.addEventListener('click', (event) => {
        if(!this.multiselect) {
          event.target.parentNode.parentNode.clearAllRadios();
        }
        if (event.target.checked) {
          event.target.setAttribute('checked', '');
          event.target.parentNode.classList.add('active');
          event.target.parentNode.setAttribute('aria-pressed', 'true');
        } else {
          event.target.removeAttribute('checked');
          event.target.parentNode.classList.remove('active');
          event.target.parentNode.setAttribute('aria-pressed', 'false');
        }
      });
    });
    this.parsed = true;
  }

  disconnectedCallback() {
    this.buttons.forEach((button) => {
      button.removeEventListener('click', this);
    });
  }
  clearAllRadios() {
    const radios = [].slice.call(this.querySelectorAll('[type="radio"]'));
    radios.forEach((radio) => {
      radio.removeAttribute('checked');
      if (radio.parentNode.tagName.toLowerCase() === 'label') {
        radio.parentNode.classList.remove('active');
        radio.parentNode.setAttribute('aria-pressed', 'false');
      }
    });
  }
}
customElements.define('exa-button-group', ButtonGroupElement);
