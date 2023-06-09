const focusableElementsSelector = '[tabindex="0"], a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]):not([type="hidden"]), select:not([disabled]):not([tabindex="-1"])';

export interface A11yTabTrapOptions {
    initialFocus?: HTMLElement;
}

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
        options?: A11yTabTrapOptions
    ): A11yTabTrap {
        this.#rootElement = element;
        this.#lastFocusedElement = document.activeElement as HTMLElement;

        this.#setFocusableElements();

        if (options?.initialFocus) {
            options.initialFocus.focus();
        } else if (this.#rootElement) {
            this.#rootElement.focus();
        }

        document.addEventListener('keydown', this.#keydownEvent);

        return this;
    }

    remove(): A11yTabTrap {
        if (this.#lastFocusedElement) 
            this.#lastFocusedElement.focus();
        
        document.removeEventListener('keydown', this.#keydownEvent);

        return this;
    }

    destroy(): A11yTabTrap {
        document.removeEventListener('keydown', this.#keydownEvent);

        return this;
    }

    #onKeydown(event: KeyboardEvent): void {
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

export const createTabTrap = (
    element: HTMLElement, 
    options?: A11yTabTrapOptions
): A11yTabTrap => new A11yTabTrap().set(element, options);
