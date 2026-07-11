import Hero from '../components/Hero';
import Services from '../components/Services';
import Statistics from '../components/Statistics';
import FeaturedDoctors from '../components/FeaturedDoctors';
import AppointmentUI from '../components/AppointmentUI';
import MedicineStore from '../components/MedicineStore';
import LabTestsUI from '../components/LabTestsUI';

// THE FIX: Point exactly to the file inside the Checkout folder
import Checkout from '../components/Checkout/Checkout'; 

import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-16 w-full">
      {/* Welcome Banner */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100 mx-4 mt-4">
        <h2 className="text-2xl font-bold text-blue-900">Welcome to CarePulse</h2>
        <p className="text-gray-600">Your secure healthcare portal.</p>
      </div>

      {/* Main Website Sections Stacked */}
      <div className="w-full">
        <Hero />
        <Services />
        <Statistics />
        <FeaturedDoctors />
        <AppointmentUI />
        <MedicineStore />
        <LabTestsUI />
        <Checkout /> 
        <Testimonials />
        <CTA />
      </div>
    </div>
  );
}