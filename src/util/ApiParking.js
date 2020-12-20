import axios from "axios";
import { apiParking } from "./urlconfig";

export default axios.create({
  baseURL: `${apiParking}`,

  withCredentials: false,
  headers: {
    "Content-Type": "application/json"
  }
});
