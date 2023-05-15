import { TabTrap } from '../../lib/tabtrap.esm.js';

const DISPLAY_NONE_CLASS = 'display-none';

const refBtnOpen = document.querySelector('.btn-open');
const refDialog = document.querySelector('[role="dialog"]');
const refBtnClose = document.querySelector('.btn-close');
const tabTrap = new TabTrap();

const openDialog = () => {
    refDialog.classList.remove(DISPLAY_NONE_CLASS);
    tabTrap.set(refDialog);
};

const closeDialog = () => {
    refDialog.classList.add(DISPLAY_NONE_CLASS);
    tabTrap.remove();
};


refBtnOpen.addEventListener('click', openDialog);
refBtnClose.addEventListener('click', closeDialog);