import React, { Fragment, useEffect, useState } from "react";
import { Link, Route, Router, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import FoodListing from "../pages/FoodListing";
import FoodPreference from "../pages/FoodPreference";
import Reward from "../pages/Reward";
import Wastage from "../pages/Wastage";
import Endpoints from "../Endpoints";

export default function Dashboard(props: any) {
  const { setAuth } = props;

  const [name, setName] = useState("");
  const [notification, setNotification] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const isDashboard = window.location.pathname === "/dashboard";

  const checkIfAdmin = (roleId: number) => {
    if (roleId == 0) {
      setIsAdmin(true);
    }
  }

  const getProfile = async () => {
    try {
      const res = await fetch(Endpoints.DASHBOARD_BASE, {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseData = await res.json();
      setName(parseData.username);
      checkIfAdmin(parseData.role_id);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const logout = async (e: any) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);


  useEffect(() => {
    fetch(Endpoints.NOTIF_REWARD_BASE + '/api/v1/notification')
      .then(response => response.json())
      .then(data => setNotification(data.data.message))
      .catch(error => console.error(error));
  }, []);

  const renderData = () => {
    return (
      <body>
        {notification.length > 0 && <h3>Announcements:</h3>}
        {notification.length > 0 && notification.map((item: any) => {
          return (
            <p>{item.message}</p>
          );
        })}
      </body>
    );
  };


  return (
    <div className='mt-5 text-center'>
      {!isAdmin && (
        <nav>
          <ul className='nav-list'>
            <li>
              <Link to='/dashboard' className='nav-link'>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to='/foodListing' className='nav-link'>
                Food of the day
              </Link>
            </li>
            <li>
              <Link to='/foodPreference' className='nav-link'>
                Preference
              </Link>
            </li>
            <li>
              <Link to='/reward' className='nav-link'>
                Reward
              </Link>
            </li>
          </ul>
        </nav>
      )}
      {isAdmin && (
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
              <Link to="/notification" className="nav-link">
                Notification
              </Link>
            </li>
          </ul>
        </nav>
      )}
      {isDashboard &&
        <>
          <h1 className='mt-5'>Dashboard</h1>
          <h2>Welcome {name}</h2>
          {!isAdmin && <body className="notification-message"> {renderData()} </body>}
          <button onClick={(e) => logout(e)} className='btn btn-primary'>
            Logout
          </button>
        </>}
    </div>
  );
}
