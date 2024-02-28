import axios from "axios";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET, POST, PUT, DELETE, OPTIONS";
axios.defaults.headers.common["Access-Control-Allow-Headers"] =
  "Origin, X-Requested-With, Content-Type, Accept";

export function getSmartCityInfo() {
  return axios.get(
    "http://127.0.0.1:4523/m1/4058084-0-default/api/smartcity/info",
  );
}
export function getSmartCityList() {
  return axios.get(
    "http://127.0.0.1:4523/m1/4058084-0-default/api/smartcity/list",
  );
}
