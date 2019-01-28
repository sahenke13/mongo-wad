import React from "react";
import favicon from "./favicon.png";
import "./Header.css"

const Header = () => (
  <div className="navbar fixed-top navbar-dark">
    <div className="container">
      <a href="/" className="navbar-brand">
        <img src={favicon} alt="favicon" className="img-fluid" />
        <span id="brand">[word]:[wad]</span>
      </a>
      <ul className="navbar nav">
        <li className="nav-item">
          <a href="/" className="nav-link text-white">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="/browseStories" className="nav-link text-white">
            Browse Stories
          </a>
        </li>

        <li className="nav-item">
          <a href="/createStory" className="nav-link text-white">
            Create New Story
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default Header;