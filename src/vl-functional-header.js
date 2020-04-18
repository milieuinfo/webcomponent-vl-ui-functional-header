import { VlElement, define } from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/vl-ui-link/dist/vl-link.js';
import '/node_modules/vl-ui-icon/dist/vl-icon.js';

/**
 * VlFunctionalHeader
 * @class
 * @classdesc Toont bovenaan de pagina generieke informatie zonder af te leiden zoals bijvoorgeeld titel, acties, tab navigatie of zoek input.
 * 
 * @property {boolean} data-vl-link - Attribuut wordt gebruikt om de link van de titel te bepalen.
 * @property {boolean} data-vl-title - Attribuut wordt gebruikt om de tekst van de titel te bepalen.
 * @property {boolean} data-vl-sub-title - Attribuut wordt gebruikt om de tekst van de sub titel te bepalen.
 * 
 * @extends VlElement
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-functional-header/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-ui-functional-header/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-functional-header.html|Demo}
 * 
 */
export class VlFunctionalHeader extends VlElement(HTMLElement) {
    static get _observedAttributes() {
        return ['title', 'sub-title', 'link'];
    }

    constructor() {
        super(`
            <style>
                @import '/src/style.css';
                @import '/node_modules/vl-ui-link/dist/style.css';
                @import '/node_modules/vl-ui-icon/dist/style.css';
            </style>
            <header class="vl-functional-header" role="banner">
                <div class="vl-layout">
                    <div class="vl-functional-header__row">
                        <div class="vl-functional-header__content">
                            <h1 class="vl-title">
                                <a id="title" class="vl-functional-header__title">
                                    <slot name="title"></slot>
                                </a>
                            </h1>
                        </div>
                    </div>
                    <div class="vl-functional-header__sub">
                        <ul class="vl-functional-header__sub__actions">
                            <li class="vl-functional-header__sub__action">
                                <a id="back-link" is="vl-link">
                                    <span is="vl-icon" data-vl-icon="arrow-left-fat" data-vl-before></span>
                                    <span>Terug</span>
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

    _titleChangedCallback(oldValue, newValue) {
        this._titleElement.innerText = newValue;
    }

    _sub_titleChangedCallback(oldValue, newValue) {
        this._subTitleElement.innerText = newValue;
    }

    _linkChangedCallback(oldValeu, newValue) {
        this._titleElement.href = newValue;
    }

    _registerBackLink() {
        this._backLinkElement.addEventListener('click', () => window.history.back());
    }
}

define('vl-functional-header', VlFunctionalHeader);
