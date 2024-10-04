import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login({ users }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const log_user = () => {
    const storedUser = users;
    let foundUser = false;

    for (let i = 0; i < storedUser.length; i++) {
      if (
        email === storedUser[i].email &&
        password === storedUser[i].password
      ) {
        foundUser = true;
        navigate("/Todo");
        break;
      }
    }

    if (!foundUser) {
      setError("Email and Password are incorrect!!");
    }
  };

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      <div>
        <div className="max-w-[400px] w-full mx-auto">
          <h2 className="text-4xl font-bold text-center py-6">Login</h2>

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex flex-col py-2">
            <label>Email</label>
            <input
              className="border p-2 rounded-full"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col py-2">
            <label>Password</label>
            <input
              className="border p-2 rounded-full"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="border-none rounded-full bg-rose-600 h-16 w-full pl-6 pr-2 text-white text-lg font-medium cursor-pointer"
            type="submit"
            onClick={log_user}
          >
            Sign In
          </button>

          <div>
            <p>
              Create an account?{" "}
              <Link to="/Registration" className="text-blue-600">
                Registration
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
