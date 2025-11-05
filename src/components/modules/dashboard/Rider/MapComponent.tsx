import { MapIcons } from '@/assets/icons/MapIcons';
import { LocationSelector } from '@/components/modules/dashboard/Rider/LocationSelector';
import type { Driver, LocationCoords, MapComponentProps } from '@/types';
import { getDriverKey } from '@/utils/getDriverKey';
import { getDriverCoordinates } from '@/utils/getDriverLocation';
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, TileLayer, } from "react-leaflet";
import "./animate.css";

const MapComponent: React.FC<MapComponentProps> = ({
  center = [23.8103, 90.4125],
  zoom = 12,
  height = "400px",
  width = "100%",
  pickupLocation = null,
  destinationLocation = null,
  allDrivers = [],
  nearbyDrivers = [],
  onLocationSelect = null,
  onDriverClick = null,
  className = "",
  enableLocationSelection = true,
  showAllDrivers = true,
  showNearbyDrivers = true
}) => {

  // const handleDriverClick = React.useCallback((driver: Driver): void => {
  //   if (onDriverClick && typeof onDriverClick === 'function') {
  //     onDriverClick(driver);
  //   }
  // }, [onDriverClick]);

  const handleLocationSelect = React.useCallback((location: LocationCoords): void => {
    if (onLocationSelect && typeof onLocationSelect === 'function') {
      onLocationSelect(location);
    }
  }, [onLocationSelect]);

  // Validate and filter drivers
  const validAllDrivers = React.useMemo(() => {
    return Array.isArray(allDrivers) ? allDrivers.filter(driver =>
      driver && getDriverCoordinates(driver) !== null
    ) : [];
  }, [allDrivers]);

  const validNearbyDrivers = React.useMemo(() => {
    return Array.isArray(nearbyDrivers) ? nearbyDrivers.filter(driver =>
      driver && getDriverCoordinates(driver) !== null
    ) : [];
  }, [nearbyDrivers]);

  return (
    <>
      <div className="space-y-3 ">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary">Interactive Map</h3>
          <div className="text-sm text-gray-600">
            Drivers found: {allDrivers.length} total, {nearbyDrivers.length} nearby
          </div>
        </div>
      </div>
      <div className={`rounded-lg overflow-hidden border ${className}`}>
        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height, width }}
          scrollWheelZoom={true}
          doubleClickZoom={true}
          dragging={true}
          zoomControl={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Location Selector */}
          {enableLocationSelection && onLocationSelect && (
            <LocationSelector onLocationSelect={handleLocationSelect} />
          )}

          {/* Pickup Marker */}
          {pickupLocation && (
            <Marker
              position={[pickupLocation.lat, pickupLocation.lng]}
              icon={MapIcons.pickupIcon}
            />
          )}

          {/* Destination Marker */}
          {destinationLocation && (
            <Marker
              position={[destinationLocation.lat, destinationLocation.lng]}
              icon={MapIcons.destinationIcon}
            />
          )}

          {/* All Drivers Markers */}
          {showAllDrivers && validAllDrivers.map((driver: Driver, index: number) => {
            const coords = getDriverCoordinates(driver);
            if (!coords) return null;

            return (
              <>
                <Marker
                  key={`all-${getDriverKey(driver, index)}`}
                  position={coords}
                  icon={MapIcons.driverIcon}

                  eventHandlers={{
                    click: () => handleDriverClick(driver)
                  }}
                />
                <h2>{driver.name}</h2>
              </>
            );
          })}

          {/* Nearby/Available Drivers Markers */}
          {showNearbyDrivers && validNearbyDrivers.map((driver: Driver, index: number) => {
            const coords = getDriverCoordinates(driver);
            if (!coords) return null;

            return (
              <Marker
                key={`nearby-${getDriverKey(driver, index)}`}
                position={coords}
                icon={MapIcons.inRangeDriverIcon}
                eventHandlers={{
                  click: () => handleDriverClick(driver)
                }}
              />
            );
          })}

        </MapContainer>
      </div></>
  );
};

export default MapComponent;
export type {
  Driver
};

