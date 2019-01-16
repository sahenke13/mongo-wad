import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>

        <Navbar color="dark" light expand="sm" class="text-white">
        <div className="container">
          <NavbarBrand href="/" className="text-white">[word]:[wad]</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/" className="text-white">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/BrowseStories" className="text-white">Browse Stories</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/CreateStory" className="text-white">Create New Story</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          </div>
        </Navbar>

        </div>

    );
  }
}
