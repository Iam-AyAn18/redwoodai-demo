# RedwoodAI Demo - Data Center Resilience Intelligence

A single-page React TypeScript application built with Vite for assessing data center resilience across different global locations.

## Features

- **Interactive Location Assessment**: Enter any location to evaluate data center resilience
- **Risk Score Gauge**: Animated SVG circular progress indicator showing risk levels (0-100)
  - Green (<60): Low Risk
  - Orange (60-80): Moderate Risk  
  - Red (>80): High Risk
- **Comprehensive Metrics Dashboard**:
  - Energy costs and efficiency ratings
  - Weather conditions (temperature, wind speed, flood risk)
  - Water stress levels
- **Risk Analysis**: Identifies specific risks for the selected location
- **Smart Recommendations**: Provides actionable suggestions to improve resilience
- **Dark Theme**: Modern glassmorphism design with responsive layout
- **Real-time Updates**: Timestamp tracking for assessments

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 with custom theme
- **Icons**: Lucide React
- **Deployment**: Azure Static Web Apps

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Iam-AyAn18/redwoodai-demo.git
cd redwoodai-demo

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
redwoodai-demo/
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml  # GitHub Actions workflow
├── api/                                # Azure Functions (future)
├── src/
│   ├── api/
│   │   └── resilience.ts              # Mock API service
│   ├── components/
│   │   ├── Header.tsx                 # App header
│   │   ├── ResilienceCalculator.tsx   # Location input form
│   │   ├── RiskScoreGauge.tsx        # Animated circular gauge
│   │   └── ResultsPanel.tsx          # Results display
│   ├── App.tsx                        # Main application
│   ├── index.css                      # Global styles
│   └── main.tsx                       # Entry point
├── staticwebapp.config.json           # Azure Static Web Apps config
└── vite.config.ts                     # Vite configuration
```

## Azure Deployment

### Option 1: GitHub Actions (Recommended)

1. Create an Azure Static Web App in the Azure Portal
2. Get your deployment token from Azure
3. Add the token as a GitHub secret: `AZURE_STATIC_WEB_APPS_API_TOKEN`
4. Push to main branch - deployment happens automatically

### Option 2: Azure CLI

```bash
# Build the application
npm run build

# Deploy using Azure CLI
az staticwebapp deploy \
  --name your-app-name \
  --resource-group your-resource-group \
  --source ./dist
```

## Mock API Data

The application currently uses a mock API (`src/api/resilience.ts`) that simulates a 500ms network delay. Data for Moscow includes:

- Risk Score: 72 (Moderate)
- Energy: $0.12/kWh, 85% efficiency
- Weather: -5°C, 15 m/s wind, moderate flood risk
- Water: 75/100 stress level

## Future Enhancements

- [ ] Real backend API integration with Azure Functions
- [ ] Historical data tracking and charts
- [ ] Multiple location comparison
- [ ] Export reports as PDF
- [ ] User authentication
- [ ] Real-time data from weather and energy APIs
- [ ] Interactive maps for location selection

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
