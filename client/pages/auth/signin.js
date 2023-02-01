import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/sigin",
    method: "post",
    body: {
      email,
      password,
    },
    onSucces: () => Router.push("/"),
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await doRequest();
    // Router.push("/");
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h1>Sign IN Page</h1>
        <div className="form-group">
          <label>Email Address</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type={"password"}
            className="form-control"
          />
        </div>
        {errors}

        <div className="mt-3">
          <button className="btn btn-primary">Sign In</button>
        </div>
      </form>
    </div>
  );
};
