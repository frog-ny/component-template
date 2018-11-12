/* @exa/sample version 0.0.0 */
class Foo extends HTMLElement {

  static get observedAttributes() {
    return ['data-message'];
  }

  constructor(){
    super();
    this.message = 'default';
    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback(){
    //https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Using_the_lifecycle_callbacks
    // !note this callback may happen before the element's contents have been fully parsed.
    this.attachEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(name === 'data-message'){
      this.message = newValue;
    }
  }

  attachEventListeners(){
    this.addEventListener('click',this.handleClick,false);
  }

  disconnectedCallback(){
    this.detachEventListeners();
  }

  detachEventListeners(){
    this.removeEventListener('click',this.handleClick,false);
  }

  handleClick(e){
    console.log(this.message);
  }

}

customElements.define('exa-foo', Foo);

export default Foo