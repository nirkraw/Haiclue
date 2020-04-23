const ENV =
  process.env.NODE_ENV === "production"
    ? "https://haiclue.herokuapp.com"
    : "http://localhost:5000";
export default ENV;