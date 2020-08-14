import {vlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/vl-ui-link/dist/vl-link.js';
import '/node_modules/vl-ui-icon/dist/vl-icon.js';

/**
 * VlFunctionalHeader
 * @class
 * @classdesc Toont bovenaan de pagina generieke informatie zonder af te leiden zoals bijvoorgeeld titel, acties, tab navigatie of zoek input.
 *
 * @property {String} data-vl-back - Attribuut wordt gebruikt om de terug link tekst te bepalen.
 * @property {String} data-vl-link - Attribuut wordt gebruikt om de link van de titel te bepalen.
 * @property {String} data-vl-title - Attribuut wordt gebruikt om de tekst van de titel te bepalen.
 * @property {String} data-vl-sub-title - Attribuut wordt gebruikt om de tekst van de sub titel te bepalen.
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-functional-header/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-functional-header/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-functional-header.html|Demo}
 *
 */
export class VlFunctionalHeader extends vlElement(HTMLElement) {
  static get _observedAttributes() {
    return ['back', 'title', 'sub-title', 'link'];
  }

  constructor() {
    super(`
      <style>
        @import '/node_modules/vl-ui-functional-header/dist/style.css';
        @import '/node_modules/vl-ui-link/dist/style.css';
        @import '/node_modules/vl-ui-icon/dist/style.css';
      </style>
      <header class="vl-functional-header" role="banner">
        <div class="vl-layout">
          <div class="vl-functional-header__row">
            <div class="vl-functional-header__content">
              <h1 class="vl-title">
                <a id="title" class="vl-functional-header__title" tabindex="0">
                  <slot name="title"></slot>
                </a>
              </h1>
            </div>
            <div id="actions" class="vl-functional-header__actions">
              <ul></ul>
            </div>
          </div>
          <div class="vl-functional-header__sub">
            <ul class="vl-functional-header__sub__actions">
              <li class="vl-functional-header__sub__action">
                <a id="back-link" is="vl-link" tabindex="0">
                  <span is="vl-icon" data-vl-icon="arrow-left-fat" data-vl-before></span>
                  <slot id="back-link-text" name="back">
                    <span>Terug</span>
                  </slot>
                </a>
              </li>
              <li id="sub-title" class="vl-functional-header__sub__action">
                <slot name="sub-title"></slot>
              </li>
            </ul>
          </div>
        </div>
      </header>
    `);
  }

  connectedCallback() {
    this._registerBackLink();
    this._observer = this.__observeSlotElements(() => this.__processSlotElements());
    this.__processSlotElements();
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  get _titleElement() {
    return this._shadow.querySelector('#title');
  }

  get _subTitleElement() {
    return this._shadow.querySelector('#sub-title');
  }

  get _backLinkElement() {
    return this._shadow.querySelector('#back-link');
  }

  get _backLinkTextElement() {
    return this._backLinkElement.querySelector('#back-link-text');
  }

  get _actionsElement() {
    return this._shadow.querySelector('#actions');
  }

  get _actionsListElement() {
    return this._actionsElement.querySelector('ul');
  }

  _getActionTemplate(element) {
    return this._template(`
      <li class="vl-functional-header__action">
        <p>
          ${element.outerHTML}
        </p>
      </li>
    `);
  }

  _titleChangedCallback(oldValue, newValue) {
    this._titleElement.innerText = newValue;
  }

  _subTitleChangedCallback(oldValue, newValue) {
    this._subTitleElement.innerText = newValue;
  }

  _linkChangedCallback(oldValeu, newValue) {
    this._titleElement.href = newValue;
  }

  _backChangedCallback(oldValue, newValue) {
    this._backLinkTextElement.innerText = newValue;
  }

  _registerBackLink() {
    this.backLinkEventListener = () => window.history.back();
  }

  /**
   * Zet de click event listener voor de 'Terug' knop. Default: ```() => window.history.back()```
   *
   * @param {Function} eventListener - Functie met de uit te voeren handeling als op de terug knop wordt geklikt.
   */
  set backLinkEventListener(eventListener) {
    if (this._backLinkEventListener) {
      this._backLinkElement.removeEventListener('click', this._backLinkEventListener);
    }
    this._backLinkEventListener = eventListener;
    this._backLinkElement.addEventListener('click', this._backLinkEventListener);
  }

  __processSlotElements() {
    this.__processSlotActions();
  }

  __processSlotActions() {
    this._actionsListElement.innerHTML = '';
    const actions = this.querySelector('[slot="actions"]');
    if (actions) {
      [...actions.children].map((action) => this._getActionTemplate(action)).forEach((action) => this._actionsListElement.append(action));
    } else {
      this._actionsElement.hidden = true;
    }
  }

  __observeSlotElements(callback) {
    const observer = new MutationObserver(callback);
    observer.observe(this, {attributes: true, childList: true, characterData: true, subtree: true});
    return observer;
  }
}

define('vl-functional-header', VlFunctionalHeader);
