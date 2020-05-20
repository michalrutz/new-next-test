const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://michal-test.herokuapp.com.herokuapp.com"
    : "http://localhost:3000";

export default baseUrl;
