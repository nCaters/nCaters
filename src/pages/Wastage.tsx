import React, { useState, useEffect } from "react";
import "../css/FoodListing.css";
import Endpoints from "../Endpoints";
import { Link } from "react-router-dom";
const Wastage = () => {
  const [wastages, setWastages] = useState([]);

  useEffect(() => {
    getWastage();
  }, []);

  const getWastage = () => {
    fetch(Endpoints.ACCOUNT_FOOD_BASE + "/wastage")
      .then((response) => response.json())
      .then((data) => setWastages(data.data.wastage))
      .catch((error) => console.error(error));
  };

  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Date</th>
          <th>Food Type</th>
          <th>Waste Amount Portion</th>
        </tr>
      </thead>
    );
  };

  const renderTableData = () => {
    return (
      <tbody>
        {wastages.map((wastage: any) => {
          return (
            <tr key={wastage.id}>
              <td>{wastage.wastedate.slice(0, 10)}</td>
              <td>{wastage.foodname}</td>
              <td>{wastage.wasteamount}</td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  const [foodItems, setFoodItems] = useState<any>([]);
  const [date, setDate] = useState("");
  const [foodWasteAmount, setFoodWasteAmount] = useState("");
  const [foodId, setFoodId] = useState("1");

  //food drop down list
  useEffect(() => {
    fetch(Endpoints.ACCOUNT_FOOD_BASE + "/getFoodList")
      .then((response) => response.json())
      .then((data) => setFoodItems(data.data.foodItems))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await fetch(
      Endpoints.ACCOUNT_FOOD_BASE + "/wastage-entry",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          food_waste_amount: foodWasteAmount,
          food_id: foodId,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    getWastage();
  };

  const wastageForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='date'>Date:</label>
          <input
            type='date'
            id='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='foodWasteAmount'>Food Waste Amount:</label>
          <input
            type='number'
            id='foodWasteAmount'
            value={foodWasteAmount}
            onChange={(e) => setFoodWasteAmount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='food'>Food:</label>
          <select value={foodId} onChange={(e) => setFoodId(e.target.value)}>
            {foodItems.map((foodItem: any) => (
              <option key={foodItem.food_id} value={foodItem.food_id}>
                {foodItem.name}
              </option>
            ))}
          </select>
        </div>
        <button type='submit'>Submit</button>
      </form>
    );
  };

  return (
    <>
      <nav>
        <ul className='nav-list'>
          <li>
            <Link to='/foodListing' className='nav-link'>
              Food
            </Link>
          </li>
          <li>
            <Link to='/wastage' className='nav-link'>
              Wastage
            </Link>
          </li>
          <li>
            <Link to='/notification' className='nav-link'>
              Notification
            </Link>
          </li>
        </ul>
      </nav>
      <h1>Wastage</h1>
      {wastageForm()}
      <table id='restaurant-table'>
        {renderTableHeader()}
        {renderTableData()}
      </table>
    </>
  );
};

export default Wastage;
