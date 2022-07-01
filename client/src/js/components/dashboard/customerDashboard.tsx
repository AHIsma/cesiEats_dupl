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
import { TempleBuddhist } from "@mui/icons-material";
import { css } from "@emotion/react";

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

	const [filterState, setFilterState] = useState<any>();

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

	const filteringHandler = (filter :any, bool: boolean) => {
		let temp :any[] = [];
		searchedRestaurants.map((r) => console.log(JSON.stringify(r)));
		temp = restaurants.filter((s) => {return s.category == filter})
		console.log(temp)
		if (
			temp.length && bool
		) {
			setDisplayRestaurants(temp); 
		} else if (temp.length == 0 && filterState == filter) {
			temp = restaurants;
			setDisplayRestaurants(temp);
		}
	};

	const filterHandler = (filtername: any) => {
		let temp
		let payload = [
			"italien",
			"chinois",
			"kebab",
			"koreen",
			"libanais"
		];

		if (filterState == filtername) {
			payload.map((p) => {
				let temp = document.getElementById(p) || new HTMLSpanElement;
				temp.style.backgroundColor = "#0D6D75",
				temp.style.border = "black";
				temp.style.color = "white";
				setFilterState(null);
				setDisplayRestaurants(restaurants);
			})
			return;
		}

		payload.map((p) => {
			let temp = document.getElementById(p) || new HTMLSpanElement;
			
			if (p == filtername) {
				temp.style.backgroundColor = "black";
				temp.style.color = "white";
				temp.style.border = "black";
				setFilterState(p);
				filteringHandler(p, true)
			} else {
				temp.style.backgroundColor = "white";
				temp.style.color = "black";
				temp.style.border = "black";
				filteringHandler(p, false)
			}

		})
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
					src={resto.dishes[0].imageLink}
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
								Open from: {resto.schedule.monday.slice(0,4)} to {resto.schedule.monday.slice(4,1)}
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
							disabled
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
							// onClick={resetHandler}
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
						id="italien"
						onClick={() => {filterHandler("italien")}}
					>
						Italien
					</Button>
					<Button className="col-sm-1 mx-2 btn br-3" style={{
							backgroundColor: "#0D6D75", border: "black"
						}}
						id="chinois"
						onClick={() => {filterHandler("chinois")}}
					>
						Chinois
					</Button>
					<Button className="col-sm-1 mx-2 btn br-3" style={{
							backgroundColor: "#0D6D75", border: "black"
						}}
						id="kebab"
						onClick={() => {filterHandler("kebab")}}
					>
						Kebab
					</Button>

					<Button className="col-sm-1 mx-2 btn br-3" style={{
							backgroundColor: "#0D6D75", border: "black"
						}}
						id="libanais"
						onClick={() => {filterHandler("libanais")}}
					>
						Libanais
					</Button>

					<Button className="col-sm-1 mx-2 btn br-3" style={{
							backgroundColor: "#0D6D75", border: "black"
						}}
						id="koreen"
						onClick={() => {filterHandler("koreen")}}
					>
						Koréen
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
