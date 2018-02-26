import imageOne from '../../images/product1.jpg';
import imageTwo from '../../images/product2.jpg';
import imageThree from '../../images/product3.jpg';

import jsonData from '../../json/new-arrivals.json'

export default class TabContent extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    const style = document.createElement('style');

    this.tabs = [
      this.generateFirstTab(),
      this.generateSecondTab(),
      this.generateThirdTab()
    ]

    this.titleText = [
      'HEADLINER DEALS',
      'New Arrivals',
      'New Account'
    ]

    this.titles = [
      document.createElement('h1'),
      document.createElement('h1'),
      document.createElement('h1')
    ]

    this.titles.forEach((titleEL, i) => {
      titleEL.setAttribute('class', 'tabContentTitle')
      titleEL.innerHTML = this.titleText[i];
    })

    const tabContainer = document.createElement('section');
    tabContainer.setAttribute('class', 'tabContainer')

    style.textContent = Style;
    this.shadow.appendChild(style);
    this.shadow.appendChild(this.titles[0]);
    this.shadow.appendChild(this.tabs[0]);
    this.tabElement = this.tabs[0];
    this.titleElement = this.titles[0];

    window.addEventListener('hashchange', this.hashChangeHandler);
  }

  hashChangeHandler = (e) => {
    const newHash = e.newURL.split('#')[1];

    if(this.titles[newHash] !== undefined) {
      this.shadow.removeChild(this.titleElement);
      this.shadow.removeChild(this.tabElement);
      this.shadow.appendChild(this.titles[newHash]);
      this.shadow.appendChild(this.tabElement);
      this.titleElement = this.titles[newHash];
    }

    if (this.tabs[newHash] !== undefined) {
      this.shadow.removeChild(this.tabElement);
      this.shadow.appendChild(this.tabs[newHash]);
      this.tabElement = this.tabs[newHash];
    }
  }

  generateFirstTab = () => {
    const wrapper = document.createElement('section');
    wrapper.setAttribute('class', 'tabOne');

    const imageSources = [
      imageOne,
      imageTwo,
      imageThree
    ];

    const arr = [0, 1, 2];

    arr.forEach((num) => {
      const contentWrapper = document.createElement('section');
      contentWrapper.setAttribute('class', 'tabOneContent');

      const imageWrapper = document.createElement('div');
      const img = document.createElement('img');

      imageWrapper.setAttribute('class', 'imageWrapper');

      img.src = imageSources[num];

      const title = document.createElement('span');
      const oldPrice = document.createElement('span');
      const newPrice = document.createElement('span');

      title.innerHTML = 'The Name of this Instrument';
      oldPrice.innerHTML = 'Was: 500.00';
      newPrice.innerHTML = 'Now: 295.00';

      title.setAttribute('class', 'priceTitle');
      oldPrice.setAttribute('class', 'oldPrice');
      newPrice.setAttribute('class', 'newPrice');

      wrapper.appendChild(contentWrapper);
      contentWrapper.appendChild(imageWrapper);
      imageWrapper.appendChild(img)
      contentWrapper.appendChild(imageWrapper)
      contentWrapper.appendChild(title)
      contentWrapper.appendChild(oldPrice)
      contentWrapper.appendChild(newPrice)
    })

    return wrapper;
  }

  generateSecondTab = () => {
    const contentWrapper = document.createElement('section');
    contentWrapper.setAttribute('class', 'tabTwoContent');

    const data = jsonData.newArrivals[0];

    console.log(data);

    const card = document.createElement('section');
    // decided to use string HTML instead of declarative because this is really static
    card.innerHTML = `
      <section class="cardWrapper">
        <div>
          <img src="${data.image}">
        </div>
        <div>
          <span class="tabTwoTitle">${data.title}</span>
          <span class="tabTwoContent">${data.description}</span>
          <a href=${data.url}><span>Link to somewhere</span></a>
        </div>
      </section>
    `
    contentWrapper.appendChild(card);

    return contentWrapper;
  }

  generateThirdTab = () => {
    const textInputs = [
      'First Name:',
      'Last Name:',
      'Email Address:',
      'Password:'
    ]

    const contentWrapper = document.createElement('section');
    contentWrapper.setAttribute('class', 'tabThreeContent');

    // create all the similar ones
    textInputs.forEach((inputText) => {
      const inputWrapper = document.createElement('section');
      inputWrapper.setAttribute('class', 'inputWrapper');

      const span = document.createElement('span');
      const input = document.createElement('input');

      span.innerHTML = inputText;
      inputWrapper.appendChild(span);
      inputWrapper.appendChild(input);

      contentWrapper.appendChild(inputWrapper);
    })

    // create first one off
    const inputWrapper = document.createElement('section');
    inputWrapper.setAttribute('class', 'inputWrapper');
    const option = document.createElement('select');
    const optionText = document.createElement('span');

    optionText.innerHTML = 'Communication Method:';

    inputWrapper.appendChild(optionText);
    inputWrapper.appendChild(option);

    contentWrapper.appendChild(inputWrapper);

    //create second one off
    const doubleInputWrapper = document.createElement('section');
    doubleInputWrapper.setAttribute('class', 'inputWrapper');
    const doubleOptionText = document.createElement('span');
    doubleOptionText.innerHTML = 'Birthday:';

    const optionWrapper = document.createElement('div');
    const month = document.createElement('select');
    const day = document.createElement('select');

    optionWrapper.appendChild(month);
    optionWrapper.appendChild(day);

    doubleInputWrapper.appendChild(doubleOptionText);
    doubleInputWrapper.appendChild(optionWrapper);

    contentWrapper.appendChild(doubleInputWrapper);

    // create submit button
    const buttonWrapper = document.createElement('section');
    buttonWrapper.setAttribute('class', 'inputWrapper');
    const buttonPlaceholder = document.createElement('div');
    const button = document.createElement('button');
    button.innerHTML = 'Create Account';

    buttonWrapper.appendChild(buttonPlaceholder)
    buttonWrapper.appendChild(button);

    contentWrapper.appendChild(buttonWrapper);

    return contentWrapper;
  }

  static register(name) {
    customElements.define(name, TabContent);
    const element = document.createElement(name);
    element.setAttribute('class', 'custom-tabContent')

    return element;
  }
}

const Style = `
  .tabContentTitle {
    color: rgb(200, 200, 200);
    font-size: 19px;
  }

  .tabContainer: {
    height: 100%;
    width: 100%;
  }

  .imageWrapper {
    position: relative;
    border: 1px solid rgb(120, 120, 120);
    height: 9em;
    width: 9em;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  }

  .imageWrapper img{
    width: 100%;
  }

  .priceTitle {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    font-weight: bold;
    width: 10em;
    overflow-wrap: break-word;
  }

  .oldPrice {
    color: red;
    text-decoration: line-through;
    text-decoration-color: black;
  }

  .tabOne {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-content: ceneter;
  }

  .tabOneContent,
  .tabThreeContent,
  .tabTwoContent {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .inputWrapper {
    width: 100%;
    display: flex;
    margin-bottom: .5em;
    box-sizing: border-box;
  }

  .inputWrapper span {
    width: 50%;
    text-align: end;
    font-weight: 400;
  }

  .inputWrapper input,
  .inputWrapper select {
    width: 50%;
    margin-left: 1em;
  }

  .inputWrapper div select:first-child {
    margin: 0;
  }

  .inputWrapper div {
    display: flex;
    width: 50%;
    margin-left: .5em;
  }

  .cardWrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    padding: 1em;
    box-sizing: border-box;
    background: linear-gradient(rgb(255, 255, 255), rgb(220, 220, 220));
  }

  .tabTwoTitle {
    font-weight: bold;
    color: grey;
    width: 100%;
    display: flex;
    padding-left: 1em;
    box-sizing: border-box;
  }

  .tabTwoContent {
    width: 100%;
    display: flex;
    padding: 1em;
    box-sizing: border-box;
  }

  .cardWrapper a {
    padding: 1em;
  }

  .cardWrapper img {
    border: 1px solid black;
    box-sizing: border-box;
  }

  button {
    background: linear-gradient(rgb(255, 255, 255), rgb(150, 150, 150));
    font-size: 14px;
    width: 10em;
    height: 2em;
  }
`;
