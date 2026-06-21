import React from 'react';

const HowToStart = () => {
    return (
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 mb-10 sm:mb-12 md:mb-14 lg:mb-20 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 text-center font-oswald mb-8 sm:mb-10 md:mb-12 lg:mb-28">
                    How to Start with GCU Guide Map
                </h1>

                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
                        <StepCard
                            stepNumber={1}
                            title="Create an Account"
                            description="Sign up using your GCU email and log in to the system."
                            icon={<UserIcon />}
                        />

                        <StepCard
                            stepNumber={2}
                            title="Enable the Map"
                            description="Ensure your current location is within GCU University premises."
                            icon={<MapIcon />}
                        />

                        <StepCard
                            stepNumber={3}
                            title="Navigate to Destination"
                            description="Enter your room number, press 'Destination', and follow the guided route."
                            icon={<NavigationIcon />}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StepCard = ({ stepNumber, title, description, icon }) => (
    <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 flex flex-col items-center text-center relative transition-all duration-300 ease-in-out hover:shadow-2xl">
        <div className="bg-blue-600 text-white rounded-full h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 flex items-center justify-center text-xl sm:text-2xl font-bold absolute -top-6 left-1/2 transform -translate-x-1/2 border-4 border-white shadow-lg font-oswald">
            {stepNumber}
        </div>
        <div className="bg-blue-50 p-4 sm:p-5 rounded-full mb-4 mt-8 shadow-inner">
            {icon}
        </div>
        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3 font-oswald">{title}</h3>
        <p className="text-sm sm:text-base text-gray-600">{description}</p>
    </div>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const MapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
);

const NavigationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        
        
    </svg>
);

export default HowToStart;