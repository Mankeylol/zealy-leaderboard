// src/components/Leaderboard.tsx
"use client";
import React, { useState, useEffect } from "react";

interface LeaderboardItem {
  userId: string;
  xp: number;
  name: string;
  avatar: string | null;
  numberOfQuests: number;
  addresses: Record<string, string>;
  address: string;
  twitterId: string;
  discord: string;
  twitter: string;
  discordId: string;
  connectedWallet: string;
}

const Leaderboard: React.FC = () => {
  const [data, setData] = useState<LeaderboardItem[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  const fetchData = async () => {
    try {
      const response = await fetch("https://zealy-api.vercel.app/");
      const result = await response.json();
      setData(result.leaderboard);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError((error as Error).message || "An unknown error occurred.");
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    // Fetch data every 5 minutes
    const intervalId = setInterval(() => {
      fetchData();
    }, 5 * 60 * 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const getRowStyle = (index: number) => {
    switch (index) {
      case 0:
        return "first-place";
      case 1:
        return "second-place";
      case 2:
        return "third-place";
      default:
        return "";
    }
  };

  return (
    <div className="leaderboard-outer-container">
      <div className="leaderboard-container">
        <div className="logo-container">
          <img
            src="assets/manifest-logo.png"
            alt="Manifest Logo"
            className="logo"
          />
        </div>
        <h2>Leaderboard</h2>
        {error ? (
          <p>Error fetching data: {error}</p>
        ) : (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>XP</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.userId} className={getRowStyle(index)}>
                  <td>{item.name}</td>
                  <td>{item.xp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style jsx>{`
        .leaderboard-outer-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }

        .leaderboard-container {
          transform: rotate(270deg);
          transform-origin: top left;
          position: relative;
          top: 100vh;
          width: 92vh;
          height: 92vw;
          color: #00f7ff; /* Neon color */
          background-color: #111; /* Dark background */
          padding: 20px;
          border-radius: 10px;
          // box-shadow: 0 0 10px #00f7ff; /* Neon glow effect */
          margin-top: -5vh;
          margin-left: 2vw;
          padding: 40px;
        }

        h2 {
          font-family: "Space Grotesk", sans-serif; /* Applying Space Grotesk to the title */
          text-align: center;
          font-size: 2em;
          margin-bottom: 20px;
        }

        .leaderboard-table {
          font-family: "Inter", sans-serif;
          width: 100%;
          border-collapse: collapse;
        }

        .leaderboard-table th,
        .leaderboard-table td {
          padding: 10px;
          border: 1px solid #00f7ff; /* Neon lines */
          text-align: left;
        }

        .leaderboard-table th {
          background-color: #222; /* Dark header background */
        }

        .leaderboard-table tr:nth-child(even) {
          background-color: #181818; /* Alternating row colors */
        }

        .first-place {
          // background-color: gold;
          // color: black;
          color: gold;
        }

        .second-place {
          // background-color: silver !important;
          // color: black;
          color: silver;
        }

        .third-place {
          // background-color: #cd7f32; /* Bronze */
          // color: black;
          color: #cd7f32;
        }

        .logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .logo {
          width: 320px;
          height: auto;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default Leaderboard;
