export default class Accordion extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});

    const style = document.createElement('style');

    style.textContent = Style;

    this.links = [
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div')
    ]

    shadow.appendChild(style);

    this.links.forEach((link, i) => {
      link.setAttribute('class', 'link');
      const linkText = document.createElement('span');
      linkText.innerHTML = `Link ${i + 1}`;
      link.appendChild(linkText);
      link.addEventListener('click', () => {
        link.classList.add('linkOpen');
        const subLink = document.createElement('div');
        subLink.setAttribute('class', 'subLink');
        subLink.innerHTML = `
          <span>sub-link</span>
          <span>sub-link</span>
          <span>sub-link</span>
        `;
        link.appendChild(subLink);
      }, {once: true});
      shadow.appendChild(link);
    })
  }

  static register(name) {
    customElements.define(name, Accordion);
    const element = document.createElement(name);
    element.setAttribute('class', 'custom-accordion')

    return element;
  }
}

const Style = `
  .link {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: white;
    margin-bottom: 2px;
    padding: .5em;
    box-sizing: border-box;
    font-weight: 400;
  }

  .link span{
    width: 100%;
  }

  .link .subLink {
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: 13px;
    margin: .5em 0 0 3em;
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;
  }

  .link.linkOpen {
    background-color: rgb(140, 140, 140);
    color: rgb(255, 255, 255);
  }
`;
