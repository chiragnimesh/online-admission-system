import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllUniversity } from "../Services/UniversityService";
import { NavLink } from "react-router-dom";
import { faUserCircle, faSearch } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigator = useNavigate();
  const [university, setUniversity] = useState([]);

  useEffect(() => {
    getAllUniversity()
      .then((response) => {
        setUniversity(response.data);
        console.log(university);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleGetUniversity(universityId) {
    navigator(`/Colleges/${universityId}`);
  }
  function handleAbout() {
    navigator(`/about`);
  }

  function handleContact() {
    navigator(`/contact`);
  }
  function handleAdminDarshboard() {
    navigator(`/admindashboard`);
  }

  function handleProgram() {
    navigator(`/admin`);
  }

  function handleDarshboard() {
    navigator(`/dashboard`);
  }

  function handleSearch(e) {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setErrorMessage("Search term cannot be empty");
    } else {
      setErrorMessage("");

      navigator(`/college-detail/${searchTerm}`);
    }
  }
  return (
    <div className="header">
      <Navbar className="navbar" variant="white" expand="lg">
        <NavLink to="/" className="nav-link">
          <Navbar.Brand style={{ marginLeft: "20px" }}>
            <FontAwesomeIcon icon={faHome} />
          </Navbar.Brand>
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="University" id="basic-nav-dropdown">
              {university.map((uni) => (
                <NavDropdown.Item
                  key={uni.universityId}
                  onClick={() => handleGetUniversity(uni.universityId)}
                >
                  {uni.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
            <Nav.Link onClick={handleAbout}>About</Nav.Link>
            <Nav.Link onClick={handleContact}>Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <div ref={searchRef} className="search-container">
          {!searchOpen && (
            <FontAwesomeIcon
              icon={faSearch}
              className="search-icon"
              onClick={toggleSearch}
            />
          )}
          {searchOpen && (
            <form className="form-inline mr-4">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                onClick={handleSearch}
              >
                Search
              </button>
            </form>
          )}

          <Navbar.Collapse className="justify-content-end mr-4">
            <Navbar.Text>
              Signed in as: <a href="#login">Chirag</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </div>

        <ul className="navbar-nav profile">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="profileDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faUserCircle} size="lg" />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="profileDropdown"
            >
              <a className="dropdown-item" onClick={handleDarshboard}>
                Student Dashboard
              </a>
              <a className="dropdown-item" onClick={handleAdminDarshboard}>
                Admin Dashboard
              </a>

              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                Logout
              </a>
            </div>
          </li>
        </ul>

       
      </Navbar>
    </div>
  );
}

export default Header;
