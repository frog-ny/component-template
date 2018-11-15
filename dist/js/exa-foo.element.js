/* @exa/sample version 0.0.0 */
class Foo extends HTMLElement {

  static get observedAttributes() {
    return ['value'];
  }

  constructor(){
    super();
    this.increment = this.increment.bind(this);
  }

  connectedCallback() {
    this.addEventListener('click', this.increment);
    if (!this.hasAttribute('value')){
      this.setAttribute('value', 0);
    }

    this.innerHTML = `
      <div class='counter-wrapper'>
        <button class='counter-button' tabindex='0' increment>Increment</button>
        <span class='counter-count'></span>
      </div>
    `;

    this.incrementBtn = this.querySelector('[increment]');
    this.displayVal = this.querySelector('span');
    this.displayVal.innerText = this.value;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.displayVal !== undefined){
      this.displayVal.innerText = this.value;
    }
  }

  disconnectedCallback(){
    this.removeEventListener('click', this.increment);
  }

  increment() {
    const step = +this.step || 1;
    const newValue = +this.value + step;

    this.value = +newValue;
  }

  get value() {
    return this.getAttribute('value');
  }

  get step() {
    return this.getAttribute('step');
  }

  set value(newValue) {
    this.setAttribute('value', newValue);
  }

  set step(newValue) {
    this.setAttribute('step', newValue);
  }
}

customElements.define('exa-foo', Foo);
