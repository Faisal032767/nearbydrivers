import React from 'react';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import PlanSelection from './components/PlanSelection';
import CarFleetService from './components/CarFleetService';
import CustomerFeedback from './components/CustomerFeedback';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Hero />
 
      <main>
        {/* <ServicesGrid /> */}
        <PlanSelection/>
        <CarFleetService/>
        <CustomerFeedback/>
        <Footer/>
        <div>
         
        </div>
      </main>
    </div>
  );
}

export default App;