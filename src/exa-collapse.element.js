class Collapse extends HTMLElement {

  static get observedAttributes() {
    return ['id', 'state'];
  }

  get id() { return this.getAttribute('id'); }
  set id(value) { return this.setAttribute('id', value); }
  get state() { return this.getAttribute('state'); }
  set state(value) { return this.setAttribute('state', value); }

  constructor(){
    super();
    this.eventListenerAdded = false;
    this.linked = [];
  }

  connectedCallback() {
  }

  disconnectedCallback() {
    this.linked.forEach((element) => {
      element.removeEventListener('click', this);
    });
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case 'id':
        if(this.eventListenerAdded) {
          return;
        }
        this.linked = [].slice.call(document.querySelectorAll(`[href="#${this.id}"],[data-target="#${this.id}"]`));
        this.linked.forEach((element) => {
          element.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            document.getElementById(this.id).toggle();
          });
        });
        this.eventListenerAdded = true;
        break;
      default:
        break;
    }
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

customElements.define('exa-collapse', Collapse);
