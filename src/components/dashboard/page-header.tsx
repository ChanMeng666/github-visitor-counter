"use client";

export function PageHeader() {
  return (
    <div className="mb-8 relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 rounded-2xl -z-10 blur-sm" />

      <div className="py-8 px-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Configure Your Visitor Counter
            </h1>
            <p className="text-lg text-muted-foreground">
              Customize your GitHub visitor counter with real-time preview
            </p>
          </div>

          {/* Live Preview Indicator */}
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className="font-medium">Live Preview Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
