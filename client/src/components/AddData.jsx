import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const AddData = () => {
  let navigate = useNavigate();
  const [error, setError] = useState({
    errName: "",
    errEmail: "",
    errMobile: "",
    errAddress: "",
    errDesc: "",
  });
  const [inpVal, setInpVal] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    desc: "",
  });

  const inputHandler = (e) => {
    setInpVal((preVal) => {
      return {
        ...preVal,
        [e.target.name]: e.target.value,
      };
    });
  };
  // console.log(inpVal);
  const submitForm = async (e) => {
    e.preventDefault();
    // console.log(inpVal.name);
    const { name, email, mobile, address, desc } = inpVal;
    if (!name.match(/^[A-Za-z- ]+$/)) {
      setError({ errName: "Name field contains only alphabet Character" });
      return;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError({ errEmail: "Please enter valid email address" });
      return;
    } else if (
      !mobile.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
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

    let res = await fetch("http://localhost:7000/add-data", {
      method: "POST",
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
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6 m-auto ">
          <div className="card">
            <div className="card-header">
              <Link to={"/"} title="Go Back">
                <i className="fa-solid fa-circle-left"></i>
              </Link>
              <h5 className="text-center">Add Date Form</h5>
            </div>
            <div className="card-body">
              <form action="">
                <div className="form-group">
                  <label htmlFor="Name">Full Name</label>
                  <small className="text-danger float-end">
                    {error.errName}
                  </small>

                  <input
                    type="text"
                    name="name"
                    required
                    onChange={inputHandler}
                    value={inpVal.name}
                    className="form-control shadow-none"
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
                    onChange={inputHandler}
                    value={inpVal.email}
                    className="form-control shadow-none"
                  />
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="Mobile">Mobile</label>
                  <small className="text-danger float-end">
                    {error.errMobile}
                  </small>
                  <input
                    type="text"
                    name="mobile"
                    required
                    onChange={inputHandler}
                    value={inpVal.mobile}
                    className="form-control shadow-none"
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="Address">Address</label>
                  <small className="text-danger float-end">
                    {error.errAddress}
                  </small>
                  <input
                    type="text"
                    name="address"
                    required
                    onChange={inputHandler}
                    value={inpVal.address}
                    className="form-control shadow-none"
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="Description">Description</label>
                  <small className="text-danger float-end">
                    {error.errDesc}
                  </small>
                  <textarea
                    name="desc"
                    cols="30"
                    rows="2"
                    required
                    onChange={inputHandler}
                    value={inpVal.desc}
                    className="form-control shadow-none"
                  ></textarea>
                </div>
                <div className="form-group mt-3">
                  <input
                    type="submit"
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
  );
};

export default AddData;
