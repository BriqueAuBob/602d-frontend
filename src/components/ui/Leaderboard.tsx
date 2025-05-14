import { useEffect, useState } from "react";
import fetchApi from "../../utils/fetchApi";

type ScoreEntry = {
  user: {
    name: string;
  };
  score: number;
};

type Scores = ScoreEntry[];

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<Scores>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetchApi("scores?order[score]=desc");
        setLeaderboard(response);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{entry.user.name}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
