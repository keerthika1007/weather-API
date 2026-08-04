// Import icons from lucide-react
import { ArrowUpRight, CloudRain, MapPin } from "lucide-react";

// Import Link for page navigation
import { Link } from "react-router-dom";

// Import the custom weather context
import { useWeather } from "../../context/WeatherContext";

// Import the function that formats temperature
import { formatTemperature } from "../../utils/weather";

// Store the image URL in a variable
const spotlightImage =
  "https://images.unsplash.com/photo-1748538888829-4713db37e02f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxkcmFtYXRpYyUyMG1vbnNvb24lMjBsaWdodG5pbmclMjBzdG9ybSUyMG92ZXIlMjBkYXJrJTIwaGlsbHMlMjB3aXRoJTIwZGVlcCUyMGluZGlnbyUyMHNreSUyMGNpbmVtYXRpYyUyMGxhbmRzY2FwZSUyMHBob3RvJTIwc3Rvcm0lMjBsaWdodG5pbmd8ZW58MHx8fHwxNzg1NTEyMDEwfDA&ixlib=rb-4.1.0&q=85";

// Create the WeatherSpotlight component
export function WeatherSpotlight() {

  // Get data from the Weather Context
  const { selectedCity, weather } = useWeather();

  return (

    // Main container
    <section className="weather-spotlight">

      {/* Background Image */}
      <img
        src={spotlightImage}
        alt="Storm lightning over dark hills"
        height="460"
      />

      {/* Dark overlay placed on top of image */}
      <div className="spotlight-overlay"></div>

      {/* Left side content */}
      <div className="spotlight-copy">

        {/* Small heading */}
        <span className="spotlight-kicker">
          Weather Spotlight
        </span>

        {/* Main heading */}
        <h2>
          Monsoon in India
        </h2>

        {/* Description */}
        <p>
          Widespread rainfall bringing relief and cooler air across the region.
        </p>

        {/* Button that navigates to weather details */}
        <Link
          className="button button-light"
          to={`/weather/${encodeURIComponent(selectedCity.name)}`}
        >
          Explore Now
          <ArrowUpRight size={17} />
        </Link>

      </div>

      {/* Right side weather information */}
      <div className="spotlight-weather">

        {/* Location Card */}
        <div>

          {/* Location Icon */}
          <MapPin size={14} />

          {/* City and Country */}
          <span>
            {selectedCity.name}, {selectedCity.country}
          </span>

          {/* Current Temperature */}
          <strong>
            {formatTemperature(weather?.current?.temperature)}
          </strong>

        </div>

        {/* Rain Information Card */}
        <div>

          {/* Rain Icon */}
          <CloudRain size={18} />

          {/* Label */}
          <span>
            Live Condition
          </span>

          {/* Check if rain exists */}
          <strong>
            {weather?.current?.rain
              ? "Rain Nearby"
              : "Watch the Sky"}
          </strong>

        </div>

      </div>

    </section>
  );
}