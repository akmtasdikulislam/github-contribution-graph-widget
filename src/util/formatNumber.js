/**
 * Formats a number to a string with a minimum of 2 integer digits and no grouping separators.
 *
 * @param {number} number - The number to format.
 * @returns {number} The formatted number as a number.
 */

// Export the formatNumber function for use in other modules
export function formatNumber(number) {
  /**
   * Description:
   * This function takes a number as input and formats it to ensure a minimum of 2 integer digits
   * without using grouping separators. It returns the formatted number as a number type.
   *
   * Task list:
   * • Convert the input number to a locale-specific string
   * • Ensure at least 2 digits before the decimal point
   * • Disable grouping separators (e.g., commas for thousands)
   * • Convert the formatted string back to a number
   * • Return the formatted number
   */

  // Convert the formatted string back to a number and return it
  return Number(
    // Convert the input number to a locale-specific string
    number.toLocaleString("en-US", {
      // Ensure at least 2 digits before the decimal point
      minimumIntegerDigits: 2,
      // Disable grouping separators (e.g., commas for thousands)
      useGrouping: false,
    })
  );
}
