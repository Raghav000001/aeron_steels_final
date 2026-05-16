import React from 'react';

interface Props {
  tagline?: string;
  titleLight?: string;
  titleBold?: string;
  centered?: boolean;
  lightTheme?: boolean;
}

export default function SectionHeading({ tagline, titleLight, titleBold, centered = true, lightTheme = false }: Props) {
  return (
    <div className={`mb-10 ${centered ? 'flex flex-col items-center text-center' : ''}`}>
      {tagline && (
        <span className={`block text-sm font-medium tracking-wide uppercase mb-2 ${lightTheme ? 'text-gray-400' : 'text-gray-500'}`}>
          {tagline}
        </span>
      )}
      <h2 className={`text-3xl lg:text-4xl uppercase leading-tight font-light mb-4 ${lightTheme ? 'text-white' : 'text-gray-800'}`}>
        {titleLight && <span className="font-light">{titleLight} </span>}
        {titleBold && <strong className="font-bold text-[#FF5B22]">{titleBold}</strong>}
      </h2>
      <div className="w-12 h-1 bg-[#FF5B22]"></div>
    </div>
  );
}
