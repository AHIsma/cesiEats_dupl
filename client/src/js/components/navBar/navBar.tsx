import React, { useState, useEffect, useRef, Component } from 'react';
import { Link } from 'react-admin';
import cookie from "react-cookies";
import { 
	Container,
	Navbar,
	Nav,
	Form,
	FormControl,
	Row,
	Col,
	Button,
	ButtonGroup,
	Card
 } from "react-bootstrap";
import "./navBar.scss";

class NavBar extends Component {

	static state = {
		logged: false,
		location: ""
	}
	
	handleClick = () => {
		window.location.reload();
	}	
	
	static setLogged = (attrs: any) => {
		this.state = attrs
	}	
	
	logoutHandler = () => {	
		cookie.remove("customerLocation")
		cookie.remove("customerId")
	}

	render() {
		return (
			<Navbar className="navbarContainer">
				<Container>
					<Navbar.Brand onClick={this.handleClick}>
						<img
							src="./Logo.png"
							className="d-flex align-top icon"
							alt="cesiEats logo"
						/>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
				{NavBar.state.logged &&
					<Form className="mx-3">
					<ButtonGroup>
						<Button
							style={{
								color: "white",
								backgroundColor: "black",
								border: "black",
							}}
						>
							Location | {NavBar.state.location}
						</Button>
						<Button
							variant="secondary"
							style={{
								color: "white",
								backgroundColor: "black",
								border: "black",
							}}
							onClick={this.logoutHandler}
						>
							<Link to="/welcome">
								Logout
							</Link>
						</Button>
					</ButtonGroup>
					</Form>
				}
				</Container>
			</Navbar>
		)
	};
}
export default NavBar;
