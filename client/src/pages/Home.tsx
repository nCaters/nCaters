import { useEffect, useState } from "react";
import "../css/Notification.css";
import { useNavigate } from "react-router-dom";
import Endpoints from "../endpoints";

const Home = () => {
  const navigate = useNavigate();
  const logo = require("./ncatersicon.PNG");

  const [notification, setNotification] = useState([]);

  useEffect(() => {
    fetch(Endpoints.NOTIF_REWARD_BASE + "/notification")
      .then((response) => response.json())
      .then((data) => setNotification(data.data.message))
      .catch((error) => console.error(error));
  }, []);

  const renderData = () => {
    return (
      <body>
        {notification.length > 0 && <h3>Announcements:</h3>}
        {notification.length > 0 &&
          notification.map((item: any) => {
            return <td>{item.message}</td>;
          })}
      </body>
    );
  };

  return (
    <>
      <h1>Welcome to nCaterS</h1>
      <img src={logo} width='400' height='320' />

      <div className='d-grid gap-2 col-6 mx-auto mt-5'>
        <button
          type='button'
          className='btn btn-outline-primary'
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          type='button'
          className='btn btn-outline-primary'
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </>
  );
};

export default Home;
