import React from 'react';

interface ToothProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

const Tooth: React.FC<ToothProps> = ({
  size = 24,
  strokeWidth = 2,
  className,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path d="M7 5C7 3.5 8.5 2.5 12 2.5C15.5 2.5 17 3.5 17 5C17 7.5 16.5 9.5 16 11C15.8 11.8 15.7 12.8 15.6 14C15.5 15.8 15.3 18 14.5 20.5C14.3 21.2 13.4 21.2 13.2 20.5C12.6 18.6 12.2 16 12 14C11.8 16 11.4 18.6 10.8 20.5C10.6 21.2 9.7 21.2 9.5 20.5C8.7 18 8.5 15.8 8.4 14C8.3 12.8 8.2 11.8 8 11C7.5 9.5 7 7.5 7 5Z" />
  </svg>
);

export default Tooth;
