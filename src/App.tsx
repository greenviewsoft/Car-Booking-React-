import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Benefits from "./components/Benefits";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import CategoryCars from "./components/CategoryCars";
import Dashboard from "./components/Dashboard";
import MyBookings from "./components/MyBookings";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";

// Loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <Loader className="w-8 h-8 animate-spin text-blue-600" />
  </div>
);

// Home page component
const HomePage = () => (
  <>
    <HeroSection />
    <div className="space-y-16 py-8">
      <CategoryCars 
        category="popular"
        title="Popular Cars"
        description="Our most sought-after vehicles for your journey"
      />
      <CategoryCars 
        category="regular"
        title="Regular Cars"
        description="Reliable and comfortable vehicles for everyday use"
      />
      <Benefits />
      <Newsletter />
    </div>
  </>
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }} 
        />
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cars" element={
                <div className="space-y-16 py-8">
                  <CategoryCars 
                    category="popular"
                    title="Popular Cars"
                    description="Our most sought-after vehicles"
                  />
                  <CategoryCars 
                    category="regular"
                    title="Regular Cars"
                    description="Reliable and comfortable vehicles"
                  />
                </div>
              } />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/bookings" element={<MyBookings />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;







