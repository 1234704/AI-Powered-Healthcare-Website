# AI-Powered Healthcare Website

A modern, interactive frontend application designed to streamline patient healthcare management. This platform features a unified portal allowing users to seamlessly book medical appointments and schedule laboratory tests through a highly responsive, animated interface.

##  Features

### 1. Unified Dashboard Architecture
* **Seamless Routing:** A custom state-based navigation portal that toggles between modules without triggering full page reloads.
* **Responsive Design:** Fully optimized across mobile, tablet, and desktop viewports using utility-first CSS grids.

### 2. Appointment Booking Module
* **Custom Date Picker:** An interactive, horizontally scrolling 7-day calendar generated dynamically via JavaScript `Date` math.
* **Categorized Time Slots:** Advanced grid layout dividing availability into Morning, Afternoon, and Evening periods with simulated booked/available states.
* **Clinical Triage Form:** Comprehensive patient intake form featuring strict client-side Regex validation for names, international phone numbers, and birth dates.
* **Animated Receipt:** A sleek appointment summary card utilizing zoom effects and layout transitions.

### 3. Diagnostic Laboratory Module
* **Dynamic Test Directory:** A comprehensive grid displaying available medical tests, categories, turnaround times, and pricing.
* **Real-Time Search & Filter:** A zero-latency search engine combined with dynamic category pills to instantly parse the diagnostic database.
* **Advanced Booking Flow:** Conditional form rendering that captures patient details and adapts UI inputs based on "Visit Laboratory" vs. "Home Sample Collection" preferences.

##  Tech Stack

* **Core:** React.js, Vite
* **Styling:** Tailwind CSS (v4)
* **Animations:** Framer Motion (Page transitions, hover physics, shared layout animations)
* **Iconography:** Lucide-React

##  Installation & Setup

To run this project locally on your machine:

1. **Clone the repository**
   ```bash
   git clone [https://github.com/1234704/AI-Powered-Healthcare-Website.git](https://github.com/1234704/AI-Powered-Healthcare-Website.git)