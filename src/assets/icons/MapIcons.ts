import L from "leaflet";

const pickupIcon = L.divIcon({
  html: `<div style="background-color: #10b981; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">📍</div>`,
  className: "",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const destinationIcon = L.divIcon({
  html: `<div style="background-color: #ef4444; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">🏁</div>`,
  className: "",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const driverIcon = L.divIcon({
  html: `<div class="pulse" style="background-color: #10b981; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4);">🚗</div>`,
  className: "",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const inRangeDriverIcon = L.divIcon({
  html: `<div style="background-color: #10b981; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4); animation: pulse 2s infinite;">🚗✅</div>`,
  className: "",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

export const MapIcons = {
  pickupIcon,
  destinationIcon,
  driverIcon,
  inRangeDriverIcon,
};
