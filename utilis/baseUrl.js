const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://<your-new-app-name>.herokuapp.com"
    : "http://localhost:3000";

export default baseUrl;
