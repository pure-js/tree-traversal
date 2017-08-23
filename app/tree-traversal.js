const startingId = 'N1152921521787521333';
const folder = ' img[src="/businesspublisher/layouts/default/images/tree/folder.gif"]';

// Wait for server response and html rendering
const timeoutSetter = (id, delay = 60) => {
  setTimeout(function () {
    let next = document.querySelector('#' + id + ' nobr');
    next ? tryClick(next.id) : timeoutSetter(id);
  }, delay);
};

// Do click on image in element
const doClick = (id) => {
  document.querySelector('#' + id + folder).click();
  console.log('click on', id);
  timeoutSetter(id, 100);
};

// Check has link or not
const isLink = (id) => {
  return document.querySelector('#' + id + ' a');
};

// Get the next one for the parent one
const getNextForParent = (id) => {
  let current = document.getElementById(id);
  if (current) {
    let nextParent = current.parentElement.parentElement;
    let nextParentSibling = nextParent.nextSibling;
    return nextParentSibling ? nextParentSibling : getNextForParent(nextParent.id);
  }
};

// Find next id
const getNext = (id) => {
  // get the next one
  let next = document.getElementById(id).nextSibling;
  // if we have the next one - try to click, in other case - get next for parent and try to click
  if (next) {
    tryClick(next.id);
  } else {
    let nextParent = getNextForParent(id);
    nextParent ? tryClick(nextParent.id) : console.log('%c finish!', 'color: #3bc43b');
  }
};

// Click if its possible, if not - find the next one
const tryClick = (id) => {
  isLink(id) ? getNext(id) : doClick(id);
};

tryClick(startingId);
// TODO: save as
