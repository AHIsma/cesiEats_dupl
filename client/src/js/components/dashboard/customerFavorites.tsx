import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Card, Col, Row, Button, Container } from "react-bootstrap";
import RestaurantService from "../../services/restaurantService";
import CustomerService from "../../services/customerService";
import SearchService from "../../services/searchService";

export const CustomerFavorites = (props :any) => {
	const customerId = props.match.params.customerId;
	console.log("Showcasing favorites for customer: ", customerId);

	const navigate =useNavigate();

	if (!cookie.load("customerId")) {
		console.log("No user cookie!");
		navigate("/customerSignin");
	} else {
		console.log("All good on the cookie front!");
	}

	const [restaurants, setRestaurants] = useState<any[]>([]);

	const componentIsMounted = useRef(true);

	useEffect(() => {
		// each useEffect can return a cleanup function
		return () => {
			componentIsMounted.current = false;
		};
	}, []);

	const fetchFavorites = async () => {
		try {
			const response = await RestaurantService.getFavoriteRestaurants(customerId);
			setRestaurants(response.data);
			restaurants.map((item) => console.log(JSON.stringify(item)));
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchFavorites();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const displayRestaurantsList = restaurants.map((resto) => (
		<Col className="ml-3 mt-3" style={{ width: "55rem", height: "500px" }}>
			<Card style={{ width: "18rem", height: "30rem" }}>
				<Card.Img
					variant="top"
					style={{ height: "20vh" }}
					src={resto.profileImgUrl}
				/>
				<Card.Body style={{ height: "10vh" }}>
					<Row>
						<Card.Title>
							<h5>{resto.name}</h5>
						</Card.Title>
					</Row>
					<Row>
						<Col>
							<Card.Text>
								<h6>Opens at: {resto.opensAt} </h6>
							</Card.Text>
						</Col>
						<Col>
							<Card.Text>
								<h6>Closes at: {resto.closesAt}</h6>
							</Card.Text>
						</Col>
						<Card.Text>
							<h5>{resto.city}</h5>
						</Card.Text>
					</Row>
				</Card.Body>
				<Card.Footer style={{ height: "10vh" }}>
					<Row>
						<Col>
							<Link to={`/chooseDish/${resto._id}`}>
								<Button
									variant="primary"
									size="sm"
									style={{
										backgroundColor: "black",
										border: "black",
									}}
								>
									View
								</Button>
							</Link>
						</Col>
					</Row>
				</Card.Footer>
			</Card>
		</Col>
	));

	return (
		<Container fluid style={{ backgroundColor: "whitesmoke" }}>
			<h3
				className="mt-3"
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				Your Favourite Restaurants
			</h3>
			<Container
				style={{
					width: "70rem",
					height: "200rem",
				}}
			>
				<Row>{displayRestaurantsList}</Row>
			</Container>
		</Container>
	);
};
