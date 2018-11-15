class CollapseElement extends HTMLBaseElement {

  static get observedAttributes() {
    return ['state'];
  }

  get state() { return this.getAttribute('state'); }
  set state(value) { return this.setAttribute('state', value); }

  constructor(){
    super();
    // this.eventListenerAdded = false;
    this.linked = [];
  }

  connectedCallback() {
    super.setup();
  }

  childrenAvailableCallback() {
    this.linked = [].slice.call(document.querySelectorAll(`[href="#${this.id}"],[data-target="#${this.id}"]`));
    this.linked.forEach((element) => {
      element.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        document.getElementById(this.id).toggle();
      });
    });

    this.parsed = true;
  }

  disconnectedCallback() {
    this.linked.forEach((element) => {
      element.removeEventListener('click', this);
    });
  }

  toggle() {
    if (this.state === 'closed') {
      this.state = 'open';
    } else {
      this.state = 'closed';
    }
    this.linked.forEach((element) => {
      element.setAttribute('aria-expanded', this.state === 'open');
    });
  }
}

customElements.define('exa-collapse', CollapseElement);
