# A11y Tab Trap
Create accessible tab trap.

## Getting Started
1. [Install](#install)
2. [Examples](#examples)
2. [Methods](#methods)

## Install

### npm
```
npm i a11y-tab-trap --save
```

### Yarn

```
yarn add a11y-tab-trap
```

## Examples

### HTML
``` HTML
<button class="btn-open">Open dialog</button>

<article role="dialog" tabindex="-1">
    <button  class="btn-close">Close dialog</button>

    <form action="#" method="get">
        <label for="email">Email</label>
        <input #id="email" type="email" />
    </form>
</article>
```

### TypeScript
#### CreateTapTrap() Fonction
``` TS
import { createTabTrap } from 'a11y-tab-trap';

let a11yTabTrap;

const openDialog = () => {
    const refDialog = document.querySelector('[role="dialog"]');
    a11yTabTrap = createTabTrap(refDialog);
};

const closeDialog = () => {
    a11yTabTrap?.remove();
};

document.querySelector('.btn-open')
    .addEventListener('click', openDialog);

document.querySelector('.btn-close')
    .addEventListener('click', closeDialog);

```

#### A11yTabTrap Class
``` TS
import { A11yTabTrap } from 'a11y-tab-trap';

const a11yTabTrap = new A11yTabTrap();

const openDialog = () => {
    const refDialog = document.querySelector('[role="dialog"]');
    a11yTabTrap.set(refDialog);
};

const closeDialog = () => {
    a11yTabTrap.remove();
};

document.querySelector('.btn-open')
    .addEventListener('click', openDialog);

document.querySelector('.btn-close')
    .addEventListener('click', closeDialog);

```

## Methods

### A11yTabTrap.set(htmlElement, options)
Apply a focus trap on the child element of the htmlElement parameter using the options passed in parameter.

**options**
| Attribute | Default value | Description |
| -- | -- | -- |
| initialFocus?: `HtmlElement` | rootElement | Element that will be focused following the execution of the `set()` method |
| finalFocus?: `HtmlElement \| null` | `document.activeElement` | Element that will be focused following the execution of the `remove()` method |


### A11yTabTrap.remove()
Apply focus to the last focused element before executing the `set()` method and remove event listeners.

### A11yTabTrap.destroy()
Remove event listeners.
