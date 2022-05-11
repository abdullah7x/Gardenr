import { geoKey } from '../firebase2';
import Geocoder from 'react-native-geocoding';

const getLatLong = async (postcode) => {
  let location;
  Geocoder.init(geoKey);

  return Geocoder.from(postcode)
    .then((json) => {
      location = json.results[0].geometry.location;
      console.log(location);
      return location;
    })
    .catch((error) => console.log(error));
};

export default getLatLong;
