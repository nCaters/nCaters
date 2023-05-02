import React, { useState, useEffect } from "react";
import "../css/FoodListing.css";
import Dashboard from "../components/Dashboard";
import Endpoints from "../Endpoints";

const Reward = () => {
  const [rewards, setRewards] = useState([]);
  const [points, setPoints] = useState(0);

  const getPoints = async () => {
    try {
      const res = await fetch(Endpoints.DASHBOARD_BASE, {
        method: "POST",
        headers: { token: localStorage.token },
      });
      const parseData = await res.json();
      console.log(JSON.stringify(parseData))

      const pointsRes = await fetch(`${Endpoints.ACCOUNT_FOOD_BASE}/get-points`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: parseData.user_id,
        }),
      });
      const pointsData = await pointsRes.json();
      setPoints(pointsData.data.points)

    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getPoints();
  }, []);

  useEffect(() => {
    fetch(Endpoints.NOTIF_REWARD_BASE + "/reward")
      .then((response) => response.json())
      .then((data) => setRewards(data.data.reward))
      .catch((error) => console.error(error));
  }, []);

  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Reward Type</th>
          <th>Points Needed</th>
        </tr>
      </thead>
    );
  };

  const renderTableData = () => {
    return (
      <tbody>
        {rewards.map((reward: any) => {
          return (
            <tr key={reward.reward_id}>
              <td>{reward.reward_type}</td>
              <td>{reward.point_needed}</td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <>
      <Dashboard />
      <h1>Rewards</h1>
      <h2>Points Available: {points}</h2>
      <table id="restaurant-table">
        {renderTableHeader()}
        {renderTableData()}
      </table>
    </>
  );
};

export default Reward;
