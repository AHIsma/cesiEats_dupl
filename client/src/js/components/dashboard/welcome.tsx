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
		    			md={6}
		    			className="rowWrapper"
		    		>
		    			<Card
		    				className="card"
		    			>
		    				<Card.Body>
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

		    					<Row>
		    						<Col>
		    							``
		    							<Button
		    								variant="primary"
		    								onClick={() =>
		    									handleClick("/customerSignin")
		    								}
		    								className="wel-btn"
		    							>
		    								Login.
		    							</Button>
		    						</Col>
		    						<Col>
		    							<Button
		    								variant="primary"
		    								onClick={() =>
		    									handleClick("/customerSignup")
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

		    		<Col
		    			md={6}
		    			className="rowWrapper"
		    		>
		    			<Card
		    				className="card"
		    			>
		    				<Card.Body>
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
		    						<Col>
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
		    						<Col>
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