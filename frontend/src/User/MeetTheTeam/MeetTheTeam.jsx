import React from 'react';
import './MeetTheTeam.css'; // Custom CSS for additional styling
import Navbar from '../Navbar/Navbar'; // Navbar component
import Footer from '../Footer/Footer'; // Footer component

// Array of team members
const teamMembers = [
  {
    name: 'Mary Phiri',
    position: 'Senior Developer',
    email: 'mary@gmail.com',
    linkedin: 'https://linkedin.com/in/maryphiri',
    imgSrc: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwyfHxhdmF0YXJ8ZW58MHwwfHx8MTY5MTg0NzYxMHww&ixlib=rb-4.0.3&q=80&w=1080'
  },
  {
    name: 'John Doe',
    position: 'Project Manager',
    email: 'john@gmail.com',
    linkedin: 'https://linkedin.com/in/johndoe',
    imgSrc: 'https://via.placeholder.com/150'
  },
  {
    name: 'Jane Smith',
    position: 'UI/UX Designer',
    email: 'jane@gmail.com',
    linkedin: 'https://linkedin.com/in/janesmith',
    imgSrc: 'https://via.placeholder.com/150'
  },
  {
    name: 'Alice Johnson',
    position: 'Frontend Developer',
    email: 'alice@gmail.com',
    linkedin: 'https://linkedin.com/in/alicejohnson',
    imgSrc: 'https://via.placeholder.com/150'
  },
  {
    name: 'Bob Brown',
    position: 'Backend Developer',
    email: 'bob@gmail.com',
    linkedin: 'https://linkedin.com/in/bobbrown',
    imgSrc: 'https://via.placeholder.com/150'
  },
  {
    name: 'Charlie White',
    position: 'QA Engineer',
    email: 'charlie@gmail.com',
    linkedin: 'https://linkedin.com/in/charliewhite',
    imgSrc: 'https://via.placeholder.com/150'
  },
  {
    name: 'Diana Green',
    position: 'DevOps Engineer',
    email: 'diana@gmail.com',
    linkedin: 'https://linkedin.com/in/dianagreen',
    imgSrc: 'https://via.placeholder.com/150'
  }
];

const MeetTheTeam = () => {
  return (
    <>
      <Navbar /> {/* Navigation Bar */}
      <div className="min-h-screen bg-white text-black flex flex-col items-center py-10 px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-[#374151] text-white shadow-xl overflow-hidden hover:shadow-2xl group rounded-xl p-5 transition-all duration-500 transform"
            >
              <div className="flex items-center gap-4">
                {/* Team member image */}
                <img
                  src={member.imgSrc}
                  alt={`${member.name}`}
                  className="w-32 group-hover:w-36 group-hover:h-36 h-32 object-center object-cover rounded-full transition-all duration-500 delay-500 transform"
                />
                <div className="w-fit transition-all transform duration-500">
                  {/* Team member name */}
                  <h1 className="text-white font-bold">{member.name}</h1>
                  {/* Team member position */}
                  <p className="text-gray-300">{member.position}</p>
                  {/* Email link */}
                  <a
                    href={`mailto:${member.email}`}
                    className="text-xs text-gray-400 transition-transform transform hover:scale-110"
                  >
                    {member.email}
                  </a>
                  <br />
                  {/* LinkedIn link */}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-400 flex items-center gap-1 transition-transform transform hover:scale-110"
                  >
                    <svg viewBox="0 0 448 512" fill="currentColor" className="h-4 w-4 text-white">
                      <path d="M100.28 448H7.4V149.8h92.88zM53.79 108.1c-30.59 0-55.36-24.77-55.36-55.36C-1.57 24.78 23.24 0 53.79 0s55.36 24.77 55.36 55.36c-.05 30.6-24.77 55.39-55.36 55.39zM447.9 448h-92.68V306.4c0-33.7-.67-77.1-46.96-77.1-46.97 0-54.18 36.7-54.18 74.6V448H161.44V149.8h89V184h1.3c12.4-23.5 42.56-48.3 87.56-48.3 93.64 0 110.82 61.7 110.82 141.8V448z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer /> {/* Footer */}
    </>
  );
}

export default MeetTheTeam;
