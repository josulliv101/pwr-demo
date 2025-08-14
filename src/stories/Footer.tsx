import React from "react";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  companyName?: string;
  year?: number;
}

export default function Footer({
  companyName = "Compare City Weather",
  year = new Date().getFullYear(),
  className = "",
  children,
  ...rest
}: FooterProps) {
  return (
    <footer
      className={` bg-gray-700 text-gray-300 py-2 ${className}`}
      {...rest}
    >
      <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-4    ">
        <div className="col-span-4 flex flex-col items-start justify-end">
          <p className="text-xs opacity-75">
            &copy; {year} {companyName}. All rights reserved.
          </p>
        </div>
        <div className="col-span-8 flex flex-col items-center justify-end">
          {children}
        </div>
      </div>
    </footer>
  );
}
