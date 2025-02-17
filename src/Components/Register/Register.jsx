import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const reset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const Req = async () => {
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data) {
        console.log(data);
        reset();
        navigate("/");
      } else {
        console.log("Register failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      password !== confirmPassword ||
      (password === "" && confirmPassword === "")
    ) {
      alert("Passwords do not match");
    } else {
      Req();
    }
  };

  return (
    <div className="flex justify-center items-center vh-100 bg-light-gray mainContainer">
      <div className="pa4 br3 shadow-4 bg-white w-30">
        <h2 className="tc f3">Create Account</h2>
        <form className="flex flex-column">
          <label className="f6 b db mb2">Name</label>
          <input
            type="name"
            className="pa3 input-reset ba bg-transparent w-95 mb3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label className="f6 b db mb2">Email</label>
          <input
            type="email"
            className="pa3 input-reset ba bg-transparent w-100 mb3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="f6 b db mb2">Password</label>
          <input
            type="password"
            className="pa3 input-reset ba bg-transparent w-100 mb3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="f6 b db mb2">Confirm Password</label>
          <input
            type="password"
            className="pa3 input-reset ba bg-transparent w-100 mb3"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 w-100 mt3"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>

        <div className="mt3 tc">
          <p className="f6">
            Already have an account?{" "}
            <Link to="/" className="link blue">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
