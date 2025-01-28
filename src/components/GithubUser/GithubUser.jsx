import { useEffect, useState } from "react";
import avatar from "../../assets/images/akmtasdikulislam.jpg";

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

import PropTypes from "prop-types";

const GithubUser = ({ username }) => {
  // State for user data
  const [avatarUrl, setAvatarUrl] = useState("");
  const [name, setName] = useState("");

  /**
   * Fetches user data from GitHub API
   */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        const data = await response.json();
        setAvatarUrl(data.avatar_url);
        setName(data.name);
      } catch (error) {
        console.error("Error fetching GitHub user data:", error);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <div className="github-user">
      <img
        className="github-user-avarter"
        src={avatarUrl || avatar}
        alt={`${name}'s avatar`}
      />
      <div className="github-user-details">
        <p className="github-user-name">{name || "Akm Tasdikul Islam"}</p>
        <p className="github-user-username">@{username}</p>
      </div>
    </div>
  );
};

GithubUser.propTypes = {
  username: PropTypes.string.isRequired,
};

export default GithubUser;
