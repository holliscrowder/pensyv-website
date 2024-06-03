import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar({user, isLoggedIn}) {


    return isLoggedIn ?     
        <nav className="navbar">
            <NavLink to="/" className="nav-link">
                Home
            </NavLink>
            <NavLink to="/survey" className="nav-link">
                Survey
            </NavLink>
            <NavLink to="profile" className="nav-link">
                Profile
            </NavLink>
            <NavLink to="/leave" className="nav-link">
                Leave
            </NavLink>
        </nav>
        :
        <nav className="navbar">
            <NavLink to="/" className="nav-link">
                Home
            </NavLink>
            <NavLink to="/signup" className="nav-link">
                Signup
            </NavLink>
            <NavLink to="/login" className="nav-link">
                Login
            </NavLink>
        </nav> 
    ;
}

export default NavBar;
