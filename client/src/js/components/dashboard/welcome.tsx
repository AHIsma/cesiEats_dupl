import React from "react";
import { Container, Navbar, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./welcome.scss";

export const Welcome = () => {
	const navigate = useNavigate();

	const handleClick = (path :any) => {
		navigate(path);
	};

	return (
            <Container fluid>
		    	<Row>
		    	    <Col
		    			className="rowWrapper"
		    		>
		    			<Card
		    				className="card"
		    			>
		    				<Card.Body className="d-flex flex-column align-items-center">
		    					<Card.Title
		    						style={{
		    							color: "white",
		    							textAlign: "center",
		    							fontWeight: "bolder",
		    						}}
		    					>
		    						Order?
		    					</Card.Title>
		    					<Card.Text
		    						style={{ color: "white", textAlign: "center" }}
		    					>
		    						Order breakfast, lunch and dinner.
		    					</Card.Text>

		    					<Row className="w-100">
		    						<Col className="d-flex justify-content-center">
		    							``
		    							<Button
		    								variant="primary"
		    								onClick={() =>
		    									handleClick("/customer/signin")
		    								}
		    							>
		    								Login.
		    							</Button>
		    						</Col>
		    						<Col className="d-flex justify-content-center">
		    							<Button
		    								variant="primary"
		    								onClick={() =>
		    									handleClick("/customer/signup")
		    								}
		    							>
		    								Sign up.
		    							</Button>
		    						</Col>
		    					</Row>
		    				</Card.Body>
		    			</Card>
		    		</Col>
		    	    <Col
		    			className="rowWrapper"
		    		>
		    			<Card
		    				className="card"
		    			>
		    				<Card.Body  className="d-flex flex-column align-items-center">
		    					<Card.Title
		    						style={{
		    							color: "white",
		    							textAlign: "center",
		    							fontWeight: "bolder",
		    						}}
		    					>
		    						Owner?
		    					</Card.Title>
		    					<Card.Text
		    						style={{ color: "white", textAlign: "center" }}
		    					>
		    						Start selling with us, now!
		    					</Card.Text>

		    					<Row className="w-100">
		    						<Col  className="d-flex justify-content-center">
		    							``
		    							<Button
		    								variant="primary"
		    								onClick={() =>
		    									handleClick("/customer/signin")
		    								}
		    							>
		    								Login.
		    							</Button>
		    						</Col>
		    						<Col  className="d-flex justify-content-center">
		    							<Button
		    								variant="primary"
		    								onClick={() =>
		    									handleClick("/customer/signup")
		    								}
		    							>
		    								Sign up.
		    							</Button>
		    						</Col>
		    					</Row>
		    				</Card.Body>
		    			</Card>
		    		</Col>
		    		<Col
		    			className="rowWrapper"
		    		>
		    			<Card
		    				className="card"
		    			>
		    				<Card.Body className="d-flex flex-column align-items-center">
		    					<Card.Title
		    						style={{
		    							color: "white",
		    							textAlign: "center",
		    							fontWeight: "bolder",
		    						}}
		    					>
		    						Deliver?
		    					</Card.Title>
		    					<Card.Text
		    						style={{ color: "white", textAlign: "center" }}
		    					>
		    						Deliver breakfast, lunch and dinner.
		    					</Card.Text>
		    					<Row>
		    						<Col className="d-flex justify-content-center">
		    							<Button
		    								variant="primary"
		    								onClick={() =>
		    									handleClick("/restaurantSignin")
		    								}
		    								className="wel-btn"
		    							>
		    								Login.
		    							</Button>
		    						</Col>
		    						<Col className="d-flex justify-content-center">
		    							<Button
		    								variant="primary"
		    								onClick={() =>
		    									handleClick("/restaurantSignup")
		    								}
		    								className="wel-btn"
		    							>
		    								Sign up.
		    							</Button>
		    						</Col>
		    					</Row>
		    				</Card.Body>
		    			</Card>
		    		</Col>
		    	</Row>
		    </Container>		
	);
};