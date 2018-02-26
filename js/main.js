import '../styles/app.css';
import Header from './components/Header';
import AppBody from './components/AppBody';
import Footer from './components/Footer';


window.addEventListener('DOMContentLoaded', main, {
  once: true
});

function main() {
  const app = document.body;
  const headerIntance = Header.register('app-header');
  const appBodyInstance = AppBody.register('app-body')
  const footer = Footer.register('app-footer');
  document.body.appendChild(headerIntance);
  document.body.appendChild(appBodyInstance);
  document.body.appendChild(footer);
}
