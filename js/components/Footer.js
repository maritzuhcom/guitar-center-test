import './footer.css';

export default class Footer extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});

    const text = document.createElement('span');
    text.innerHTML = 'Copyright Guitar © Center, Inc.'
    shadow.appendChild(text);
  }

  static register(name) {
    customElements.define(name, Footer);
    const element = document.createElement(name);
    element.setAttribute('class', 'custom-footer')

    return element;
  }
}
