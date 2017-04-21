import React, { Component } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import * as uuid from 'uuid';

export default class ItalyMap extends Component {

  constructor () {
    super();
    this.state = {
      markers: []
    }
  }

  componentDidMount () {
    this.props.socketConnection.on('msg', (data) => {
      this.setState((state) => {
        return {
          markers: state.markers.concat([ {
            uuid: uuid.v4(),
            position: { lat: Number(data.lat), long: Number(data.long) }
          } ])
        };
      })
    });
  }

  render () {

    const self = this;

    const props = {
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false
    };

    return (
      <Map center={[ 42.090, 12.130 ]} zoom={6} {...props}>
        <TileLayer
          attribution='&copy <a href="http://osm.org/copyright">BaseMaps</a> contributors'
          url='http://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
        />
        {
          this.state.markers.map(marker =>
            <Marker
              key={marker.uuid}
              position={[ marker.position.lat, marker.position.long ]}
              icon={new DivIcon({ className: 'animated-icon' })}
              onAdd={
                () =>
                  setTimeout(function () {
                    self.setState((state) => ({
                      markers: state.markers.filter(m => m.uuid !== marker.uuid)
                    }))
                  }, 4000)
              }
            />
          )
        }
      </Map>
    );
  }
}