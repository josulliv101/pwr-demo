import ScrollNavbar from "@/components/scroll-navbar"; // Declare the ScrollNavbar variable before using it

export default function HomeWithNav() {
  return (
    <div className="min-h-screen bg-background">
      {/* Demo content to enable scrolling */}
      <div className="h-screen px-6 py-12 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Scroll Navbar Demo
          </h1>
          <p className="text-lg text-muted-foreground">
            The navbar is positioned at the bottom of this viewport-height
            section. Scroll down to see more content, then scroll back up to see
            the navbar stick to the top.
          </p>
        </div>
      </div>

      <ScrollNavbar />

      {/* Additional content after navbar */}
      <div className="px-6 py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto space-y-8">
          {Array.from({ length: 8 }, (_, i) => (
            <section key={i} className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Section {i + 1}
              </h2>
              <div className="space-y-4">
                {Array.from({ length: 3 }, (_, j) => (
                  <p key={j} className="text-muted-foreground leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
