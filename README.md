# A11y Tab Trap
Create accessible tab trap.

## Getting Started
1. [Install](#install)
2. [Examples](#examples)
2. [Methods](#methods)

## Install

### npm
```
$ npm i a11y-tab-trap --save
```

### Yarn

```
$ yarn add a11y-tab-trap
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

``` TS
import { TabTrap } from 'a11y-tab-trap';

const tabTrap = new TabTrap();

const openDialog = () => {
    const refDialog = document.querySelector('[role="dialog"]');
    tabTrap.set(refDialog);
};

const closeDialog = () => {
    tabTrap.remove();
};

document.querySelector('.btn-open')
    .addEventListener('click', openDialog);

document.querySelector('.btn-close')
    .addEventListener('click', closeDialog);

```

## Methods

### TabTrap.set(htmlElement, options)
Apply a focus trap on the child element of the htmlElement parameter using the options passed in parameter.

**options**
| Attribute | Description |
| -- | -- |
| initialFocus: `HtmlElement` | Element that will be focused following the execution of the `set()` method |

### TabTrap.remove()
Apply focus to the last focused element before executing the `set()` method and remove event listeners.

### TabTrap.destroy()
Remove event listeners.
