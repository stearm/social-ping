import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import { DivIcon } from "leaflet";
import * as uuid from "uuid";

const ItalyMap = ({ socketConnection }) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    socketConnection.on(
      "msg",
      data => {
        setMarkers(markers => {
          return markers.concat([
            {
              uuid: uuid.v4(),
              position: { lat: Number(data.lat), long: Number(data.long) }
            }
          ]);
        });
      },
      []
    );

    return () => socketConnection.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const props = {
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false
  };

  return (
    <Map center={[42.09, 12.13]} zoom={6} {...props}>
      <TileLayer
        attribution='&copy <a href="http://osm.org/copyright">BaseMaps</a> contributors'
        url="http://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
      />
      {markers.map(marker => (
        <Marker
          key={marker.uuid}
          position={[marker.position.lat, marker.position.long]}
          icon={new DivIcon({ className: "animated-icon" })}
          onAdd={() =>
            setTimeout(function() {
              setMarkers(markers => markers.filter(m => m.uuid !== marker.uuid));
            }, 4000)
          }
        />
      ))}
    </Map>
  );
};

export default ItalyMap;
