/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (typeof size !== 'number') {
    return string;
  }

  if (size < 1) {
    return '';
  }

  return string
    .split('')
    .reduce((acc, char, index) => {
      if (char !== string[index - 1]) {
        return [...acc, (acc[acc.length - 1] = [char])];
      }

      const lastAccElement = acc[acc.length - 1];

      if (lastAccElement.length < size) {
        return [...acc.slice(0, acc.length - 1), [...lastAccElement, char]];
      }

      return acc;
    }, [])
    .flat()
    .join('');
}
