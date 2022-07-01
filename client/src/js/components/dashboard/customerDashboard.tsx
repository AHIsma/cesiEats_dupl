import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
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
import { Link } from "react-router-dom";
import "./customerDashboard.scss";
import CustomerService from "../../services/customerService";
import RestaurantService from "../../services/restaurantService";
import SearchService from "../../services/searchService";
import NavBar from "../navBar/navBar";

export const CustomerDashboard = (props :any) => {
	const customerId = cookie.load("customerId");
	const profileLink = `/profile/${customerId}`;
	const favoritesLink = `/favorites/${customerId}`;
	const pastOrdersLink = `/viewOrders/${customerId}`;
	const navigate = useNavigate();
	console.log(cookie.loadAll())
	if (!cookie.load("customerId")) {
		console.log("No user cookie!");
		navigate("/customer/signin");
	} else {
		console.log("All good on the cookie front!");
	}

	const [restaurants, setRestaurants] = useState<any[]>([]);
	const [displayRestaurants, setDisplayRestaurants] = useState<any[]>([])
	const [searchedRestaurants, setSearchedRestaurants] = useState<any[]>([])
	const [location, setLocation] = useState<string>("")

	const [searchInput, setSearchInput] = useState("");

	const [vegState, setVegState] = useState(false);
	const [nonVegState, setNonVegState] = useState(false);
	const [veganState, setVeganState] = useState(false);
	const [pickupState, setPickupState] = useState(false);
	const [deliveryState, setDeliveryState] = useState(false);

	const componentIsMounted = useRef(true);

	useEffect(() => {
		NavBar.setLogged({
			logged: true,
			location: location
		});
	}, [location]);

	const fetchRestaurants = async () => {
		const currLocation = await fetchCustomerLocation();
		console.log("Fetched location => ", currLocation);
		setLocation(currLocation);
		console.log("About to fetch restaurants");
		try {
			console.log(currLocation)
			const response = await RestaurantService.getRestaurants(currLocation);
			console.log(response);
			setRestaurants(response.data.answer);
			setDisplayRestaurants(response.data.answer);
			setSearchedRestaurants(response.data.answer);
			restaurants.map((item) => console.log(JSON.stringify(item)));
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchRestaurants();
	}, []);

	const fetchCustomerLocation = async () => {
		console.log("About to fetch customer location");
		try {
			console.log("CUST ID ", customerId);
			const response = await CustomerService.getCustomer(customerId);
			console.log(response.data.answer.city);
			setLocation(response.data.answer.city);
			return response.data.answer.city;
		} catch (err) {
			console.log(err);
			console.log("Could not fetch customer location");
		}
	};

	const filteringHandler = (filters :any) => {
		let temp :any[] = [];
		console.log("incoming filters => ", filters);
		searchedRestaurants.map((r) => console.log(JSON.stringify(r)));
		if (
			filters.veg === true ||
			filters.nonVeg === true ||
			filters.vegan === true 
		) {
			for (const r of searchedRestaurants) {
				if (
					(r.veg && filters.veg) ||
					(r.nonVeg! && filters.nonVeg) ||
					(r.vegan! && filters.vegan) 
				) {
					console.log("Pushing ", r.name);
					temp.push(r);
					setDisplayRestaurants(temp);
				}
			}
		} else {
			temp = restaurants;
			setDisplayRestaurants(temp);
			window.location.reload();
		}
	};

	const vegSelectHandler = async () => {
		const temp = document.getElementById("veg") || new HTMLSpanElement;
		let payload = {
			veg: vegState,
			nonVeg: nonVegState,
			vegan: veganState,
			pickupState: pickupState,
			deliveryState: deliveryState,
		};
		if (temp != null && temp.style.backgroundColor === "white") {
			temp.style.backgroundColor = "black";
			temp.style.color = "white";
			temp.style.border = "black";
			setVegState(true);
			payload = { ...payload, veg: !vegState };
			console.log(payload);
			filteringHandler(payload);
			console.log("Added veg filter");
		} else if (temp != null) {
			temp.style.backgroundColor = "white";
			temp.style.color = "black";
			temp.style.border = "black";
			setVegState(false);
			payload = { ...payload, veg: !vegState };
			console.log(payload);
			filteringHandler(payload);
			console.log("Remove veg filter");
		}
	};

	const nonVegSelectHandler = (e :any) => {
		const temp = document.getElementById("nonVeg") || new HTMLSpanElement;
		let payload = {
			veg: vegState,
			nonVeg: nonVegState,
			vegan: veganState,
			pickupState: pickupState,
			deliveryState: deliveryState,
		};
		if (temp.style.backgroundColor === "white") {
			temp.style.backgroundColor = "black";
			temp.style.color = "white";
			temp.style.border = "black";
			setNonVegState(true);
			payload = { ...payload, nonVeg: !nonVegState };
			console.log(payload);
			filteringHandler(payload);
			console.log("Add nonVeg filter");
		} else {
			temp.style.backgroundColor = "white";
			temp.style.color = "black";
			temp.style.border = "black";
			setNonVegState(false);
			payload = { ...payload, nonVeg: !nonVegState };
			console.log(payload);
			filteringHandler(payload);
			console.log("Remove nonVeg filter");
		}
	};

	const veganSelectHandler = (e :any) => {
		const temp = document.getElementById("vegan") || new HTMLSpanElement;
		let payload = {
			veg: vegState,
			nonVeg: nonVegState,
			vegan: veganState,
			pickupState: pickupState,
			deliveryState: deliveryState,
		};
		if (temp.style.backgroundColor === "white") {
			temp.style.backgroundColor = "black";
			temp.style.color = "white";
			temp.style.border = "black";
			setVeganState(true);
			payload = { ...payload, vegan: !veganState };
			console.log(payload);
			filteringHandler(payload);
			console.log("Add vegan filter");
		} else {
			temp.style.backgroundColor = "white";
			temp.style.color = "black";
			temp.style.border = "black";
			setVeganState(false);
			payload = { ...payload, vegan: !veganState };
			console.log(payload);
			filteringHandler(payload);
			console.log("Remove vegan filter");
		}
	};

	const pickupSelectHandler = (e :any) => {
		const pickupBtn = document.getElementById("pickup") || new HTMLSpanElement;
		const deliveryBtn = document.getElementById('delivery') as HTMLButtonElement;

		let payload = {
			veg: vegState,
			nonVeg: nonVegState,
			vegan: veganState,
			pickupState: pickupState,
			deliveryState: deliveryState,
		};

		if (pickupBtn.style.backgroundColor === "white") {
			pickupBtn.style.backgroundColor = "black";
			pickupBtn.style.color = "white";
			pickupBtn.style.border = "black";
			deliveryBtn.disabled = true;
			payload = { ...payload, pickupState: !pickupState };
			setPickupState(true);
			console.log(payload);
			filteringHandler(payload);
			console.log("Add pickup filter");
		} else {
			pickupBtn.style.backgroundColor = "white";
			pickupBtn.style.color = "black";
			pickupBtn.style.border = "black";
			deliveryBtn.disabled = false;
			setPickupState(false);
			console.log(payload);
			filteringHandler({ ...payload, pickupState: !pickupState });
			console.log("Remove pickup filter");
		}
	};

	const deliverySelectHandler = (e :any) => {
		const deliveryBtn = document.getElementById("delivery") as HTMLButtonElement || new HTMLSpanElement;
		let payload = {
			veg: vegState,
			nonVeg: nonVegState,
			vegan: veganState,
			pickupState: pickupState,
			deliveryState: deliveryState,
		};

		if (deliveryBtn.style.backgroundColor === "white") {
			deliveryBtn.style.backgroundColor = "black";
			deliveryBtn.style.color = "white";
			deliveryBtn.style.border = "black";
			deliveryBtn.disabled = true;
			payload = { ...payload, deliveryState: !deliveryState };
			setDeliveryState(true);
			console.log(payload);
			filteringHandler(payload);
			console.log("Add delivery filter");
		} else {
			deliveryBtn.style.backgroundColor = "white";
			deliveryBtn.style.color = "black";
			deliveryBtn.style.border = "black";
			deliveryBtn.disabled = false;
			setDeliveryState(false);
			console.log(payload);
			filteringHandler({ ...payload, deliveryState: !deliveryState });
			console.log("Remove delivery filter");
		}
	};

	const searchHandler = async (e :any) => {
		try {
			const res = await SearchService.getSearched({"searchString": searchInput});
			console.log(res.data);
			setSearchedRestaurants(res.data);
			setDisplayRestaurants(res.data);
		} catch (err) {
			console.error(err);
		}
	};

	const resetHandler = () => {
		fetchRestaurants();
		window.location.reload();
	};

	// const addToFavorite = (restaurantId) => async (e :any) => {
	// 	const payload = {
	// 		restaurantId: restaurantId,
	// 		customerId: customerId,
	// 	};
	// 	console.log(JSON.stringify(payload));
	// 	try {
	// 		const res = await Axios.post(
	// 			`http://${awsServer}/add-favorite`,
	// 			payload
	// 		);
	// 		console.log("Successfully added to favorites ", res.data);
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };

	const displayRestaurantsList = displayRestaurants.map((resto) => (
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
						<Card.Text>
							<h6>
								Open from: {resto.opensAt} to {resto.closesAt}
							</h6>
						</Card.Text>
						<Card.Text>
							<h5>{resto.city}</h5>
						</Card.Text>
					</Row>
				</Card.Body>
				<Card.Footer style={{ height: "15vh" }}>
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
						<Col>
							<Button
								variant="primary"
								size="sm"
								style={{
									backgroundColor: "black",
									border: "black",
								}}
								// onClick={addToFavorite(resto._id)}
							>
								Add to favorite
							</Button>
						</Col>
					</Row>
				</Card.Footer>
			</Card>
		</Col>
	));

	return (
		<Container
			fluid
			className="p-0"
			style={{ backgroundColor: "whitesmoke"}}
		>
			<Row className="p-2 w-100 justify-content-center">
				<Nav className="d-flex flex-row justify-content-center w-50 p-0 h-100">
					<Nav.Link href={profileLink} className="btn mx-4 m-auto" style={{ backgroundColor: "#139CA8", color: "white" }}>
						Profile
					</Nav.Link>
					<Nav.Link href={favoritesLink} className="btn mx-4 m-auto" style={{ backgroundColor: "#139CA8", color: "white" }}>
						Favorites
					</Nav.Link>
					<Nav.Link href={pastOrdersLink} className="btn mx-4 m-auto" style={{ backgroundColor: "#139CA8", color: "white" }}>
						Your orders
					</Nav.Link>
				</Nav>
			</Row>

			<Row className="d-flex justify-content-center">
			<Form className="w-50 d-flex justify-content-center">
					<Col className="" md={6}>
						<FormControl
							placeholder="Search here..."
							onChange={(e :any) => {
								setSearchInput(e.target.value);
							}}
						/>
					</Col>

					<Col>
						<Button
							onClick={searchHandler}
							className="mx-3 px-2"
							style={{
								backgroundColor: "#139CA8",
								border: "black",
								color: "white",
							}}
						>
							Search
						</Button>
						<Button
							onClick={resetHandler}
							className="mx-3 px-3"
							style={{
								backgroundColor: "#139CA8",
								border: "black",
								color: "white",
							}}
						>
							Reset
						</Button>
					</Col>
			</Form>
			</Row>

			<Container className="py-2"
			>
				<ButtonGroup className="row w-100 d-flex flex-row">
					<Button className="col-sm-1 mx-2 btn br-3"
						style={{
							backgroundColor: "#0D6D75",
						}}
						id="veg"
						onClick={vegSelectHandler}
					>
						Veg
					</Button>
					<Button className="col-sm-1 mx-2 btn br-3" style={{
							backgroundColor: "#0D6D75", border: "black"
						}}
						id="nonVeg"
						onClick={nonVegSelectHandler}
					>
						Non-veg
					</Button>
					<Button className="col-sm-1 mx-2 btn br-3" style={{
							backgroundColor: "#0D6D75", border: "black"
						}}
						id="vegan"
						onClick={veganSelectHandler}
					>
						Vegan
					</Button>

					<Button className="col-sm-1 mx-2 btn br-3" style={{
							backgroundColor: "#0D6D75", border: "black"
						}}
						id="pickup"
						onClick={pickupSelectHandler}
					>
						Pick-up
					</Button>

					<Button className="col-sm-1 mx-2 btn br-3" style={{
							backgroundColor: "#0D6D75", border: "black"
						}}
						id="delivery"
						onClick={deliverySelectHandler}
					>
						Delivery
					</Button>
				</ButtonGroup>
			</Container>

			<Container
				style={{
					width: "70rem",
					height: "200rem",
				}}
			>
				<Row>{displayRestaurantsList}</Row>
			</Container>
		</Container>
	)
};
