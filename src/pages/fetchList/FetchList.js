import React, { useEffect, useState } from "react";
import { Map, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "../../../src/App.css"




const FetchList = () => {

  const [clubes, setClubes] = useState(null);

  useEffect(() => {
    getClubes();
  }, [])

  const getClubes = async () => {
    const url = "http://localhost:3000/clubes";
    let infoData = await fetch(url, {
      method: "GET"
    });
    let data = await infoData.json();


    console.log(infoData);
    if (data && data.status === "success") {
      setClubes(data.data);
      console.log(data.data);
    }

  }

  return (

      <>
        <MapContainer center={[-29.4142176, -66.8907967]} zoom={13}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

        {
          clubes && clubes.length > 0 && clubes.map((item) => {
          const [latitude, longitude] = item.coordinates[0].split(",").map(Number);
          return (
              <Marker position={[latitude, longitude]} key={item._id} >
                <Popup>
                  <b>{item.name}</b><br />
                  Rating: {item.rating}
                  <h4>Addess: {item.address}</h4>
                </Popup>
              </Marker>
            )
        })}

        </MapContainer>


      </>


    );
  };

  export default FetchList;