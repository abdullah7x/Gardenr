import { geoKey } from "../firebase2";
import Geocoder from "react-native-geocoding";

const getLatLong = () => {
  Geocoder.init(geoKey);

  Geocoder.from("b91 3rp")
    .then((json) => {
      var location = json.results[0].geometry.location;
      console.log(location);
    })
    .catch((error) => console.warn(error));
};

export default getLatLong;
