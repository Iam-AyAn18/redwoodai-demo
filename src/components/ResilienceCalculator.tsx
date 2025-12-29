import { useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';

interface ResilienceCalculatorProps {
  onAssess: (location: string) => void;
  isLoading: boolean;
}

export const ResilienceCalculator = ({ onAssess, isLoading }: ResilienceCalculatorProps) => {
  const [location, setLocation] = useState('Moscow');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAssess(location);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 shadow-xl">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-custom-blue" />
        Location Assessment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
            Data Center Location
          </label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-custom-blue focus:border-transparent outline-none transition text-white placeholder-gray-500"
            placeholder="Enter location (e.g., Moscow)"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !location.trim()}
          className="w-full bg-gradient-to-r from-custom-blue to-forest-green hover:from-custom-blue/90 hover:to-forest-green/90 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Assessing...
            </>
          ) : (
            'Assess Resilience'
          )}
        </button>
      </form>
    </div>
  );
};
