import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditData = () => {
  const { id } = useParams("");
  let navigate = useNavigate("");
  console.log(id);
  const [editSingleUser, setUsers] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    desc: "",
  });

  const [error, setError] = useState({
    errName: "",
    errEmail: "",
    errMobile: "",
    errAddress: "",
    errDesc: "",
  });

  const getSingleUserData = async () => {
    let res = await fetch(`http://localhost:7000/edit-data/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await res.json();
    // console.log(usrsDBData);
    setUsers(resData);
  };

  useEffect(() => {
    getSingleUserData();
  }, []);
  // console.log(editSingleUser);

  const inputHandler = (e) => {
    setUsers((preVal) => {
      return {
        ...preVal,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const { name, email, mobile, address, desc } = editSingleUser;
    if (!name.match(/^[A-Za-z- ]+$/)) {
      setError({ errName: "Name field contains only alphabet Character" });
      return;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError({ errEmail: "Please enter valid email address" });
      return;
    } else if (
      !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(mobile)
    ) {
      setError({
        errMobile: "Mobile field should be only numeric value with length 10",
      });
      return;
    } else if (address === "") {
      setError({
        errAddress: "The address field is required",
      });
      return;
    } else if (desc === "") {
      setError({
        errDesc: "The address field is required",
      });
      return;
    }

    let res = await fetch(`http://localhost:7000/update-data/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, mobile, address, desc }),
    });

    const data = await res.json();
    if (data.serverMsg == false) {
      alert("This user is already registered");
    } else {
      alert(data.serverMsg);
      navigate("/", { replace: true });
    }
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 m-auto ">
            <div className="card">
              <div className="card-header">
                <Link to={"/"} title="Go Back">
                  <i className="fa-solid fa-circle-left"></i>
                </Link>
                <h5 className="text-center">Edit Data</h5>
              </div>
              <div className="card-body">
                <form action="">
                  <div className="form-group">
                    <label htmlFor="Name">Full Name</label>{" "}
                    <small className="text-danger float-end">
                      {error.errName}
                    </small>
                    <input
                      type="text"
                      name="name"
                      required
                      className="form-control shadow-none"
                      value={editSingleUser.name}
                      onChange={inputHandler}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="Email">Email</label>{" "}
                    <small className="text-danger float-end">
                      {error.errEmail}
                    </small>
                    <input
                      type="email"
                      name="email"
                      required
                      className="form-control shadow-none"
                      value={editSingleUser.email}
                      onChange={inputHandler}
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label htmlFor="Mobile">Mobile</label>{" "}
                    <small className="text-danger float-end">
                      {error.errMobile}
                    </small>
                    <input
                      type="number"
                      name="mobile"
                      required
                      className="form-control shadow-none"
                      value={editSingleUser.mobile}
                      onChange={inputHandler}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="Address">Address</label>{" "}
                    <small className="text-danger float-end">
                      {error.errAddress}
                    </small>
                    <input
                      type="text"
                      name="address"
                      required
                      className="form-control shadow-none"
                      value={editSingleUser.address}
                      onChange={inputHandler}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="Address">Description</label>{" "}
                    <small className="text-danger float-end">
                      {error.errDesc}
                    </small>
                    <textarea
                      name="desc"
                      cols="30"
                      rows="2"
                      className="form-control shadow-none"
                      value={editSingleUser.desc}
                      onChange={inputHandler}
                    ></textarea>
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="submit"
                      value="Update"
                      className="btn btn-success shadow-none form-control"
                      onClick={submitForm}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditData;
