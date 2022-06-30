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
import "./restaurantLogin.scss";
// import { awsServer } from "../../config/awsIP";

export const RestaurantRegistration = (props :any) => {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [street, setStreet] = useState("");
    const [streetno, setStreetNo] = useState("");
    const [emailId, setEmail] = useState("");
    const [password, setPassword] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zipcode, setZipcode] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [Phone, setPhone] = useState("");





	const createAccount = async (e :any) => {
		e.preventDefault();
		const payload = {
			firstName: name,
            street: street,
            streetno: streetno,
			emailId: emailId,
			password: password,
            city: city,
            state: state,
            zipCode: zipcode,
			phone: String(Phone),
			country: "United States",
			type: "default",
            imageURL: imageURL,
		};
		console.log("Created payload!");
		try {
			await LoginService.create(payload);
			console.log("Successfully registered");
			navigate("/welcome");
		} catch (err) {
			console.error("Error when registering new restaurant => ", err);
		}
	};

	return (
		<Container fluid className="container 	">
			<Row className="d-flex justify-content-center text-center w-50 m-auto">
				<Col className="col-md-3">
					<h4 className="text">Restaurant Registration</h4>
				</Col>
			</Row>
			<Row className="d-flex justify-content-center h-25 rowWrapper">
				<Col className="col-sm-4">
					<Form onSubmit={createAccount} className="p2">
						<FormGroup className="mt-3">
							<FormLabel> Name: </FormLabel>
							<FormControl
								type="text"
								name="Name"
								onChange={(e) => {
									setName(e.target.value);
								}}
								placeholder="eg. McDonald's"
								required
							/>
						</FormGroup>

						<FormGroup className="mt-3">
							<FormLabel> Number: </FormLabel>
							<FormControl
								type="tel"
								name="mobileNumber"
								onChange={(e) => {
									setPhone(e.target.value);
								}}
								placeholder="XXX-XXX-XXXX"
								required
							/>
						</FormGroup>

						<FormGroup className="mt-3">
							<FormLabel> Street: </FormLabel>
							<FormControl
								type="text"
								placeholder="eg.Main St"
								onChange={(e) => {
									setStreet(e.target.value);
								}}
							/>
						</FormGroup>

                        <FormGroup className="mt-3">
							<FormLabel> No Street: </FormLabel>
							<FormControl
								type="text"
								placeholder="eg. 1234"
								onChange={(e) => {
									setStreetNo(e.target.value);
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
							<FormLabel>Image </FormLabel>
							<FormControl
								type="text"
								placeholder="eg. Image from google"
								onChange={(e) => {
									setImageURL(e.target.value);
								}}
							/>
						</FormGroup>

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
											to="restaurantSignin"
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
