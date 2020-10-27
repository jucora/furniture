import React from "react";
import { NavLink } from "react-router-dom";

const addSkill = require("../img/add.svg");
const track = require("../img/track.svg");
const progress = require("../img/progress.png");
const more = require("../img/more.svg");

const NavBar = () => (
  <div className="navBar">
    <div className="navBarLinkBox">
      <NavLink
        className="nav-link"
        activeClassName="nav-link-active"
        to="/skillForm"
      >
        <div style={{ width: "100%", textAlign: "center" }}>
          <img style={{ width: "25%" }} src={addSkill} alt="Add Skill" />
        </div>
        Añadir Empleado
      </NavLink>
    </div>
    <div className="navBarLinkBox">
      <NavLink
        className="nav-link"
        activeClassName="nav-link-active"
        to="/track"
      >
        <div style={{ width: "100%", textAlign: "center" }}>
          <img style={{ width: "25%" }} src={track} alt="Track" />
        </div>
        Empleados
      </NavLink>
    </div>
    <div className="navBarLinkBox">
      <NavLink
        className="nav-link"
        activeClassName="nav-link-active"
        exact
        to="/more"
      >
        <div style={{ width: "100%", textAlign: "center" }}>
          <img style={{ width: "25%" }} src={more} alt="More Option" />
        </div>
        More
      </NavLink>
    </div>
  </div>
);

export default NavBar;
