import Accordion from './Accordion';
import Ad from './Ad';
import Tabs from './Tabs';
import TabContent from './TabContent';
import './appBody.css';

export default class AppBody extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});

    const style = document.createElement('style');

    style.textContent = Style;

    const leftSide = document.createElement('section');
    const rightSide = document.createElement('section');

    leftSide.setAttribute('class', 'leftSide');
    rightSide.setAttribute('class', 'rightSide');

    const accordionInstance = Accordion.register('right-accordion');
    const adInstance = Ad.register('left-ad');
    const tabIntance = Tabs.register('bottom-tabs');
    const tabContentInstance = TabContent.register('bottom-tab-content');

    leftSide.appendChild(adInstance);
    leftSide.appendChild(tabIntance);
    leftSide.appendChild(tabContentInstance);
    rightSide.appendChild(accordionInstance);

    shadow.appendChild(style);
    shadow.appendChild(leftSide);
    shadow.appendChild(rightSide);

  }

  static register(name) {
    customElements.define(name, AppBody);
    const element = document.createElement(name);
    element.setAttribute('class', 'custom-app-body')

    return element;
  }
}

const Style = `
  .rightSide {
    width: 20%;
    height: 100%;
    background-color: rgb(208,208,208);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 1em;
  }

  .leftSide {
    width: 80%;
    height 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-right: 1em;
  }

  .custom-accordion {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .custom-ad {
    width: 100%;
    height: 40%;
    position: realtive;
  }

  .custom-tabs {
    width: 100%;
    height: 7.5em;
    position: realtive;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    margin-top: 1em;
  }

  .custom-tabContent {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 1em;
    border: 1px solid rgb(120, 120, 120);
    box-sizing: border-box;
  }
`;
