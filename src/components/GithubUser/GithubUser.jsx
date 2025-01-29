import { useEffect, useState } from "react";
import avatar from "../../assets/images/deafult-user.png";

/**
 * GithubUser Component
 * Displays GitHub user information including avatar and name
 * Fetches user data from GitHub API and provides fallback values
 *
 * @component
 * @param {Object} props
 * @param {string} props.username - GitHub username to fetch data for
 * @returns {JSX.Element} User profile card with avatar and details
 *
 * @example
 * <GithubUser username="akmtasdikulislam" />
 */

import { EyeIcon, SyncIcon } from "@primer/octicons-react";
import PropTypes from "prop-types";

const GithubUser = ({ username }) => {
  // State for user data
  const [avatarUrl, setAvatarUrl] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Fetches user data from GitHub API
   */
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setAvatarUrl(data.avatar_url);
      setName(data.name);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching GitHub user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`github-user ${isLoading && "fetchingUserData"}`}>
      <img
        className="github-user-avarter"
        src={avatarUrl || avatar}
        alt={`${name}'s avatar`}
      />
      <div className="github-user-details">
        <p className="github-user-name">{name || "GitHub User Name"}</p>
        <p className="github-user-username">@{username}</p>
      </div>
      <div className="overlay">
        {!isLoading ? (
          <div className="button-group">
            <button
              title="View Account"
              onClick={() =>
                window.open(`https://github.com/${username}`, "_blank")
              }
            >
              <EyeIcon />
            </button>
            <button
              title="Sync"
              onClick={() => {
                fetchUserData();
              }}
            >
              <SyncIcon />
            </button>
          </div>
        ) : (
          <div className="loading-dots">Syncing</div>
        )}
      </div>
    </div>
  );
};

GithubUser.propTypes = {
  username: PropTypes.string.isRequired,
};

export default GithubUser;
