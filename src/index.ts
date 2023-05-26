const focusableElementsSelector = '[tabindex="0"], a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]):not([type="hidden"]), select:not([disabled]):not([tabindex="-1"])';

export class A11yTabTrap {
    #rootElement: HTMLElement | null = null;
    #focusableElements: HTMLElement[] = [];
    #lastFocusedElement: HTMLElement | null = null;
    #keydownEvent: () => void;

    constructor() {
        this.#keydownEvent = this.#onKeydown.bind(this);
    }
    
    set(
        element: HTMLElement,
        options?: {
            initialFocus?: HTMLElement;
        }
    ): void {
        this.#rootElement = element;
        this.#lastFocusedElement = document.activeElement as HTMLElement;

        this.#setFocusableElements();

        if (options?.initialFocus) {
            options.initialFocus.focus();
        } else if (this.#rootElement) {
            this.#rootElement.focus();
        }

        document.addEventListener('keydown', this.#keydownEvent);
    }

    remove(): void {
        if (this.#lastFocusedElement) 
            this.#lastFocusedElement.focus();
        
        document.removeEventListener('keydown', this.#keydownEvent);
    }

    destroy() {
        document.removeEventListener('keydown', this.#keydownEvent);
    }

    #onKeydown = (event: KeyboardEvent): void => {
        if (!this.#rootElement) return;

        this.#setFocusableElements();

        const focusedIndex = this.#focusableElements.indexOf(
            document.activeElement as HTMLElement
        );

        if (event.key !== 'Tab' || focusedIndex === -1) return;

        const lastIndex = this.#focusableElements.length - 1;
        const nextIndex = event.shiftKey
            ? focusedIndex - 1
            : focusedIndex + 1;

        if (nextIndex < 0) {
            this.#focusableElements[lastIndex].focus();
            event.preventDefault();
            return;
        }

        if (nextIndex > lastIndex) {
            this.#focusableElements[0].focus();
            event.preventDefault();
            return;
        }
        
    };

    #setFocusableElements(): void {
        if (!this.#rootElement) return;
        this.#focusableElements = (Array.from(
            this.#rootElement.querySelectorAll(
                focusableElementsSelector
            )
        ) as HTMLElement[]).filter(e => e.offsetParent !== null);
    }
}
