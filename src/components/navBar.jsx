import { Nav,Container, Navbar, Button } from "react-bootstrap";
import { NavLink} from 'react-router-dom'
import UserDropDown from "./UserDropDown";
import { useContext } from "react";
import { ThemeContext } from "../contexts/Theme";
function NavBar(props){

    const {toggleTheme,IsDarkMode}=useContext(ThemeContext)

    const userObj=props.usrObj;
    const activeClass=({ isActive }) => ({
        color: isActive ? '#C0C0C0' : '#545e6f',
        background: isActive ? '#7600dc' : '#C0C0C0',
      })

    return(
      <div>
          <Navbar bg="primary" expand="lg" data-bs-theme="dark" className="justify-content-end">
          <Container>
            <Navbar.Brand>CryptoTrack</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/" style={activeClass}>
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/favourite" style={activeClass}>
                  Favourite
                </Nav.Link>
                <Nav.Link as={NavLink} to="/search" style={activeClass}>
                  Search
                </Nav.Link>
              </Nav>
              <Nav>
                {userObj.id ? (
                  <UserDropDown username={userObj.email} logOut={props.logOut} />
                ) : (
                  <Nav.Link as={NavLink} style={activeClass} to="/register">
                    Register
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <button className={`btn w-100 ${IsDarkMode?'btn-dark':'btn-light'}`} onClick={toggleTheme}> change Theme</button>
      </div>
    )
}
export default NavBar;