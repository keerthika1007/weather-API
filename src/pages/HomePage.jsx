// Import Icons
import { ArrowUpRight, RefreshCw } from "lucide-react";

// Import Animation
import { motion } from "motion/react";

// Import React Router
import { Link } from "react-router-dom";

// Import Components
import { AppHeader } from "../components/AppHeader";
import { AirQualityCard } from "../components/weather/AirQualityCard";
import { CurrentWeatherCard } from "../components/weather/CurrentWeatherCard";
import { HourlyForecast } from "../components/weather/HourlyForecast";
import { WeeklyForecast } from "../components/weather/WeeklyForecast";

import { GlassCard } from "../components/ui/GlassCard";
import { LoadingState } from "../components/ui/LoadingState";
import { ErrorState } from "../components/ui/ErrorState";

// Import Context
import { useWeather } from "../context/WeatherContext";

// Import Utility Function
import { getGreeting } from "../utils/weather";

export function HomePage() {

  // Get data from Weather Context
  const {
    weather,
    loading,
    error,
    loadWeather,
    selectedCity,
  } = useWeather();

  // Show Loading Screen
  if (loading && !weather) {
    return (
      <div className="page-container">

        <LoadingState
          label="Kevin is checking the sky..."
        />

      </div>
    );
  }

  // Main Page
  return (

    <div className="page-container">

      {/* Header */}

      <AppHeader
        title={`${getGreeting()}!`}
        subtitle="Here's your weather update for today."
      />

      {/* Error */}

      {
        error && !weather && (

          <ErrorState
            message={error}
            onRetry={() =>
              loadWeather(selectedCity, { force: true })
            }
          />

        )
      }

      {/* Animated Content */}

      <motion.div

        className="page-content home-content"

        initial="hidden"

        animate="visible"

        variants={{
          visible: {
            transition: {
              staggerChildren: 0.07,
            },
          },
        }}

      >

        {/* ===========================
              First Row
        =========================== */}

        <motion.div

          className="home-primary-grid section-reveal"

          variants={{
            hidden: {
              opacity: 0,
              y: 14,
            },

            visible: {
              opacity: 1,
              y: 0,
            },
          }}

        >

          {/* Current Weather */}

          <CurrentWeatherCard />

          {/* Hourly Forecast */}

          <HourlyForecast limit={8} />

        </motion.div>

        {/* ===========================
              Second Row
        =========================== */}

        <motion.div

          className="home-secondary-grid section-reveal"

          variants={{
            hidden: {
              opacity: 0,
              y: 14,
            },

            visible: {
              opacity: 1,
              y: 0,
            },
          }}

        >

          {/* Weekly Forecast */}

          <WeeklyForecast />

          {/* Air Quality */}

          <AirQualityCard />

        </motion.div>

        {/* ===========================
              Third Row
        =========================== */}

        <motion.div

          className="home-tertiary-grid section-reveal"

          variants={{
            hidden: {
              opacity: 0,
              y: 14,
            },

            visible: {
              opacity: 1,
              y: 0,
            },
          }}

        >
        </motion.div>

        
      </motion.div>

    </div>

  );
}