import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// images
import Logo from '../../assets/images/logo.png';

const Home = () => {
  return (
    <div className='shadow'>
      <div className='bg-dark text-center py-3'>
        <span className='text-white'>Your fashion partner</span>
      </div>
      {/* navbar */}
      <div className="container">
        <Navbar expand="lg" >
          <Navbar.Brand href="#">
            <img src={Logo} alt="logo" width={170} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Mens</Nav.Link>
              <Nav.Link href="#action2">Womens</Nav.Link>
              <Nav.Link href="#action2">Kids</Nav.Link>
            
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </div>

    </div>
  )
}

export default Home