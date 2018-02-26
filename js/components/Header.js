import './header.css';

export default class Header extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});

    this.wrapper = document.createElement('main');
    this.wrapper.setAttribute('class', 'custom-header-wrapper');

    const style = document.createElement('style');

    this.subMenu = null;

    style.textContent = Style;

    // create the menu icons
    const menuItems = [
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div')
    ]

    // add class for style
    menuItems.forEach(item => {
      item.setAttribute('class', 'menuItem');
    });

    // add the title text
    menuItems[0].innerHTML= "Guitars";
    menuItems[1].innerHTML= "Bass";
    menuItems[2].innerHTML= "Drums";
    menuItems[3].innerHTML= "Keyboards";
    menuItems[4].innerHTML= "DJ & Lighting";
    menuItems[5].innerHTML= "Used Gear";
    menuItems[6].innerHTML= "Clearance";

    // add style
    shadow.appendChild(style);

    // add items to shadow root of element
    menuItems.forEach(item => {
      this.wrapper.appendChild(item);
    });

    shadow.appendChild(this.wrapper);

    const guitar = menuItems[0];

    guitar.addEventListener('mouseover', this.openSubMenu);
  }

  closeSubMenu = () => {
    this.wrapper.removeChild(this.menu);
    this.menu = null;
  }

  openSubMenu = () => {
    if(this.menu instanceof HTMLElement) {
      return;
    }

    const menu = document.createElement('section');
    const electric = document.createElement('span');
    const acousticGuitars = document.createElement('span');
    const acousticElectric = document.createElement('span');
    const classical = document.createElement('span');

    electric.innerHTML = "Electric Guitars"
    acousticGuitars.innerHTML = "Acoustic Guitars"
    acousticElectric.innerHTML = "Acoustic-Electric Guitars"
    classical.innerHTML = "Classical Guitars"

    menu.appendChild(electric);
    menu.appendChild(acousticGuitars);
    menu.appendChild(acousticElectric);
    menu.appendChild(classical);

    menu.setAttribute('class', 'subMenu')

    this.wrapper.appendChild(menu)
    this.menu = menu
    this.menu.addEventListener('mouseleave', this.closeSubMenu);
  }

  static register(name) {
    customElements.define(name, Header);
    const element = document.createElement(name);
    element.setAttribute('class', 'custom-header')

    return element;
  }
}

const Style = `
  .custom-header-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 3em;
    background-color: rgb(208,208,208);
    color: white;
    border: 1px solid black;
  }

  .menuItem {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 300ms;
    cursor: pointer;
  }

  .menuItem:hover {
    background-color: rgb(144,144,144);

  }

  .subMenu {
    position: absolute;
    top: 119%;
    left: 0;
    height: 10em;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 1em;
    background-color: rgb(144,144,144);
    justify-content: space-evenly;
    z-index: 3;
  }

  .subMenu span {
    cursor: pointer;
  }
`
