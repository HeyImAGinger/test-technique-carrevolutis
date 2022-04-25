import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Main from './Main';
import * as Bootstrap from 'react-bootstrap'



const App = () => {
    return (
        <>
            <div>
                <Bootstrap.Navbar bg="dark" variant="dark">
                    <Bootstrap.Container >
                        <Bootstrap.Navbar.Brand href="/">Navbar</Bootstrap.Navbar.Brand>
                        <Bootstrap.Nav className="me-auto">
                            <NavLink to="/" className={"nav-link"}>Home</NavLink>
                            <NavLink to="/year" className={"nav-link"}>Year</NavLink>
                            <NavLink to="/favorites" className={"nav-link"}>Favorites</NavLink>
                        </Bootstrap.Nav>
                    </Bootstrap.Container>
                </Bootstrap.Navbar>
                <br />
                <Main />
            </div>
        </>
  );
}

export default App;
