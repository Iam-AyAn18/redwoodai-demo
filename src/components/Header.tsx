import { Database } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center md:justify-start gap-3">
          <div className="p-2 bg-forest-green/20 rounded-lg backdrop-blur-md border border-forest-green/30">
            <Database className="w-8 h-8 text-forest-green" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              RedwoodAI
            </h1>
            <p className="text-sm text-gray-400">
              Data Center Resilience Intelligence
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
