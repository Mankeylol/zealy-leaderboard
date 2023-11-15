// src/components/Leaderboard.tsx
'use client'
import React, { useState, useEffect } from 'react';

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
      const response = await fetch('https://zealy-api.vercel.app/');
      const result = await response.json();
      setData(result.leaderboard);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError((error as Error).message || 'An unknown error occurred.');
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

  return (
    <div className="center-container">
      <div className="rotate-container">
        <h2 className="mb-4">Leaderboard</h2>
        {error ? (
          <p>Error fetching data: {error}</p>
        ) : (
          <ul className="flex flex-col">
            {data.map((item) => (
              <li key={item.userId} className="mb-2">
                {item.name} - XP: {item.xp}
              </li>
            ))}
          </ul>
        )}
      </div>
      <style jsx>{`
        .center-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .rotate-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          white-space: nowrap;
          transform: rotate(-90deg);
          transform-origin: left top;
        }
      `}</style>
    </div>
  );
};

export default Leaderboard;
