/**
 * @function storageAvailable - helps check if localStorage/sessionStorage is available
 * @param type - can choose localStorage or sessionStorage:
 * @returns {boolean} - states if the storage in question is available
 *
 * Got the code from here:
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 */

function storageAvailable(type: 'localStorage' | 'sessionStorage') {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name == 'QuotaExceededError' &&
      storage &&
      storage.length !== 0
    );
  }
}
