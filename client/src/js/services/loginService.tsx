import http from "../../http-common";

const create = (attrs :any) => {
  return http.post("/users/add", attrs).catch(function (error) {
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
const LambdaService = {
  create
};
export default LambdaService;