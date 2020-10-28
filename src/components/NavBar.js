import React from 'react';
import { NavLink } from 'react-router-dom';

const addEmployee = require('../img/add.png');
const addCustomer = require('../img/customer.png');
const employees = require('../img/employees.png');
const customers = require('../img/customers.png');
const more = require('../img/more.svg');

const NavBar = (props) => {
  let optionStyle = { opacity: 0.4 };
  let k;
  let linkStyle = null;
  if (props.user.role === 'admin') {
    optionStyle.opacity = 1;

    linkStyle = { cursor: 'pointer' };
  } else {
    linkStyle = { cursor: 'auto', 'pointer-events': 'none' };
  }
  return (
    <div className="navBar">
      <div>
        <div className="navBarLinkBox" style={optionStyle}>
          <NavLink
            style={linkStyle}
            className="nav-link"
            activeClassName="nav-link-active"
            to="/registrationUser"
          >
            <div style={{ width: '100%', textAlign: 'center' }}>
              <img
                style={{ width: '25%' }}
                src={addEmployee}
                alt="Add Employee"
              />
            </div>
            Add Employee
          </NavLink>
        </div>
        <div className="navBarLinkBox" style={optionStyle}>
          <NavLink
            style={linkStyle}
            className="nav-link"
            activeClassName="nav-link-active"
            to={{ userType: 'employee', pathname: '/employee' }}
          >
            <div style={{ width: '100%', textAlign: 'center' }}>
              <img style={{ width: '25%' }} src={employees} alt="Track" />
            </div>
            Employees
          </NavLink>
        </div>
      </div>
      <div className="navBarLinkBox">
        <NavLink
          className="nav-link"
          activeClassName="nav-link-active"
          to="/registrationCustomer"
        >
          <div style={{ width: '100%', textAlign: 'center' }}>
            <img
              style={{ width: '25%' }}
              src={addCustomer}
              alt="Add Employee"
            />
          </div>
          Add Customer
        </NavLink>
      </div>

      <div className="navBarLinkBox">
        <NavLink
          className="nav-link"
          activeClassName="nav-link-active"
          to={{ userType: 'customer', pathname: '/customer' }}
        >
          <div style={{ width: '100%', textAlign: 'center' }}>
            <img style={{ width: '60%' }} src={customers} alt="Track" />
          </div>
          Customers
        </NavLink>
      </div>
      <div className="navBarLinkBox">
        <NavLink
          className="nav-link"
          activeClassName="nav-link-active"
          exact
          to="/profile"
        >
          <div style={{ width: '100%', textAlign: 'center' }}>
            <img style={{ width: '25%' }} src={more} alt="Profile Option" />
          </div>
          Profile
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
