const DHACodes = (() => {
  const BASE30_DIGITS = '0123456789ABCDEFGHJKLMNPRTVWXY'.split('');
  const BASE30_DIGITS_INDEX = {};
  
  BASE30_DIGITS.forEach((digit, decimalValue) => BASE30_DIGITS_INDEX[digit] = decimalValue)

  /**
   * Converts any number in the DHA base 30 character set to a decimal value.
   * 
   * @param number {String}
   * @param fromBase {Number}
   *
   * @returns Number
   */
  function convertToDecimal(number) {
    if (number.length == 0) return 0;
    
    const decimalValue = BASE30_DIGITS_INDEX[number[0]];

    if (decimalValue === undefined || decimalValue === null)
      throw new Exception("Invalid base ${fromBase} number: ${number}");

    return decimalValue * 30 ** (number.length - 1) + convertToDecimal(number.slice(1));
  }

  /**
   * Convert any decimal value to any base within DHA's base 30 character set.
   * 
   * @param number {Number}
   * @param toBase {Number}
   *
   * @returns {String}
   */
  function convertFromDecimal(number, toBase = 30) {
    if (toBase < 2 || toBase > 30) throw new Exception("Invalid base ${toBase}");
    
    let result = '';

    while (number > 0) {
      result = BASE30_DIGITS[number % toBase] + result;
      number = Math.floor(number / toBase);
    }
    
    return result;
  }
  
  /**
   * Returns the Luhn checksum for given number.
   * 
   * @param number {Number}
   * @returns {Number}
   */
  function calculateLuhnCheckDigit(number) {
    const digits = number.toString().split('').map(digit => Number.parseInt(digit, 10));
    const parity = digits.length % 2;

    let sum = 0;

    digits.forEach((digit, position) => {
      if (position % 2 === parity) digit *= 2;
      if (digit > 9) digit -= 9;

      sum += digit;
    });
    
    const checksum = sum % 10;
    return checksum === 0 ? 0 : 10 - checksum;
  }

  /**
   * @param code {String}
   *
   * @returns {Boolean}
   */
  function isValidDHACode(code) {
    try {
      const decimalCode = convertToDecimal(code).toString();
      const checkDigit = Number.parseInt(decimalCode[0], 10);
      const computedCheckDigit = calculateLuhnCheckDigit(Number.parseInt(decimalCode, 10) * 10);
      return computedCheckDigit === 0;
    } catch (exception) {
      console.error(exception);
      return false;
    }
  }
  
  return {isValidDHACode};
})();
