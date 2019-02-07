const startingId = 'N1152921521787521333';
const folder = 'img[src="/businesspublisher/layouts/default/images/tree/folder.gif"]';

/**
 * Checks has link or not
 * @param {string} id
 * @returns {Element}
 */
const isLink = (id) => document.querySelector(`#${id} a`);

/**
 * Click if its possible, if not - find the next one
 * @param {string} id
 */
const tryClick = (id) => {
  isLink(id) ? getNext(id) : doClick(id);
};

/**
 * Wait for server response and html rendering
 * @param {string} id
 * @param {number} delay
 */
const timeoutSetter = (id, delay = 60) => {
  setTimeout(function () {
    const next = document.querySelector('#' + id + ' nobr');
    next ? tryClick(next.id) : timeoutSetter(id);
  }, delay);
};

/**
 * Do click on image in element
 * @param {string} id
 */
const doClick = (id) => {
  document.querySelector(`#${id} ${folder}`).click();
  console.log('click on', id);
  timeoutSetter(id, 100);
};

/**
 * Get the next one for the parent one
 * @param {string} id
 * @returns {Element}
 */
const getNextForParent = (id) => {
  const current = document.getElementById(id);
  if (current) {
    const nextParent = current.parentElement.parentElement;
    const nextParentSibling = nextParent.nextSibling;
    return nextParentSibling ? nextParentSibling : getNextForParent(nextParent.id);
  }
};

/**
 * Find next id
 * @param {string} id
 */
const getNext = (id) => {
  // get the next one
  const next = document.getElementById(id).nextSibling;
  // if we have the next one - try to click, in other case - get next for parent and try to click
  if (next) {
    tryClick(next.id);
  } else {
    const nextParent = getNextForParent(id);
    nextParent ? tryClick(nextParent.id) : console.log('%c finish!', 'color: #3bc43b');
  }
};

tryClick(startingId);
