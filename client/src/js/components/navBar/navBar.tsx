import React from 'react';
import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./navBar.scss";

export const NavBar = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/welcome')
		
	}

  	return (
  	  	<Navbar className="navbarContainer">
			<Container>
				<Navbar.Brand onClick={handleClick} href="/welcome">
					<img
						src="./Logo.png"
						className="d-flex align-top icon"
						alt="cesiEats logo"
					/>
				</Navbar.Brand>
			</Container>
		</Navbar>
  	);
};
export default NavBar;
