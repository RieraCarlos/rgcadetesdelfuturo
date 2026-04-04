// components/InstructorsList.js
import React from 'react';
import { instructors } from './InstructoresData';

interface InstructorsListProps {
  onSelectInstructor: (instructor: any) => void;
  selectedInstructorId: string | undefined;
  variant?: 'vertical' | 'horizontal';
}

const InstructorsList: React.FC<InstructorsListProps> = ({ 
  onSelectInstructor, 
  selectedInstructorId,
  variant = 'vertical'
}) => {
  const isHorizontal = variant === 'horizontal';

  return (
    <div className={`
      ${isHorizontal ? 'w-full p-2 sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b-2 border-black' : 'p-4 w-full min-h-screen border-r border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/20 backdrop-blur-sm'}
    `}>
      { !isHorizontal && (
        <h2 className="text-3xl font-black mb-8 text-black dark:text-white uppercase tracking-tighter text-center md:text-left">
          Instructores
        </h2>
      )}
      
      <div className={`
        flex ${isHorizontal ? 'flex-row space-x-3 overflow-x-auto pb-2 px-2 scrollbar-hide' : 'flex-col space-y-3'}
      `}>
        {instructors.map(instructor => (
          <button
            key={instructor.id}
            onClick={() => onSelectInstructor(instructor)}
            className={`
              flex items-center transition-all duration-300 border-2 group flex-shrink-0
              ${isHorizontal ? 'min-w-[150px] space-x-2 p-2 rounded-xl' : 'space-x-4 p-4 rounded-2xl'}
              ${selectedInstructorId === instructor.id 
                ? 'bg-[#ffcc01] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] -translate-y-0.5' 
                : 'bg-white dark:bg-zinc-900 border-transparent hover:border-black/20 hover:bg-gray-50 dark:hover:bg-zinc-800'}
            `}
          >
            <div className={`
              ${isHorizontal ? 'w-8 h-8' : 'w-12 h-12'} rounded-full border-2 flex items-center justify-center transition-colors
              ${selectedInstructorId === instructor.id ? 'border-black bg-white/20' : 'border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800'}
            `}>
              <span className={`${isHorizontal ? 'text-sm' : 'text-xl'} group-hover:scale-110 transition-transform`}>👤</span>
            </div>
            <div className="flex flex-col items-start text-left truncate">
              <span className={`
                font-bold whitespace-nowrap overflow-hidden text-ellipsis
                ${isHorizontal ? 'text-sm w-full' : 'text-lg'}
                ${selectedInstructorId === instructor.id ? 'text-black' : 'text-gray-800 dark:text-gray-200'}
              `}>
                {instructor.name}
              </span>
              { !isHorizontal && (
                <span className={`text-xs ${selectedInstructorId === instructor.id ? 'text-black/60' : 'text-gray-500'}`}>
                  {instructor.role}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InstructorsList;