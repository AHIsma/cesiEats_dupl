import React, { useRef, useState, useEffect } from "react";
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
	Card,
} from "react-bootstrap";
import { Link} from "react-router-dom";
import CustomerService from "../../services/customerService";
import OrderService from "../../services/orderService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CustomerProfile = ( ) => {
    const customerId = cookie.load("customerId");
    const [customer, setCustomer] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        street: "",
        streetNo: "",
        city: "",
        zipcode: "",
        country: "",
        password: ""
    });
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
	const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [phone, setPhone] = useState("");
	const [street, setStreet] = useState("");
    const [streetNo, setStreetNo] = useState("");
    const [zipcode, setZipcode] = useState("");
	const [country, setCountry] = useState("");
    

	useEffect(() => {
		// each useEffect can return a cleanup function
            fetchProfile().then((data) => {
                setCustomer(data)
            });
	}, []);

    const fetchProfile = async () => {
		console.log("About to fetch profile");
		try {
			const response = await CustomerService.getCustomer(customerId);
            return response.data.answer;
		} catch (err) {
			console.error(err);
		}
	};

    const updateProfile = async(e :any) => {
        e.preventDefault();

        const payload = {
            email: email,
            phone: phone,
            street: street,
            streetNo: streetNo,
            city: city,
            zipcode: zipcode,
            country: country,
            password: password
		};

        // filter blank strings to prevent sending junk data
        const filteredPayload = Object.fromEntries(Object.entries(payload).filter(([_, v]) => v != ""));

		console.log("Created payload! => ", JSON.stringify(filteredPayload));
		try {
			toast.promise(
                CustomerService.updateCustomer(customerId, filteredPayload),
                {
                    pending: {
                        render(){
                            return "Updating profile...";
                        },
                        icon: false
                    },
                    success: {
                        render() {
                            return "Profile updated successfully!";
                        },  icon: "🟢",
                    },
                    error: {
                        render() {
                            return "Error updating profile...";
                            }
                    },
                }
            )
        
		} catch (err) {
			toast.error('An error occurred while updating profile');
		}
    }


    return(
        <Container fluid>
            <Row className="d-flex justify-content-center text-center m-auto">
				<Col className="col-md-3">
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <img src={require('./avatar.png')} width="45%"></img>
                                    <Card.Title>{customer.firstName} {customer.lastName}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">My Account</Card.Subtitle>
                                </Col>
                                <Col>
                                    <Form onSubmit={(e) => updateProfile(e)}>
                                            <Col>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control name="email" type="email" placeholder={customer.email} 
                                                onChange={(e) => {
									                setEmail(e.target.value);
								                }} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control name="password" type="password" placeholder="Password"
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                }}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicStreet">
                                                <Form.Label>Street</Form.Label>
                                                <Form.Control name="street" type="text" placeholder={customer.street}
                                                onChange={(e) => {
                                                    setStreet(e.target.value);
                                                }} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicStreetNr">
                                                <Form.Label>Street Nr.</Form.Label>
                                                <Form.Control name="streetNo" type="text" placeholder={customer.streetNo}
                                                onChange={(e) => {
									                setStreetNo(e.target.value);
								                }} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicCity">
                                                <Form.Label>City</Form.Label>
                                                <Form.Control name="city" type="text" placeholder={customer.city} 
                                                onChange={(e) => {
									                setCity(e.target.value);
								                }}/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicCountry">
                                                <Form.Label>Country</Form.Label>
                                                <Form.Control name="country" type="text" placeholder={customer.country}
                                                onChange={(e) => {
                                                    setCountry(e.target.value);
                                                }}/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicZipcode">
                                                <Form.Label>Zipcode</Form.Label>
                                                <Form.Control name="zipcode" type="text" placeholder={customer.zipcode}
                                                onChange={(e) => {
                                                    setZipcode(e.target.value);
                                                }}/>
                                            </Form.Group>
                                        </Col>
                                        
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <ToastContainer />
    </Container>
    )
}