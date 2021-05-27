import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import logo from "./../../assets/logo.png";

export const Navbar = () => {
    return (
        <div id="navbar">
            <Link to="/">
                <img src={logo} alt="Logo" />
            </Link>
        </div>
    );
};
