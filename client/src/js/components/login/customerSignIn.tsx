import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	FormLabel,
	FormControl,
	FormGroup,
} from "react-bootstrap";
import LoginService from "../../services/loginService";
import "./customerLogin.scss";

export const CustomerSignIn = (props :any) => {
	const navigate = useNavigate();

	const [emailId, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const loginToAccount = async (e :any) => {
		e.preventDefault();

		const payload = {
			email: emailId,
			password: password,
		};

		console.log("Created payload! => ", JSON.stringify(payload));
		try {
			const response = await LoginService.signIn(payload);
			console.log(response);
			console.log("Successfully login");

			navigate("/customer/dashboard");
		} catch (err) {
			console.error("Error when logging in the customer => ", err);
			setMessage("Invalid credentials!");
		}
	};

	return (
		<Container fluid className="container 	">
			<Row className="d-flex justify-content-center text-center w-100 m-auto">
				<Col className="col-md-3">
					<h1 className="text">Login to eat with cesiEats</h1>
				</Col>
			</Row>

			<Row className="d-flex justify-content-center text-center m-auto">
				<Col className="col-md-3">
					<Form onSubmit={(e) => loginToAccount(e)}>
						<FormGroup className="mb-3">
							<FormLabel className="labels">Email ID: </FormLabel>
							<FormControl
								type="email"
								name="emailId"
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								required
							/>
						</FormGroup>

						<FormGroup className="mb-3">
							<FormLabel className="labels">Password: </FormLabel>
							<FormControl
								type="password"
								name="password"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								required
							/>
						</FormGroup>

						<FormGroup className="col">
							<Row>
								<Col className="p-0">
									<Button
										variant="primary"
										type="submit"
										style={{
											color: "white",
											backgroundColor: "black",
											border: "black",
										}}
									>
										Submit
									</Button>
								</Col>
								<Col className="p-0">
									<Button
										variant="primary"
										style={{
											color: "white",
											backgroundColor: "black",
											border: "black",
										}}
									>
										<Link
											to="/customer/signUp"
											className="submit-button"
										>
											New user?
											<br />
											Go to sign up
										</Link>
									</Button>
								</Col>
							</Row>
						</FormGroup>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};