class TooltipElement extends HTMLElement {
  /* Attributes to monitor */
  static get observedAttributes() { return ['type', 'label', 'tip', 'text', 'position']; }
  get type() { return this.getAttribute('type'); }
  set type(value) { return this.setAttribute('type', value); }
  get label() { return this.getAttribute('label'); }
  set label(value) { return this.setAttribute('label', value); }
  get tip() { return this.getAttribute('tip'); }
  set tip(value) { return this.setAttribute('tip', value); }
  get position() { return this.getAttribute('position'); }
  set position(value) { return this.setAttribute('position', value); }
  get text() { return this.getAttribute('text'); }
  set text(value) { return this.getAttribute('text', value); }

  constructor(){
    super();
    this.btnElement = null;
    this.spanElement = null;
  }

  /* Lifecycle, element appended to the DOM */
  connectedCallback() {
    if (!this.position || (this.position && ['top', 'bottom', 'left', 'right'].indexOf(this.position) === -1)) {
      this.position = 'top';
    }

    // create the html
    this.btnElement = document.createElement('button');
    this.spanElement = document.createElement('span');

    this.spanElement.setAttribute('role', 'status');

    // On click
    this.btnElement.addEventListener('click', this.showTip.bind(this));

    this.append(this.btnElement);
    this.append(this.spanElement);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'text':
        this.btnElement.innerHTML = this.text ? this.text : '';
        break;
      case 'label':
        this.btnElement.setAttribute('aria-label', this.label ? this.label : 'more info');
        break;
      default:
        break;
    }
  }

  /* Lifecycle, element removed from the DOM */
  disconnectedCallback() {
    this.querySelector('button').removeEventListener('click', this.showTip, true);
  }

  showTip() {
    const self = this;

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.btnElement !== e.target) {
        this.spanElement.innerHTML = '';
        self.removeEventListener('keydown', this);
      }
    });

    // Remove toggletip on ESC
    document.addEventListener('keydown', (e) => {
      if ((e.keyCode || e.which) === KEYCODE.ESC) {
        this.spanElement.innerHTML = '';
        self.removeEventListener('keydown', this);
      }
    });

    this.spanElement.innerHTML = '';
    this.spanElement.innerHTML = `<span class="toggletip-bubble ${this.position}">${this.tip}</span>`;
  }
}

customElements.define('exa-tooltip', TooltipElement);
