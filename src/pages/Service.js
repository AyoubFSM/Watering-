import React, { useState, useEffect } from 'react';

const Normal = ({ isDarkMode }) => {
  const [zone1, setZone1] = useState({ active: false, time: 0, intervalId: null });
  const [zone2, setZone2] = useState({ active: false, time: 0, intervalId: null });
  const [zone3, setZone3] = useState({ active: false, time: 0, intervalId: null });
  const [zone4, setZone4] = useState({ active: false, time: 0, intervalId: null });

  const toggleZone = (zone) => {
    const zoneState = zone === 1 ? zone1 : zone === 2 ? zone2 : zone === 3 ? zone3 : zone4;

    if (zoneState.active) {
      // If the zone is active, stop the timer
      clearInterval(zoneState.intervalId);
      if (zone === 1) setZone1({ ...zone1, active: false, intervalId: null });
      else if (zone === 2) setZone2({ ...zone2, active: false, intervalId: null });
      else if (zone === 3) setZone3({ ...zone3, active: false, intervalId: null });
      else if (zone === 4) setZone4({ ...zone4, active: false, intervalId: null });
    } else {
      // If the zone is inactive, start the timer
      const intervalId = setInterval(() => {
        if (zone === 1) setZone1((prev) => ({ ...prev, time: prev.time + 1 }));
        else if (zone === 2) setZone2((prev) => ({ ...prev, time: prev.time + 1 }));
        else if (zone === 3) setZone3((prev) => ({ ...prev, time: prev.time + 1 }));
        else if (zone === 4) setZone4((prev) => ({ ...prev, time: prev.time + 1 }));
      }, 1000);

      if (zone === 1) setZone1({ ...zone1, active: true, intervalId });
      else if (zone === 2) setZone2({ ...zone2, active: true, intervalId });
      else if (zone === 3) setZone3({ ...zone3, active: true, intervalId });
      else if (zone === 4) setZone4({ ...zone4, active: true, intervalId });
    }
  };

  // Cleanup intervals on component unmount
  useEffect(() => {
    return () => {
      [zone1, zone2, zone3, zone4].forEach(zone => {
        if (zone.intervalId) clearInterval(zone.intervalId);
      });
    };
  }, [zone1, zone2, zone3, zone4]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${mins}m ${secs}s`;
  };

  return (
    <div className={`p-4 ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <h1 className="mb-4 text-xl font-bold text-center">Zone Completion Status</h1>
      <table className="table-auto mx-auto w-full max-w-md border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border-b p-3 text-base text-center">Zone</th>
            <th className="border-b p-3 text-base text-center">Status</th>
            <th className="border-b p-3 text-base text-center">On Time</th>
          </tr>
        </thead>
        <tbody>
          {[zone1, zone2, zone3, zone4].map((zone, index) => (
            <tr key={index} className="text-center">
              <td className="border-b p-3 text-base align-middle">Zone {index + 1}</td>
              <td className="border-b p-3 text-base align-middle">
                <button
                  onClick={() => toggleZone(index + 1)}
                  className={`px-4 py-2 rounded text-base w-24 ${zone.active ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                >
                  {zone.active ? 'ON' : 'OFF'}
                </button>
              </td>
              <td className="border-b p-3 text-base align-middle">
                {formatTime(zone.time)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Normal;