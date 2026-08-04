import { Leaf, Wind } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { useWeather } from "../../context/WeatherContext";
import { getAqiStatus } from "../../utils/weather";
import { SunTimes } from "./SunTimes";

export function AirQualityCard({ compact = false }) {

  // Get weather data from Weather Context
  const { weather } = useWeather();

  // Get air quality data
  const air = weather?.airQuality;

  // Get AQI status (Good, Moderate, Poor, etc.)
  const status = getAqiStatus(air?.aqi);

  return (
    <GlassCard
      className={`air-quality-card ${
        compact ? "air-quality-card-compact" : ""
      }`}
    >

      {/* Card Header */}
      <div className="card-heading-row mt-5">

        <div>
          <p className="eyebrow eyebrow-dark">
            Atmosphere
          </p>

          <h2>
            Air Quality Index
          </h2>
        </div>

        <div className="card-icon-badge card-icon-badge-green">
          <Wind size={18} />
        </div>

      </div>

      {/* AQI Score */}
      <div className="aqi-score-row">

        <strong>
          {air?.aqi ?? "—"}
        </strong>

        <div> 

          <span
            className={`aqi-label aqi-${status.tone}`}
          >
            {status.label}
          </span>

          <p>
            US AQI
          </p>

        </div>

      </div>

      {/* Recommendation */}
      <p className="aqi-recommendation mb-12">

        <Leaf size={20} />

        {status.tone === "good"
          ? "Great air today. Enjoy your time outside."
          : "Consider limiting long outdoor activity."}

      </p>

      <SunTimes />
    </GlassCard>
  );
}