import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/Admin.css";

const Admin = () => {
  const path = process.env.REACT_APP_PATH;
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  // store the input of search bar
  const [q, setQ] = useState("");
  // parameters based on which searching will be done
  const [searchParam] = useState(["name", "uname"]);

  function search() {
    // filter the data on the basis of input by user in search box
    return data.filter((item) => {
      // here some function returns a new array fulfilling the search criterai
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

  // property deleted where the "sno" field of every property is mapped with the delete button of every record in the table
  const deleteAPIData = (id) => {
    axios.delete(`${path}/propdel/${id}`).then(() => {
      getData();
    });
    const timeoutId = setTimeout(() => {
      window.location.reload(true);
    }, 1500);
    return () => clearTimeout(timeoutId);
  };

  // handles logout where at backend checked that whether a session exists or not -> clears cookie and destroys session
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
