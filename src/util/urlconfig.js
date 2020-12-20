let url_data = "";
fetch(`${process.env.PUBLIC_URL}/URL_API.json`)
  .then(r => r.json())
  .then(data => {
    console.log("อ่าน file", data);
  });

console.log(process.env.REACT_APP_URL_API);
export const urlapi =
  process.env.NODE_ENV === "development"
    ? `http://localhost:53047/`
    : process.env.REACT_APP_URL_API;
console.log("url API data=>", url_data);

export const apiParking = "http://www.psspark.com/";
