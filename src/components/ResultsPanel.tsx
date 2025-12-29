import { Zap, CloudRain, Droplets, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { RiskScoreGauge } from './RiskScoreGauge';
import type { ResilienceData } from '../api/resilience';

interface ResultsPanelProps {
  data: ResilienceData;
}

export const ResultsPanel = ({ data }: ResultsPanelProps) => {
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Risk Score Section */}
      <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 p-8 shadow-xl">
        <RiskScoreGauge score={data.riskScore} />
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Energy Card */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Zap className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Energy</h3>
              <p className="text-2xl font-bold text-yellow-500">
                ${data.energy.costPerKwh.toFixed(2)}/kWh
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Efficiency</span>
              <span className="text-white font-semibold">{data.energy.efficiency}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${data.energy.efficiency}%` }}
              />
            </div>
          </div>
        </div>

        {/* Weather Card */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <CloudRain className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Weather</h3>
              <p className="text-2xl font-bold text-blue-500">
                {data.weather.temperature}°C
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Wind Speed</span>
              <span className="text-white font-semibold">{data.weather.windSpeed} m/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Flood Risk</span>
              <span className={`font-semibold ${
                data.weather.floodRisk === 'high' ? 'text-red-500' :
                data.weather.floodRisk === 'moderate' ? 'text-orange-500' :
                'text-green-500'
              }`}>
                {data.weather.floodRisk.charAt(0).toUpperCase() + data.weather.floodRisk.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Water Card */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-gray-700/50 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Droplets className="w-6 h-6 text-cyan-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Water</h3>
              <p className="text-2xl font-bold text-cyan-500">
                {data.water.stress}/100
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Stress Level</span>
              <span className={`font-semibold ${
                data.water.stress > 80 ? 'text-red-500' :
                data.water.stress >= 60 ? 'text-orange-500' :
                'text-green-500'
              }`}>
                {data.water.stress > 80 ? 'High' : data.water.stress >= 60 ? 'Moderate' : 'Low'}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-1000 ${
                  data.water.stress > 80 ? 'bg-gradient-to-r from-red-500 to-red-400' :
                  data.water.stress >= 60 ? 'bg-gradient-to-r from-orange-500 to-orange-400' :
                  'bg-gradient-to-r from-cyan-500 to-cyan-400'
                }`}
                style={{ width: `${data.water.stress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Risks Section */}
      <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 shadow-xl">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-500" />
          Identified Risks
        </h3>
        <div className="space-y-3">
          {data.risks.map((risk, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
            >
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-200 text-sm">{risk}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 shadow-xl">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-forest-green" />
          Recommendations
        </h3>
        <div className="space-y-3">
          {data.recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-forest-green/10 border border-forest-green/20 rounded-lg"
            >
              <CheckCircle className="w-5 h-5 text-forest-green flex-shrink-0 mt-0.5" />
              <p className="text-gray-200 text-sm">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timestamp */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <Clock className="w-4 h-4" />
        <span>Last assessed: {formatTimestamp(data.timestamp)}</span>
      </div>
    </div>
  );
};
