import http from "../../http-common";


const getRestaurants = (attrs :any) => {
  return http.get("/restaurants/" + attrs).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        throw(error);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        throw(error);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        throw(error);
      };
    }
  );
};
const getFavoriteRestaurants = (attrs :any) => {
  return http.get("/restaurants/favorites/:id", attrs).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        throw(error);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        throw(error);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        throw(error);
      };
    }
  );
};

const RestaurantService = {
    getRestaurants,
    getFavoriteRestaurants
};
export default RestaurantService;