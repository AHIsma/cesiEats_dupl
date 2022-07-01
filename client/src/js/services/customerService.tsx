import http from "../../http-common";

const getCustomer = (attrs :any) => {
  return http.get("/users/"+attrs, attrs).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        alert("Your session has expired. Please log in again.");
        document.location.href = "http://localhost:3000/customer/signin";
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

const getCustomerAdresses = (attrs :any) => {
  return http.get("/users/:id", attrs).catch(function (error) {
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

const updateCustomer = (id: Number, attrs :any) => {
  return http.put("/users/update/" + id, attrs).catch(function (error) {
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
const CustomerService = {
    getCustomer,
    getCustomerAdresses,
    updateCustomer
};
export default CustomerService;