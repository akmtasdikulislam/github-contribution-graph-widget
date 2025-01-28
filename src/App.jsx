import { useEffect, useState } from "react";
import ActivityCalendar from "react-activity-calendar";
import "./App.css";

// Component imports
import GithubUser from "./components/GithubUser/GithubUser";
import StatusBar from "./components/StatusBar/StatusBar";
import TodayContribution from "./components/TodayContribution/TodayContribution";

/**
 * GitHub Contribution Graph Widget
 * Displays user's contribution history, today's contributions, and user info
 * Features auto-refresh, offline persistence, and real-time status updates
 * @returns {JSX.Element} Main application component
 */
const App = () => {
  // State initialization with localStorage persistence
  const [status, setStatus] = useState({});
  // Track today's contribution count
  const [todayContribution, setTodayContribution] = useState(0);

  // Track last time data was fetched, initialize from localStorage or current time
  const [lastCheck, setLastCheck] = useState(() => {
    const savedLastCheck = localStorage.getItem("lastCheckTime");
    return savedLastCheck || new Date().toISOString();
  });

  // Store contribution data with persistence, initialize from localStorage or empty data
  const [contirbutionData, setContirbutionData] = useState(() => {
    const savedData = localStorage.getItem("githubContributionData");
    return savedData
      ? JSON.parse(savedData) // Use saved data if available
      : [
          {
            date: new Date().toISOString().split("T")[0], // Default to today's date
            count: 0, // No contributions
            level: 0, // Lowest activity level
          },
        ];
  });

  /**
   * Fetches GitHub user's contribution data
   * @param {string} username - GitHub username
   * @returns {Promise<void>}
   */
  const fetchContributions = async (username) => {
    try {
      // Set initial loading status to indicate data fetching
      setStatus({
        state: "loading",
        message: "Loading",
      });

      // Fetch contribution data from GitHub API for the specified username
      const response = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
      );
      // Parse the JSON response from the API
      const data = await response.json();

      // Transform API data to match ActivityCalendar format
      // Map each contribution to include date, count and calculated level
      const formattedData = data.contributions.map((contrib) => ({
        date: contrib.date,
        count: contrib.count,
        level: contrib.level || Math.min(Math.floor(contrib.count / 4), 4), // Calculate level if not provided
      }));

      // Store formatted contribution data in localStorage for persistence
      localStorage.setItem(
        "githubContributionData",
        JSON.stringify(formattedData)
      );
      // Update state with formatted contribution data
      setContirbutionData(formattedData);

      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split("T")[0];
      // Find today's contribution from the fetched data
      const todayContribution = data.contributions.find(
        (contrib) => contrib.date === today
      );
      // Update today's contribution count state, default to 0 if no contributions
      setTodayContribution(todayContribution ? todayContribution.count : 0);

      // Get current time in UK format for last check timestamp
      const currentTime = new Date().toLocaleString("en-UK");
      // Store last check time in localStorage
      localStorage.setItem("lastCheckTime", currentTime);
      // Update last check time state
      setLastCheck(currentTime);

      // Set status to okay with last check time message
      setStatus({
        state: "okay",
        message: `Last checked: ${lastCheck}`,
      });
    } catch (error) {
      // Handle any errors during the fetch process
      setStatus({
        state: "error",
        message: error.message,
      });
      // Log the error to console for debugging
      console.error("Fetch error:", error);
    }
  };
  // Auto-refresh setup
  useEffect(() => {
    // Initial fetch of contributions when component mounts
    fetchContributions("akmtasdikulislam");

    // Set up an interval to fetch contributions every 10 minutes
    const intervalId = setInterval(() => {
      // Fetch updated contribution data periodically
      fetchContributions("akmtasdikulislam");
    }, 600000); // 10 minutes interval (600000 milliseconds)

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this effect runs only once on mount

  // Theme configuration for contribution graph
  const calendarTheme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <main>
      {/* Container for the main content */}
      <div className="github-contribution-graph">
        {/* Title for the contribution chart section */}
        <p className="title">Github Contribution Chart</p>
        {/* Render ActivityCalendar only if there's sufficient contribution data */}
        {contirbutionData.length > 10 && (
          <ActivityCalendar
            data={contirbutionData}
            theme={calendarTheme}
            labels={{
              totalCount: "{{count}} contributions in the last year",
            }}
          />
        )}
        {/* Display current status of data fetching */}
        <StatusBar status={status} />
      </div>

      {/* Visual separator between sections */}
      <div className="divider"></div>

      {/* Container for additional GitHub-related components */}
      <div className="miscellaneous">
        {/* Display GitHub user information */}
        <GithubUser username={"akmtasdikulislam"} />
        {/* Button to manually refresh contribution data */}
        <button
          className="refresh-btn"
          onClick={() => fetchContributions("akmtasdikulislam")}
        >
          Refresh
        </button>
        {/* Button to open GitHub's new repository page in a new tab */}
        <button
          className="new-repo"
          onClick={() => window.open("https://github.com/new", "_blank")}
        >
          New Repo
        </button>
        {/* Display today's contribution count */}
        <TodayContribution contribution={todayContribution} />
      </div>
    </main>
  );
};

export default App;
