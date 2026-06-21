import React from 'react';
import Navbar from '../Navbar/Navbar';
import WelcomePage from '../Component/WelcomePage/WelcomePage';
import Footer from '../Footer/Footer'
import AboutSection from '../Component/AboutSection/AboutSection';
import HowToStart from '../Component/HowToStart/HowToStart';
import ContactusSection from '../Component/ContactusSection/ContactusSection';


function Home() {
  return (
    <>
      <Navbar/>
      <WelcomePage/>
      <HowToStart/>
      <AboutSection/>
      <ContactusSection/>
      <Footer/>
    </>
  );
}

export default Home;