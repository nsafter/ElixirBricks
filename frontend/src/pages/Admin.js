import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/Admin.css";

const Admin = () => {
  const path = process.env.REACT_APP_PATH;
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const [q, setQ] = useState("");
  const [searchParam] = useState(["name", "uname"]);

  function search() {
    return data.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }

  const getData = () => {
    axios.get(`${path}/api/getdata`).then((getData) => {
      setData(getData.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteAPIData = (id) => {
    axios.delete(`${path}/propdel/${id}`).then(() => {
      getData();
    });
    const timeoutId = setTimeout(() => {
      window.location.reload(true);
    }, 1500);
    return () => clearTimeout(timeoutId);
  };

  const handleLogOut = () => {
    try {
      axios.get(`${path}/logout`);
    } catch (err) {
      console.log(err);
    }
    navigate("/");
  };

  return (
    <>
      <div className="read-container animate__animated animate__fadeIn animate__slow">
        <button className="logoutadmin-btn" onClick={handleLogOut}>
          LogOut
        </button>
        <center>
          <input
            type="search"
            placeholder="Search"
            className="search-bar"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <table className="table-data ">
            <thead>
              <tr className="thead">
                <th>Name</th>
                <th>Bedrooms</th>
                <th>Bathrooms</th>
                <th>Price</th>
                <th>Username</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {search(data).map((item) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.bedrooms}</td>
                    <td>{item.bathrooms}</td>
                    <td>{item.price}</td>
                    <td>{item.uname}</td>
                    <td>
                      <input
                        type="button"
                        value="Delete"
                        onClick={() => deleteAPIData(item.sno)}
                        className="btn delete-btn"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </center>
      </div>
    </>
  );
};

export default Admin;
