import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createRootRoute({
  component: RootLayout,
});

const navLinks = [
  { to: "/lokatsii", label: "Локації" },
  { to: "/oficiant", label: "Офіцінат" },
  { to: "/zhanry", label: "Жанри" },
] as const;

function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-14 items-center gap-6 px-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <Layers className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">ImproVenision</span>
          </Link>

          <nav className="flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
                activeProps={{ className: "text-foreground bg-muted" }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
