import React, { useState } from "react";
import "./SiginIn.css";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setCurrUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const Req = async () => {
    try {
      const res = await fetch(
        "https://stark-ravine-11103-56024eaa1c1d.herokuapp.com/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        }
      );

      const data = await res.json();

      if (!data.id) {
        alert("Login or password is incorrect!!!");
      } else {
        setCurrUser(data);
        navigate("/mainpage");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from submitting and page reload

    Req();
  };

  return (
    <div className="flex justify-center items-center vh-100 bg-light-gray mainContainer">
      <div className="pa4 br3 shadow-2 bg-white w-30">
        <h2 className="tc f3">Sign In</h2>
        <form onSubmit={handleSubmit} className="flex flex-column">
          <label className="f6 b db mb2">Email</label>
          <input
            type="email"
            className="pa2 input-reset ba bg-transparent w-100 mb3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="f6 b db mb2">Password</label>
          <input
            type="password"
            className="pa2 input-reset ba bg-transparent w-100 mb3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 text"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
