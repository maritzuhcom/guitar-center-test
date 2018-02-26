import mainImage from '../../images/main.jpg';

export default class Ad extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});
    const style = document.createElement('style');

    const image = document.createElement('section');
    const img = document.createElement('img');
    img.src = mainImage;
    image.setAttribute('class', 'ad-image');
    image.appendChild(img);

    const description = document.createElement('section');
    const header = document.createElement('header');
    const adText = document.createElement('span');

    header.innerHTML = 'New Guitars';
    adText.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis laoreet elit non dignissim posuere. Donec ligula justo, sollicitudin quis ipsum sed, accumsan bibendum massa. Suspendisse varius mattis felis vitae malesuada.';

    description.setAttribute('class', 'ad-content');
    header.setAttribute('class', 'ad-header');
    adText.setAttribute('class', 'ad-text');

    description.appendChild(header);
    description.appendChild(adText);

    image.appendChild(description)

    style.textContent = Style;
    shadow.appendChild(style);
    shadow.appendChild(image);
  }

  static register(name) {
    customElements.define(name, Ad);
    const element = document.createElement(name);
    element.setAttribute('class', 'custom-ad')

    return element;
  }
}

const Style = `
  .ad-image {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: relative;
    border: 2px solid rgb(192,192,192);
    border-radius: 8px;
    overflow: hidden;
    padding: 1em;
    box-sizing: border-box;
  }

  img {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .ad-content {
    height: 100%;
    width: 17em;
    display: flex;
    flex-direction: column;
    background-color: rgb(165,165,165);
    border: 2px solid black;
    border-radius: 3px;
    z-index: 2;
  }

  .ad-header {
    color: white;
    width: 100%;
    text-align: center;
    font-size: 19px;
    border-bottom: 2px solid black;
    background-color: rgb(132, 132, 132);
  }

  .ad-text {
    font-weight: 400;
    padding: .4em;
    box-sizing: border-box;
  }
`;
