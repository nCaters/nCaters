import React, { useState, useEffect } from 'react';
import '../css/FoodListing.css';
import Dashboard from '../components/Dashboard';
import Endpoints from '../endpoints';

const FoodListing = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        // fetch('http://localhost:3002/api/v1/food')
        //     .then(response => response.json())
        //     .then(data => setRestaurants(data.data.food))
        //     .catch(error => console.error(error));
        fetch(Endpoints.ACCOUNT_FOOD_BASE+'/food-of-the-day')
            .then(response => response.json())
            .then(data => setRestaurants(data.data.food))
            .catch(error => console.error(error));
    }, []);

    const renderTableHeader = () => {
        return (
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Cuisine</th>
                    <th>Meal</th>
                    <th>Cost</th>
                </tr>
            </thead>
        );
    };

    const renderTableData = () => {
        return (
            <tbody>
                {restaurants.map((restaurant: any) => {
                    return (
                        <tr key={restaurant.id}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.cuisine}</td>
                            <td>{restaurant.meal}</td>
                            <td>${restaurant.cost}</td>
                        </tr>
                    );
                })}
            </tbody>
        );
    };

    return (
        <>
            <Dashboard />
            <h1>Food of the day</h1>
            <table id="restaurant-table">
                {renderTableHeader()}
                {renderTableData()}
            </table>
        </>
    );
};

export default FoodListing;
