import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Cyber Lens. OpenCode IIIT Allahabad.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
