import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Welcome }  from "../components/dashboard/welcome";
import { CustomerSignup } from "../views/login/customerSignUp";
import { CustomerSignin } from "../views/login/customerSignIn";
import { CustomerDashboard } from "../components/dashboard/customerDashboard";
import { CustomerProfile } from "../components/dashboard/customerProfile";
import NavBar from "../components/navBar/navBar";
// import { RestaurantSignup } from "./RestaurantSignup/RestaurantSignup.page";
// import { RestaurantSignin } from "./Login/RestaurantLogin.page";
// import { RestaurantDetails } from "./Ordering/RestaurantDetails.page";
// import { OrderSummary } from "../components/dashboard/OrderSummary";
// import { RestaurantDashboard } from "../components/dashboard/RestaurantDashboard";
// import { RestaurantProfile } from "../components/Profile/RestaurantProfile";
// import { RestaurantMenu } from "../components/Profile/RestaurantMenu";
// import { EditDish } from "../components/Dish/EditDish";
// import { RestaurantOrders } from "../components/Orders/RestaurantOrders";
// import { CustomerFavorites } from "../components/dashboard/CustomerFavorites";
// import { CustomerOrders } from "../components/Orders/CustomerOrders";

//Main Component for routing all components

export default class Main extends Component {
	render() {
		return (
			<div>
				<NavBar />
				<Routes>
					<Route path="/" element={<Navigate to="/welcome" />} />
					
					<Route path="/welcome" element={<Welcome />} />
					<Route path="/customer/signUp" element={<CustomerSignup />}  />
					<Route path="/customer/signIn" element={<CustomerSignin />}  />
					<Route path="/customer/dashboard" element={<CustomerDashboard />}  />
					<Route path="/customer/profile/:id" element={<CustomerProfile />}  />
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
