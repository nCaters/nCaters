import React, { useState, useEffect } from "react";
import "../css/FoodListing.css";
import Dashboard from "../components/Dashboard";
import Endpoints from "../endpoints";

const Reward = () => {
  const [rewards, setRewards] = useState([]);

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
      <table id="restaurant-table">
        {renderTableHeader()}
        {renderTableData()}
      </table>
    </>
  );
};

export default Reward;
