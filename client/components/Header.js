import React from "react";
import Link from "next/link";

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && {
      label: "Sign Up",
      href: "/auth/signup",
    },
    !currentUser && {
      label: "Sign In",
      href: "/auth/signin",
    },
    currentUser && {
      label: "Sign Out",
      href: "/auth/signout",
    },
  ]
    .filter((links) => links)
    .map(({ label, href }) => {
      return (
        <li className="nav-item">
          <Link href={href}>
            <p className="navbar-brand"> {label}</p>
          </Link>
        </li>
      );
    });
  return (
    <nav className="navbar navbar-light bg-light">
      <Link href={"/"}>
        <p className="navbar-brand">ABC</p>
      </Link>
      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {/* {currentUser ? "Sign Out" : "Sig IN"} */}
          {links}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
