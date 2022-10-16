import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Dashboard = () => {
  let navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const getUsersData = async () => {
    let res = await fetch("http://localhost:7000/get-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const usrsDBData = await res.json();
    // console.log(usrsDBData);
    setUsers(usrsDBData);
  };

  useEffect(() => {
    getUsersData();
  }, []);
  // console.log(users);

  const deleteUser = async (delId) => {
    if (window.confirm("Are you sure want to delete this record ?")) {
      try {
        let delRes = await fetch(`http://localhost:7000/delete-data/${delId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        let srvrDelRes = await delRes.json();
        // console.log(srvrDelRes);
        if (srvrDelRes.status == true) {
          alert("Record Deleted successfully...");
          getUsersData();
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container mt-5 tbldata">
      <Link to={"./add-data"} className="btn btn-outline-dark float-end mb-3">
        <i className="fa fa-plus"></i> Add Data
      </Link>
      <table className="table">
        <thead className="bg-dark text-white">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Number</th>

            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((element, idx) => {
            return (
              <tr key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>{element.name}</td>
                <td>{element.email}</td>
                <td>{element.mobile}</td>

                <td className="d-flex justify-content-around mt-2">
                  <Link to={`./view-data/${element._id}`}>
                    <i
                      className="fa fa-eye text-success"
                      title="View"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </Link>
                  <Link
                    to={`./edit-data/${element._id}`}
                    style={{ marginLeft: "20px" }}
                  >
                    <i
                      className="fa-solid fa-pen-to-square text-warning"
                      title="Edit"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </Link>

                  <Link
                    onClick={() => {
                      deleteUser(element._id);
                    }}
                  >
                    <i
                      className="fa-solid fa-xmark text-danger"
                      title="Delete"
                      style={{ cursor: "pointer", marginLeft: "20px" }}
                    ></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
