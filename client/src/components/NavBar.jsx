import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'
import { BsFillCameraReelsFill } from "react-icons/bs";



function NavBar() {
  return (
    <>
     
     <Navbar style={{backgroundColor:'rgb(1, 15, 30)'}} variant="dark">
        <Container>
        <div className='camera-icon'><BsFillCameraReelsFill /> </div>
        <Navbar.Brand href=""><div className='app-title'>WatchTime</div></Navbar.Brand> 
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/login" >Login</Nav.Link>
            <Nav.Link as={Link} to="/register" >Register</Nav.Link>
           

          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;