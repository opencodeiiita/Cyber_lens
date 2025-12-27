const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="w-full px-4 py-10">
        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-6">
          {/* GitHub */}
          <a
            aria-label="GitHub"
            className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-700 text-[#181717] bg-white cursor-pointer transition"
          >
            <i className="fa-brands fa-github text-lg" />
          </a>

          {/* X / Twitter */}
          <a
            aria-label="X"
            className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-700 text-black bg-white cursor-pointer transition"
          >
            <i className="fa-brands fa-x-twitter text-lg" />
          </a>

          {/* LinkedIn */}
          <a
            aria-label="LinkedIn"
            className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-700 text-[#0A66C2] bg-white cursor-pointer transition"
          >
            <i className="fa-brands fa-linkedin text-lg" />
          </a>

          {/* Instagram */}
          <a
            aria-label="Instagram"
            className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-700 text-[#E1306C] bg-white cursor-pointer transition"
          >
            <i className="fa-brands fa-instagram text-lg" />
          </a>

          {/* YouTube */}
          <a
            aria-label="YouTube"
            className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-700 text-[#FF0000] bg-white cursor-pointer transition"
          >
            <i className="fa-brands fa-youtube text-lg" />
          </a>
        </div>

        {/* Divider */}
        <div className="max-w-5xl mx-auto border-t border-slate-800 mb-4" />

        {/* Copyright */}
        <div className="text-center text-md text-slate-500 tracking-wide">
          © 2025 Cyber Lens. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
