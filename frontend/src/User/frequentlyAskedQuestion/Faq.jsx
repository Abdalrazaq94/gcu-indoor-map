
import React, { useState } from 'react';
import './Faq.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <button
        className="flex items-center justify-between w-full p-6 focus:outline-none"
        onClick={toggleFAQ}
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white text-left">{question}</h2>
        <svg
          className={`w-6 h-6 text-gray-500 dark:text-gray-300 transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        } overflow-hidden`}
      >
        <p className="px-6 pb-6 text-gray-600 dark:text-gray-300">{answer}</p>
      </div>
    </div>
  );
};

const Faq = () => {
  const faqData = [
    {
      question: "How do I access the campus navigation map?",
      answer: "You can access the campus navigation map by clicking on the 'Map' option in the navigation bar of our website. The map is fully accessible through any web browser on both desktop and mobile devices. There's no need to download a separate app."
    },
    {
      question: "Can I search for specific locations on the map?",
      answer: "Yes, our map includes a search functionality embedded directly within it. You can quickly and easily find any location on campus by using the search feature."
    },
    {
      question: "How do I get directions to a specific location?",
      answer: "To get directions, simply click on your desired location on the map. The system will then provide you with step-by-step directions to that location from your current position."
    },
    {
      question: "Is there a mobile app?",
      answer: "While our navigation system is fully operational on mobile devices, we don't have a dedicated mobile app. You can access all features through any web browser on your smartphone or tablet."
    }
  ];

  return (
    <>
      <Navbar />
      <div className="Faq">
        <section className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16">
          <div className="container max-w-4xl px-6 mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">Navigation Assistance</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
                GCU Student Guide FAQ
              </h1>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 dark:text-gray-300">Find answers to common questions about our campus navigation app</p>
            </div>

            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Faq;