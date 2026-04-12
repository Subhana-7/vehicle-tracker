const geolib = require('geolib');

export function calculateTrip(data:any) {
  let totalDistance = 0;

  for (let i = 1; i < data.length; i++) {
    const prev = data[i - 1];
    const curr = data[i];

    const distance = geolib.getDistance(
      { latitude: prev.latitude, longitude: prev.longitude },
      { latitude: curr.latitude, longitude: curr.longitude }
    );

    totalDistance += distance;

    // speed = distance / time
    const timeDiff =
  (new Date(curr.timestamp).getTime() - new Date(prev.timestamp).getTime()) / 1000; // seconds
    const speed = distance / timeDiff; // m/s

    curr.speed = speed * 3.6; // km/h
  }

  return { totalDistance, data };
}

export function analyzeTrip(data:any) {
  let idlingTime = 0;
  let stoppageTime = 0;

  for (let i = 1; i < data.length; i++) {
    const prev = data[i - 1];
    const curr = data[i];

    const timeDiff =
  (new Date(curr.timestamp).getTime() - new Date(prev.timestamp).getTime()) / 1000;

    if (curr.ignition === "OFF") {
      stoppageTime += timeDiff;
    } else if (curr.speed === 0) {
      idlingTime += timeDiff;
    }
  }

  return { idlingTime, stoppageTime };
}