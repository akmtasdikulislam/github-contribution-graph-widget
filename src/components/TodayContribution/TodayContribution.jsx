/**
 * TodayContribution Component
 * Displays the user's contribution count for the current day
 * Formats the number with leading zeros and proper localization
 *
 * @component
 * @param {Object} props
 * @param {number} props.contribution - Number of contributions made today
 * @returns {JSX.Element} Today's contribution count display
 *
 * @example
 * <TodayContribution contribution={5} />
 */

import PropTypes from "prop-types";

const TodayContribution = ({ contribution }) => {
  /**
   * Formats the contribution number with leading zeros
   * @param {number} value - The contribution count to format
   * @returns {string} Formatted contribution count
   */
  const formatContribution = (value) => {
    return value.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };

  return (
    <div className="today-contribution">
      <p>Today:</p>
      <p className="contribution-count">{formatContribution(contribution)}</p>
      <p className="contirbution-text">Contributions</p>
    </div>
  );
};

TodayContribution.propTypes = {
  contribution: PropTypes.number.isRequired,
};

export default TodayContribution;
