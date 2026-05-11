import { NavLink } from "react-router";

export function Navbar() {
  return (
    <nav id="navbar">
      <span className="Projects">
        <NavLink to="/">Projects</NavLink>
      </span>
      <span className="photography">
        <NavLink to="/photography">Photography</NavLink>
      </span>
      <span className="about">
        <NavLink to="/about">About</NavLink>
      </span>
    </nav>
  );
}
