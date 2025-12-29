import { useState } from 'react';
import { Header } from './components/Header';
import { ResilienceCalculator } from './components/ResilienceCalculator';
import { ResultsPanel } from './components/ResultsPanel';
import { assessResilience, type ResilienceData } from './api/resilience';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [resilienceData, setResilienceData] = useState<ResilienceData | null>(null);

  const handleAssess = async (location: string) => {
    setIsLoading(true);
    try {
      const data = await assessResilience(location);
      setResilienceData(data);
    } catch (error) {
      console.error('Error assessing resilience:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Assess Data Center Resilience
            </h2>
            <p className="text-gray-400">
              Evaluate energy, weather, and water risks for optimal data center placement
            </p>
          </div>

          <ResilienceCalculator onAssess={handleAssess} isLoading={isLoading} />

          {resilienceData && !isLoading && (
            <ResultsPanel data={resilienceData} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
