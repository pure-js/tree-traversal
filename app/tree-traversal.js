const startingId = 'N1152921521787521333';
const folder = ' img[src="/businesspublisher/layouts/default/images/tree/folder.gif"]';

// Do click on image in element
function doClick(id) {
  document.querySelector('#' + id + folder).click();
  console.log('click on', id);
  timeoutSetter(id, 100);
}

// Wait for server response and html rendering
function timeoutSetter(id, delay = 60) {
  setTimeout(function () {
    let next = document.querySelector('#' + id + ' nobr');
    next ? tryClick(next.id) : timeoutSetter(id);
  }, delay);
}

// Check has link or not
function isLink(id) {
  return document.querySelector('#' + id + ' a');
}

// Get the next one for the parent one
function getNextForParent(id) {
  let current = document.getElementById(id);
  if (current) {
    let nextParent = current.parentElement.parentElement;
    let nextParentSibling = nextParent.nextSibling;
    return nextParentSibling ? nextParentSibling : getNextForParent(nextParent.id);
  }
}

// Find next id
function getNext(id) {
  // get the next one
  let next = document.getElementById(id).nextSibling;
  // if we have the next one - try to click, in other case - get next for parent and try to click
  if (next) {
    tryClick(next.id);
  } else {
    let nextParent = getNextForParent(id);
    nextParent ? tryClick(nextParent.id) : console.log('%c finish!', 'color: #3bc43b');
  }
}

// Click if its possible, if not - find the next one
function tryClick(id) {
  isLink(id) ? getNext(id) : doClick(id);
}

tryClick(startingId);
// TODO; save as