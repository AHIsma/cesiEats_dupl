import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Welcome }  from "../components/dashboard/welcome";
import { CustomerSignup } from "../views/login/customerSignUp";
import { CustomerSignin } from "../views/login/customerSignIn";
import NavBar from "../components/navBar/navBar";
//import { RestaurantRegistration } from "../components/login/restaurantRegistration";
import { RestaurantSignup } from "../views/login/restaurantSignup";

// import { RestaurantSignin } from "./Login/RestaurantLogin";
// import { RestaurantDetails } from "./Ordering/RestaurantDetails.page";
// import { OrderSummary } from "../components/dashboard/OrderSummary";
// import { RestaurantDashboard } from "../components/dashboard/RestaurantDashboard";
// import { RestaurantProfile } from "../components/Profile/RestaurantProfile";
// import { RestaurantMenu } from "../components/Profile/RestaurantMenu";
// import { EditDish } from "../components/Dish/EditDish";
// import { RestaurantOrders } from "../components/Orders/RestaurantOrders";
// import { CustomerDashboard } from "../components/dashboard/CustomerDashboard";
// import { CustomerFavorites } from "../components/dashboard/CustomerFavorites";
// import { CustomerOrders } from "../components/Orders/CustomerOrders";
// import { CustomerProfile } from "../components/Profile/CustomerProfile";
//Main Component for routing all components

export default class Main extends Component {
	render() {
		return (
			<div>
				<NavBar />
				<Routes>
					<Route path="/" element={<Navigate to="/welcome" />} />
					
					<Route path="/welcome" element={<Welcome />} />
					<Route path="/customerSignup" element={<CustomerSignup />}  />
					<Route path="/customerSignin" element={<CustomerSignin />}  />
					<Route path="restaurantSignup" element={<RestaurantSignup/>} />
					<Route
            			path="*"
            			element={
            			  <div>
            			    <h2>404 Page not found (component error404 à faire)</h2>
            			  </div>
            			}
					/>
					
				</Routes>
				{/*Render Different Component based on Route*/}
                
				
				{/* <Route
					path="/chooseDish/:restaurantId" component={RestaurantDetails}
				/>
				<Route path="/dashboard" component={CustomerDashboard} />
				<Route
					path="/favorites/:customerId"
					component={CustomerFavorites}
				/>
				<Route
					path="/profile/:customerId"
					component={CustomerProfile}
				/>
				<Route path="/order" component={OrderSummary} />
				<Route
					path="/viewOrders/:customerId"
					component={CustomerOrders}
				/> */}

				{/* <Route path="/restaurantSignup" component={RestaurantSignup} />
				<Route path="/restaurantSignin" component={RestaurantSignin} />
				<Route
					path="/restaurantDashboard"
					component={RestaurantDashboard}
				/>
				<Route
					path="/restaurantProfile"
					component={RestaurantProfile}
				/>
				<Route path="/restaurantMenu" component={RestaurantMenu} />
				<Route path="/orders" component={RestaurantOrders} />
				<Route path="/dishes/edit/:mealId" component={EditDish} /> */}
			</div>
		);
	}
}
