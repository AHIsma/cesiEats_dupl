import React, { useState } from "react";
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	FormLabel,
	FormControl,
	FormGroup,
	Navbar,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import LoginService from "../../services/loginService";
import "./customerLogin.scss";
// import { awsServer } from "../../config/awsIP";

export const CustomerRegistration = (props :any) => {
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("mm-dd-yyyy");
	const [mobileNumber, setMobileNumber] = useState("");
	const [street, setStreet] = useState("");
	const [apt, setApt] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zipcode, setZipcode] = useState("");
	const [emailId, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const createAccount = async (e :any) => {
		e.preventDefault();
		console.log("Before ", dateOfBirth);
		const dob = new Date(dateOfBirth);
		console.log("After ", dob);
		const payload = {
			firstName: firstName,
			lastName: lastName,
			email: emailId,
			role: "client",
			password: password,
			dob: dob,
			phone: String(mobileNumber),
			street: street,
			streetNo: apt,
			city: city, 
			zipcode: zipcode,
			state: state,
			country: "United States",
			type: "default",
		};
		console.log("Created payload!");
		try {
			await LoginService.createAccount(payload);
			console.log("Successfully registered");
			navigate("/customer/signIn");
		} catch (err) {
			console.error("Error when registering new customer => ", err);
		}
	};

	return (
		<Container fluid className="container 	">
			<Row className="d-flex justify-content-center text-center w-50 m-auto">
				<Col className="col-md-3">
					<h4 className="text">Customer Registration</h4>
				</Col>
			</Row>
			<Row className="d-flex justify-content-center h-25 rowWrapper">
				<Col className="col-sm-4">
					<Form onSubmit={createAccount} className="p2">
						<FormGroup className="mt-3">
							<FormLabel>First Name: </FormLabel>
							<FormControl
								type="text"
								name="firstName"
								onChange={(e) => {
									setFirstName(e.target.value);
								}}
								placeholder="eg. John"
								required
							/>
						</FormGroup>

						<FormGroup className="mt-3">
							<FormLabel>Last Name: </FormLabel>
							<FormControl
								type="text"
								name="lastName"
								onChange={(e) => {
									setLastName(e.target.value);
								}}
								placeholder="eg. Doe"
								required
							/>
						</FormGroup>

						<FormGroup className="mt-3">
							<FormLabel>Date of Birth: </FormLabel>
							<FormControl
								type="date"
								name="dateOfBirth"
								onChange={(e) => {
									setDateOfBirth(e.target.value);
								}}
								required
							/>
						</FormGroup>

						<FormGroup className="mt-3">
							<FormLabel>Mobile Number: </FormLabel>
							<FormControl
								type="tel"
								name="mobileNumber"
								onChange={(e) => {
									setMobileNumber(e.target.value);
								}}
								placeholder="XXX-XXX-XXXX"
								required
							/>
						</FormGroup>

						<FormGroup className="mt-3">
							<FormLabel>Street: </FormLabel>
							<FormControl
								type="text"
								placeholder="eg. 1234 Main St"
								onChange={(e) => {
									setStreet(e.target.value);
								}}
							/>
						</FormGroup>

						<FormGroup className="mt-3">
							<FormLabel>Apartment: </FormLabel>
							<FormControl
								type="text"
								placeholder="eg. Apartment, studio, or floor"
								onChange={(e) => {
									setApt(e.target.value);
								}}
							/>
						</FormGroup>

						<Row>
							<Col>
								<FormGroup className="mt-3">
									<FormLabel>City: </FormLabel>
									<FormControl
										type="text"
										placeholder="eg. San Jose"
										onChange={(e) => {
											setCity(e.target.value);
										}}
									/>
								</FormGroup>
							</Col>
							<Col>
								<FormGroup className="mt-3">
									<FormLabel>State: </FormLabel>
									<FormControl
										type="text"
										placeholder="eg. California"
										onChange={(e) => {
											setState(e.target.value);
										}}
									/>
								</FormGroup>
							</Col>
							<Col>
								<FormGroup className="mt-3">
									<FormLabel>Zipcode: </FormLabel>
									<FormControl
										type="text"
										placeholder="eg. California"
										onChange={(e) => {
											setZipcode(e.target.value);
										}}
									/>
								</FormGroup>
							</Col>
							<Col>
								<FormGroup className="mt-3">
									<FormLabel>Select Country:</FormLabel>
									<FormControl as="select">
										<option value="">United States</option>
										<option value="">Canada</option>
										<option value="">Mexico</option>
									</FormControl>
								</FormGroup>
							</Col>
						</Row>

						<FormGroup className="mt-3">
							<FormLabel>Email ID: </FormLabel>
							<FormControl
								type="email"
								name="emailId"
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								placeholder="XXX-XXX-XXXX"
								required
							/>
						</FormGroup>

						<FormGroup className="mt-3">
							<FormLabel>Password: </FormLabel>
							<FormControl
								type="password"
								name="password"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								required
							/>
						</FormGroup>

						<FormGroup className="mt-3 mb-3">
							<Row>
								<Col>
									<Button
										variant="primary"
										type="submit"
										style={{
											background: "black",
											border: "black",
										}}
									>
										Submit
									</Button>
								</Col>
								<Col>
									<Button
										variant="primary"
										style={{
											background: "black",
											border: "black",
										}}
									>
										<Link
											to="/customer/signIn"
											className="submit-button"
										>
											Go to login
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
