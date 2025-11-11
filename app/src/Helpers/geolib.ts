import { locationDot } from "../DataTypes/BaseTypes";


// Converts from degrees to radians.
function toRadians(degrees:number) {
    return degrees * Math.PI / 180;
  };
   
  // Converts from radians to degrees.
  function toDegrees(radians:number) {
    return radians * 180 / Math.PI;
  }
  
  
  export const bearing = (pointA: locationDot, pointB: locationDot) => {
    const startLat = toRadians(pointA.latitude);
    const startLng = toRadians(pointA.longitude);
    const destLat = toRadians(pointB.latitude);
    const destLng = toRadians(pointB.longitude);
  
    const y = Math.sin(destLng - startLng) * Math.cos(destLat);
    const x = Math.cos(startLat) * Math.sin(destLat) -
          Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    let brng = Math.atan2(y, x);
    brng = toDegrees(brng);
    return (brng + 360) % 360;
  }