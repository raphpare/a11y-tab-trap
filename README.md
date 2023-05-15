# Tab Trap
Create accessible focus trap.

## Getting Started
1. [Install](#install)
2. [Instantiate](#instantiate)
2. [Methods](#methods)

## Install
```
$ npm i @raphpare/tab-trap --save
```

or

```
$ yarn add @raphpare/tab-trap
```

## Instantiate
``` html
<button class="btn-open">Open dialog</button>

<article role="dialog" tabindex="-1">
    <button  class="btn-close">Close dialog</button>

    <form action="#" method="get">
        <label for="name">Full Name</label>
        <input #id="name" type="text" />

        <label for="email">Email</label>
        <input #id="email" type="email" />
    </form>
</article>
```

``` ts
import { TabTrap } from 'tabtrap';

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
