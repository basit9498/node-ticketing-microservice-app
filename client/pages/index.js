import React from "react";
import axios from "axios";
import buildClient from "../api/build-client";

const Index = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <a>View</a>
          </Link>
        </td>
      </tr>
    );
  });
  return (
    // <div>
    //   {currentUser ? <h1>Your Are Sign In</h1> : <h1>Your Are Sign Out</h1>}
    // </div>
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

Index.getInitialProps = async (context, client, currentUser) => {
  // const response = await axios.get("api/users/current-user");
  // return response.data;

  // if (typeof window === "undefined") {
  //   // we are i server
  //   // const { data } = await axios.get(
  //   //   "http://ingress-nginx.ingress-nginx.svc.cluster.local/api/users/current-user",
  //   //   {
  //   //     headers: {
  //   //       Host: "ticketing.dev",
  //   //     },
  //   //   }
  //   // );
  //   const { data } = await axios.get(
  //     "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/current-user",
  //     {
  //       // headers: {
  //       //   Host: "ticketing.dev",
  //       // },
  //       headers: req.headers,
  //     }
  //   );
  //   console.log("adData:", data);
  //   return data;
  // } else {
  //   // we are in the broswer
  //   const { data } = await axios.get("/api/users/current-user");
  //   console.log("adData:", data);
  //   return data;
  // }

  // return {};
  // console.log("Landing pages:");
  // // const { data } = await buildClient(context).get("/api/users/current-user");
  // // return data;
  // return {};

  const { data } = await client.get("/api/tickets");

  return { tickets: data };
};

export default Index;
