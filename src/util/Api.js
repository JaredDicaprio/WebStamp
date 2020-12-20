import axios from "axios";
import { urlapi } from "./urlconfig";

export default axios.create({
  baseURL: `${urlapi}`,
  headers: {
    "Content-Type": "application/json"
  }
});
