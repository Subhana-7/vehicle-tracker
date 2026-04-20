import axios from "axios";

const API = import.meta.env.VITE_SERVER_URL;


export const getTrips = async () => {
  const res = await axios.get(`${API}/api/trip/69da65d00c4c7ec9e0a42351`); // adjust endpoint

  const trip = res.data;
  console.log(trip)

  // map to UI format
  return [
    {
      id: 1, // temporary (since backend doesn’t send id)
      name: `Trip - ${trip.distance}m`, // minimal mapping
    },
  ];
};
