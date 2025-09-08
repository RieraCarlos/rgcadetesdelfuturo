// components/InstructorsList.js
import React from 'react';
import { instructors } from './InstructoresData';

const InstructorsList = ({ onSelectInstructor, selectedInstructorId }) => {
  return (
    <div className=" p-4 w-full min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Instructores</h2>
      <div className="flex flex-col space-y-4">
        {instructors.map(instructor => (
          <button
            key={instructor.id}
            onClick={() => onSelectInstructor(instructor)}
            className={`
              flex items-center space-x-4 p-4 rounded-xl transition-colors
              ${selectedInstructorId === instructor.id ? 'bg-[#ffcc01]' : 'hover:bg-gray-800'}
            `}
          >
            <div className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <span className="font-semibold text-lg">{instructor.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InstructorsList;