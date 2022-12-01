import './header.scss';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../../utils/http-utils/user-requests';

export function Header(){

    const loggedUser = getLoggedUser();

    return(
        <div className="header">
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/users-list">Rent A Car</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link className="nav-link" to="/users-list">Users List</Link>
                            <Link className="nav-link" to="/vehicles-list">Vehicles List</Link>
                            <Link className="nav-link" to="/rentals-list">Rentals List</Link>

                            {loggedUser && loggedUser.role === "admin" && 
                                <Link className="nav-link" to="/user/create">Create User</Link>
                            }
                            {loggedUser && loggedUser.role === "admin" && 
                                <Link className="nav-link" to="/vehicle/create">Create Vehicle</Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}