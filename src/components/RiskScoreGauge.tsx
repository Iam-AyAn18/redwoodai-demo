import { useEffect, useState } from 'react';

interface RiskScoreGaugeProps {
  score: number;
}

export const RiskScoreGauge = ({ score }: RiskScoreGaugeProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Animate the score from 0 to target
    const duration = 1000; // 1 second
    const steps = 60;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  // Determine color based on score
  const getColor = (value: number) => {
    if (value > 80) return '#EF4444'; // red
    if (value >= 60) return '#F59E0B'; // orange
    return '#10B981'; // green
  };

  const color = getColor(animatedScore);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width="200" height="200" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#1F2937"
            strokeWidth="12"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold" style={{ color }}>
            {animatedScore}
          </div>
          <div className="text-sm text-gray-400">Risk Score</div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <div className="text-lg font-semibold">
          {animatedScore > 80 ? 'High Risk' : animatedScore >= 60 ? 'Moderate Risk' : 'Low Risk'}
        </div>
      </div>
    </div>
  );
};
