import { useEffect, useState } from 'react';
import { COLORS, RISK_THRESHOLDS } from '../constants';

interface RiskScoreGaugeProps {
  score: number;
}

export const RiskScoreGauge = ({ score }: RiskScoreGaugeProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Animate the score from 0 to target using requestAnimationFrame
    const duration = 1000; // 1 second
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(score * easeOutQuart);

      setAnimatedScore(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [score]);

  // Determine color based on score
  const getColor = (value: number) => {
    if (value > RISK_THRESHOLDS.HIGH) return COLORS.RED;
    if (value >= RISK_THRESHOLDS.MODERATE) return COLORS.ORANGE;
    return COLORS.FOREST_GREEN;
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
          {animatedScore > RISK_THRESHOLDS.HIGH ? 'High Risk' : 
           animatedScore >= RISK_THRESHOLDS.MODERATE ? 'Moderate Risk' : 'Low Risk'}
        </div>
      </div>
    </div>
  );
};
