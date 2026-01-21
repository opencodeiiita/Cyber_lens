// Footer.tsx
import React from "react";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/opencodeiiita",
    icon: "fa-github",
    color: "text-[#181717]",
  },
  {
    label: "X",
    href: "https://x.com",
    icon: "fa-x-twitter",
    color: "text-black",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: "fa-linkedin",
    color: "text-[#0A66C2]",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: "fa-instagram",
    color: "text-[#E1306C]",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: "fa-youtube",
    color: "text-[#FF0000]",
  },
];

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="w-full px-4 py-10">
        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className={`h-10 w-10 flex items-center justify-center rounded-full border border-slate-700 bg-white ${link.color} text-xl transition hover:scale-110`}
            >
              <i className={`fa-brands ${link.icon}`} />
            </a>
          ))}
        </div>

        {/* Footer Text */}
        <p className="text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Cyber Lens. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
