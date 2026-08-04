// Import icons from Lucide React
import {
  Bell,
  CircleHelp,
  Info,
  LockKeyhole,
  MapPin,
  Palette,
  RefreshCw,
  Scale,
  Wind,
} from "lucide-react";

// Import reusable components
import { AppHeader } from "../components/AppHeader";
import { GlassCard } from "../components/ui/GlassCard";
import { SelectField } from "../components/settings/SelectField";
import { SettingRow } from "../components/settings/SettingRow";
import { Toggle } from "../components/settings/Toggle";

// Import Weather Context
import { useWeather } from "../context/WeatherContext";

export function SettingsPage() {

  // Get preferences and update function from Context
  const { preferences, updatePreference } = useWeather();

  return (
    <div className="page-container">

      {/* Header */}
      <AppHeader
        title="Settings"
        subtitle="Manage your preferences and app settings"
        showSearch
      />

      <div className="page-content settings-content">

        {/* ===========================
            Preferences Card
        ============================ */}

        <GlassCard className="settings-preferences-card">

          {/* Card Heading */}
          <div className="settings-section-heading">

            

          </div>

          {/* Settings List */}

          <div className="settings-grid">

            {/* Temperature */}

            <SettingRow
              icon={<Scale size={20} />}
              title="Temperature"
              description="Choose how temperature is displayed."
            >

              <SelectField
                label="Temperature Unit"
                value={preferences.temperatureUnit}
                onChange={(value) =>
                  updatePreference("temperatureUnit", value)
                }
                options={[
                  {
                    value: "celsius",
                    label: "Celsius (°C)",
                  },
                  {
                    value: "fahrenheit",
                    label: "Fahrenheit (°F)",
                  },
                ]}
              />

            </SettingRow>
            
            {/* Notifications */}

            <SettingRow
              icon={<Bell size={20} />}
              title="Notifications"
              description="Receive important weather alerts."
            >

              <Toggle
                label="Notifications"
                checked={preferences.notifications}
                onChange={(value) =>
                  updatePreference("notifications", value)
                }
              />

            </SettingRow>

            {/* Location */}

            <SettingRow
              icon={<MapPin size={20} />}
              title="Location Access"
              description="Allow Weather App to use your location."
            >

              <Toggle
                label="Location Access"
                checked={preferences.locationAccess}
                onChange={(value) =>
                  updatePreference("locationAccess", value)
                }
              />

            </SettingRow>

            {/* Auto Refresh */}

            <SettingRow
              icon={<RefreshCw size={20} />}
              title="Automatic Updates"
              description="Refresh weather every 15 minutes."
            >

              <Toggle
                label="Automatic Updates"
                checked={preferences.autoRefresh}
                onChange={(value) =>
                  updatePreference("autoRefresh", value)
                }
              />

            </SettingRow>

          </div>

        </GlassCard>

        {/* ===========================
            About Card
        ============================ */}

        <GlassCard className="settings-about-card">

          <div className="about-icon">
            <Info size={24} />
          </div>

          <div className="about-copy">

            <p className="eyebrow eyebrow-dark">
              About Weather App
            </p>

            <h2>
              Weather, with a little more context.
            </h2>

            <p>
              Your weather companion for accurate forecasts,
              clean decisions, and real-time updates.
            </p>

            <span className="version-label">
              Version 2.4.1 · Kevin Weather Assistant
            </span>

          </div>

          {/* Links */}

          <div className="about-links">

            <a href="#support">
              <CircleHelp size={17} />
              Help & Support
              <span>↗</span>
            </a>

            <a href="#privacy">
              <LockKeyhole size={17} />
              Privacy Policy
              <span>↗</span>
            </a>

            <a href="#terms">
              <Info size={17} />
              Terms of Service
              <span>↗</span>
            </a>

          </div>

        </GlassCard>

        {/* Footer */}

        <p className="real-time-footer">

          <span className="live-dot"></span>

          Data is updated in real-time from open weather services.

        </p>

      </div>

    </div>
  );
}