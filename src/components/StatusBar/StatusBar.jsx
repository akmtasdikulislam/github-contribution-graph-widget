/**
 * StatusBar Component
 * Displays the current status of the application with different visual states
 *
 * @component
 * @param {Object} props
 * @param {Object} props.status - The status object containing state and message
 * @param {string} props.status.state - Current state ('okay', 'loading', or 'error')
 * @param {string} props.status.message - Status message to display
 * @returns {JSX.Element} Status bar with dynamic state-based styling
 *
 * @example
 * <StatusBar
 *   status={{
 *     state: "okay",
 *     message: "Last checked: 12:00 PM"
 *   }}
 * />
 */

import PropTypes from "prop-types";

const StatusBar = ({ status }) => {
  return (
    <div className="status-bar">
      {/* Main container for the status bar */}
      <p>Status:</p> {/* Static label for the status indicator */}
      {status.state === "okay" ? ( // Check if status is "okay"
        <span className={status.state}>{status.message}</span> // Display success message with "okay" styling
      ) : status.state === "loading" ? ( // Check if status is "loading"
        <span className="loading loading-dots">{status.message}</span> // Display loading animation with message
      ) : (
        // Fallback for error state
        <span className={status.state}>{status.message}</span> // Display error message with error styling
      )}
    </div>
  );
};

StatusBar.propTypes = {
  status: PropTypes.shape({
    state: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default StatusBar;
