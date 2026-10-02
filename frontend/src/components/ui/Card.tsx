import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`rounded-2xl bg-white border border-[#eef1f6] shadow-[0_2px_10px_rgba(0,0,0,0.03)] p-5 ${
        hoverEffect ? 'hover:shadow-[0_8px_24px_rgba(93,95,239,0.08),0_2px_8px_rgba(0,0,0,0.03)] hover:border-[#dfe3f0] transition-all duration-200' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
