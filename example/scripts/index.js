import { createTabTrap } from '../../lib/index.esm.js';

const DISPLAY_NONE_CLASS = 'display-none';

const refBtnOpen = document.querySelector('.btn-open');
const refDialog = document.querySelector('[role="dialog"]');
const refBtnClose = document.querySelector('.btn-close');
let a11yTabTrap;

const openDialog = () => {
    refDialog.classList.remove(DISPLAY_NONE_CLASS);
    a11yTabTrap = createTabTrap(refDialog);
};

const closeDialog = () => {
    refDialog.classList.add(DISPLAY_NONE_CLASS);
    a11yTabTrap?.remove();
};


refBtnOpen.addEventListener('click', openDialog);
refBtnClose.addEventListener('click', closeDialog);