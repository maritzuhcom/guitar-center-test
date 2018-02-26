export default class Tabs extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');

    const buttonWrapper = document.createElement('section');
    buttonWrapper.setAttribute('class', 'tabButtonWrapper');

    this.buttons = [
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div')
    ];

    const labels = [
      'On Sale',
      'New Arrivals',
      'Sign Up'
    ]

    this.buttons.forEach((button, i) => {
      button.setAttribute('class', 'tabButton');

      const text = document.createElement('span');
      text.innerHTML = labels[i];
      button.appendChild(text);
      button.dataset.hash = i;
      button.addEventListener('click', this.clickHandler)

      buttonWrapper.appendChild(button);
    });

    style.textContent = Style;
    shadow.appendChild(style);

    shadow.appendChild(buttonWrapper);
    this.active = this.buttons[0];
    window.addEventListener('hashchange', this.hashChangeHandler);
  }

  hashChangeHandler = (e) => {
    const newHash = e.newURL.split('#')[1];
    this.buttons[newHash].click();
  }

  clickHandler = (e) => {
    if (this.active) {
      this.active.classList.remove('active');
    }
    window.location.hash = e.target.dataset.hash;
    e.target.classList.add('active')
    this.active = e.target;
  }

  connectedCallback() {
    this.active.click();
  }

  static register(name) {
    customElements.define(name, Tabs);
    const element = document.createElement(name)
    element.setAttribute('class', 'custom-tabs');

    return element;
  }
}

const Style = `
  .tabButtonWrapper {
    display: flex
  }

  .tabButton {
    height: 4em;
    width: 12em;
    background: linear-gradient(rgb(255, 255, 255), rgb(150, 150, 150));
    border: 1px solid rgb(120, 120, 120);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tabButton.active {
    background: rgb(255, 255, 255);
    position: relative;
    border-bottom: 0;
  }

  .tabButton.active::after {
    content: " ";
    height: 1em;
    width: 100%;
    background-color: white;
    top: 100%;
    position: absolute;
  }

  .tabButton span {
    font-weight: 400;
    font-size: 17px;
    pointer-events: none;
  }

  div.tabButton:first-child {
    border-right: 0;
  }

  div.tabButton:last-child {
    border-left: 0;
  }
`;
