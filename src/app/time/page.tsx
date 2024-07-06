import React from "react";
const tripStages = [
  {
    date: "2024-07-04",
    name: "Arrival in Yosemite",
    description: "Check-in to the hotel and explore the surroundings.",
  },
  {
    date: "2024-07-05",
    name: "Hiking Day",
    description: "Hike to the Yosemite Falls.",
  },
  // More stages...
];

const Timeline = () => {
  return (
    <div className="timeline-container">
      {tripStages.map((stage, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <div key={index} className="timeline-item">
          <div className="timeline-date">{stage.date}</div>
          <div className="timeline-content">
            <h3>{stage.name}</h3>
            <p>{stage.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
