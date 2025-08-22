export function BreakpointIndicator() {
  return (
    <div className="fixed bottom-12 left-4 z-50 rounded-lg bg-black/80 px-3 py-2 text-xs font-mono text-white backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span>Breakpoint:</span>
        <span className="font-bold text-green-400">
          <span className="sm:hidden">xs</span>
          <span className="hidden sm:inline md:hidden">sm</span>
          <span className="hidden md:inline lg:hidden">md</span>
          <span className="hidden lg:inline xl:hidden">lg</span>
          <span className="hidden xl:inline 2xl:hidden">xl</span>
          <span className="hidden 2xl:inline">2xl</span>
        </span>
      </div>
    </div>
  );
}
