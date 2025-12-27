const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-zinc-900 bg-black">
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-32 bg-gradient-to-b from-zinc-800/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 items-center sm:justify-center">
          <div className="space-y-1 text-center">
            <div className="text-sm font-bold tracking-tight text-white">
              Cyber Lens
            </div>
            <div className="text-sm text-zinc-500">Made for OpenCode 2025</div>
            <div className="text-xs text-zinc-600">
              Threat Intelligence &amp; IOC Analysis Platform
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
