import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  ["problem", "The Problem"],
  ["platform", "Platform"],
  ["why", "Why It Matters"],
] as const;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/90 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="font-heading font-bold text-lg">
          <span className={scrolled ? "text-foreground" : "text-primary-foreground"}>
            Ellie Shrier
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-8">
          {links.map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-sm font-medium transition-colors hover:opacity-80 relative group ${
                scrolled ? "text-muted-foreground hover:text-foreground" : "text-primary-foreground/80 hover:text-primary-foreground"
              }`}
            >
              {label}
              <span className={`absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 ${scrolled ? "bg-primary" : "bg-primary-foreground"}`} />
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="sm:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen
            ? <X className={scrolled ? "text-foreground" : "text-primary-foreground"} />
            : <Menu className={scrolled ? "text-foreground" : "text-primary-foreground"} />
          }
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="sm:hidden bg-card/95 backdrop-blur-lg border-b border-border"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4 space-y-3">
              {links.map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="block w-full text-left text-foreground font-medium py-2 hover:text-primary transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
