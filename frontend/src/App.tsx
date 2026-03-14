import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatInterface from './components/ChatInterface';
import ImageUpload from './components/ImageUpload';
import ResultsDisplay from './components/ResultsDisplay';
import { ScalingIcon as SeedlingIcon, Leaf, Footprints } from 'lucide-react';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <ChatProvider>
      <div className="flex flex-col min-h-screen bg-leaf-50">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-6 md:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white rounded-lg shadow-md p-4 mb-6 animate-slide-up">
                <h2 className="text-xl font-display font-semibold text-leaf-800 mb-4 flex items-center">
                  <Leaf size={20} className="mr-2 text-leaf-600" />
                  Garden Companion
                </h2>
                <p className="text-gray-700 mb-4">
                  Welcome to Leafy, your AI-powered garden companion. I can help identify plant diseases 
                  and provide care advice to keep your garden thriving.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <div className="bg-leaf-100 rounded-full p-1 mr-3 mt-0.5">
                      <SeedlingIcon size={16} className="text-leaf-700" />
                    </div>
                    <p className="text-gray-600">Upload clear images of your plant's leaves or stems</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-leaf-100 rounded-full p-1 mr-3 mt-0.5">
                      <Leaf size={16} className="text-leaf-700" />
                    </div>
                    <p className="text-gray-600">Get instant disease detection and diagnosis</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-leaf-100 rounded-full p-1 mr-3 mt-0.5">
                      <Footprints size={16} className="text-leaf-700" />
                    </div>
                    <p className="text-gray-600">Receive personalized care instructions for your plants</p>
                  </div>
                </div>
              </div>
              
              <ImageUpload />
              <ResultsDisplay />
            </div>
            
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col animate-slide-up">
                <ChatInterface />
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </ChatProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;