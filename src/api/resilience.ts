// Mock API for resilience assessment

export interface ResilienceData {
  riskScore: number;
  energy: {
    costPerKwh: number;
    efficiency: number;
  };
  weather: {
    temperature: number;
    windSpeed: number;
    floodRisk: string;
  };
  water: {
    stress: number;
  };
  risks: string[];
  recommendations: string[];
  timestamp: string;
}

// Mock data for different locations
const mockData: Record<string, ResilienceData> = {
  moscow: {
    riskScore: 72,
    energy: {
      costPerKwh: 0.12,
      efficiency: 85,
    },
    weather: {
      temperature: -5,
      windSpeed: 15,
      floodRisk: 'moderate',
    },
    water: {
      stress: 75,
    },
    risks: [
      'High water stress levels detected in region',
      'Extreme temperature variations impact cooling efficiency',
      'Energy grid reliability concerns during peak demand',
    ],
    recommendations: [
      'Implement advanced water recycling systems to reduce dependency',
      'Upgrade cooling infrastructure to handle temperature extremes',
    ],
    timestamp: new Date().toISOString(),
  },
  // Add default data for other locations
  default: {
    riskScore: 65,
    energy: {
      costPerKwh: 0.10,
      efficiency: 80,
    },
    weather: {
      temperature: 20,
      windSpeed: 10,
      floodRisk: 'low',
    },
    water: {
      stress: 60,
    },
    risks: [
      'Moderate energy costs may impact operational expenses',
      'Standard weather patterns with minimal disruption risk',
      'Regional water availability within acceptable range',
    ],
    recommendations: [
      'Consider renewable energy sources to reduce costs',
      'Implement routine infrastructure maintenance program',
    ],
    timestamp: new Date().toISOString(),
  },
};

/**
 * Mock API function to assess data center resilience for a location
 * Simulates 500ms network delay
 */
export const assessResilience = async (location: string): Promise<ResilienceData> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Get data for location or use default
  const locationKey = location.toLowerCase();
  const data = mockData[locationKey] || mockData.default;

  // Return fresh data with current timestamp
  return {
    ...data,
    timestamp: new Date().toISOString(),
  };
};
