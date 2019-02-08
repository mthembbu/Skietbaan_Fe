import React, { Component } from 'react';
import { Navbar,
         NavDropdown,
         Form,
         Nav
         } from 'react-bootstrap';

 class NavbarMenu extends Component {
    render() {
        // rendering the basic navbar within the render class
        return (
            <div> {/** The default navigation menu */}
<Navbar bg="light" expand="lg" >
  <Navbar.Brand href="#home">SKIETBAAN APP</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/home">Leader Board</Nav.Link>
      <Nav.Link href="/Scores">Score Capture</Nav.Link>
      <Nav.Link href="/login">Notifications</Nav.Link>
      <Nav.Link href="/login">Documents</Nav.Link>
    </Nav>
    <Form inline>
      <NavDropdown title="Username" id="basic-nav-dropdown" variant="outline-dark">
        <NavDropdown.Item href="/login">Awards</NavDropdown.Item>
        <NavDropdown.Item href="/login">Statistics</NavDropdown.Item>
        <NavDropdown.Item href="/login">Settings</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/login">Sign In</NavDropdown.Item>
      </NavDropdown>
    </Form>
  </Navbar.Collapse>
</Navbar>
            </div>

                )
            }
        
        }      
export default NavbarMenu;