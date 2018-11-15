class HTMLBaseElement extends HTMLElement {
  constructor(...args) {
    const self = super(...args)
    self.parsed = false // guard to make it easy to do certain stuff only once
    self.parentNodes = []
    return self
  }

  setup() {
    // collect the parentNodes
    let el = this;
    while (el.parentNode) {
      el = el.parentNode
      this.parentNodes.push(el)
    }
    if (document.readyState !== 'loading') {
      this.childrenAvailableCallback();
    } else {
      this.mutationObserver = new MutationObserver(() => {
        if ([this, ...this.parentNodes].some(el=> el.nextSibling) || document.readyState !== 'loading') {
          this.childrenAvailableCallback()
          this.mutationObserver.disconnect()
        }
      });

      this.mutationObserver.observe(this, {childList: true});
    }
  }
}
