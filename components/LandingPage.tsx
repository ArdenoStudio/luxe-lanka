import React, { useEffect } from 'react';
import Hero from './Hero';
import Philosophy from './Philosophy';
import Services from './Services';
import Experience from './Experience';
import Team from './Team';
import BookingCTA from './BookingCTA';
import { useLocation } from 'react-router-dom';

interface LandingPageProps {
  onBookClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onBookClick }) => {
  const location = useLocation();

  useEffect(() => {
    // Check if there is a hash in the URL (e.g., #services) and scroll to it
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Slight delay to ensure DOM is ready
      }
    } else {
        window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
        <Hero />
        <Philosophy />
        <Services />
        <Experience />
        <Team />
        <BookingCTA onBookClick={onBookClick} />
    </>
  );
};

export default LandingPage;