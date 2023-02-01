import axios from "axios";

import { useState } from "react";

export default ({ url, method, body, onSucces }) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async () => {
    setErrors(null);
    try {
      const response = await axios[method](url, body);
      if (onSucces) {
        onSucces(response.data);
      }
      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger mt-3">
          <h4>Ooops....</h4>
          <ul className="my-0">
            {err?.response?.data?.errors?.map((er) => {
              return <li key={er.message}>{er.message}</li>;
            })}
          </ul>
        </div>
      );
      // throw err;
    }
  };
  return { doRequest, errors };
};
