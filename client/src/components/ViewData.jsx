import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ViewData = () => {
  const { id } = useParams("");
  // console.log(id);

  const [singleUser, setUsers] = useState({});
  const getSingleUserData = async () => {
    let res = await fetch(`http://localhost:7000/view-data/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const singleUserData = await res.json();
    // console.log(usrsDBData);
    setUsers(singleUserData);
  };

  useEffect(() => {
    getSingleUserData();
  }, []);
  // console.log(singleUser);
  return (
    <>
      <div className="container mt-3">
        <h4 className="ms-5">Welcome {singleUser.name},</h4>
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="card border-primary">
              <div className="card-header">
                <Link
                  to={"/"}
                  title="Go Back"
                  className="btn btn-outline-primary float-start mt-3"
                >
                  <i className="fa-solid fa-circle-left"></i> Go Back
                </Link>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <ul className="list-unstyled">
                      <li className="mb-1">
                        <i class="fa-solid fa-user"></i>&nbsp;
                        <strong> {singleUser.name}</strong>
                      </li>
                      <li className="mb-1">
                        <i class="fa fa-phone" aria-hidden="true"></i>
                        &nbsp; {singleUser.mobile}
                      </li>
                      <li className="mb-1">
                        <i class="fa-solid fa-envelope"></i> &nbsp;
                        {singleUser.email}
                      </li>

                      <li className="mb-1">
                        <i class="fa-solid fa-location-dot"></i> &nbsp;{" "}
                        {singleUser.address}
                      </li>
                    </ul>
                  </div>
                  <div className="col-6">
                    <p className="text-break">
                      <strong>Description : </strong>
                      {singleUser.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewData;
