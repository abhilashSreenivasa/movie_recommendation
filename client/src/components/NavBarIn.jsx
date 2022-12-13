import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link,useHistory} from 'react-router-dom'
import {useContext} from 'react'
import MainContext from '../context/MainContext';
import { BsFillCameraReelsFill } from "react-icons/bs";


function NavBarIn() {
    const history=useHistory()
    const {userState,setUserState}=useContext(MainContext)	
  return (
    <>
    
     <Navbar style={{backgroundColor:'rgb(1, 15, 30)'}} variant="dark">
        <Container>
          <div className='camera-icon'><BsFillCameraReelsFill /> </div>
          <Navbar.Brand href=""><div className='app-title'>WatchTime</div></Navbar.Brand> 
          
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home" >home</Nav.Link>
            <Nav.Link as={Link} to="/suggestion" >suggestion</Nav.Link>
            <Nav.Link as={Link} to="/search" >search</Nav.Link>
            <Nav.Link as={Link} to="/favourites">favourites</Nav.Link>
            <Nav.Link as={Link} to="/about" >about</Nav.Link>

            <Button variant="danger" onClick={()=>{
                    localStorage.removeItem('token');
                    localStorage.removeItem('uid');
                    history.push('/login')
            }}>Logout</Button>{' '}           

          </Nav>
          <div className="nav-welcome">Welcome {userState.name}</div>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBarIn;