import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';
import { Users, PlusCircle, Home } from 'lucide-react';
const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-10 py-4", scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent")}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 transition-all duration-300 hover:opacity-80">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground font-semibold text-3xl">✚</span>
          </div>
          <span className="font-medium text-xl hidden sm:inline-block">ATRI</span>
        </Link>

        <nav className="flex items-center space-x-1 sm:space-x-2">
          <Button asChild variant={location.pathname === '/' ? 'default' : 'ghost'} size="sm" className="transition-all duration-300">
            <Link to="/">
              <Home className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline-block">Home</span>
            </Link>
          </Button>
          
          <Button asChild variant={location.pathname === '/participants' ? 'default' : 'ghost'} size="sm" className="transition-all duration-300">
            <Link to="/participants">
              <Users className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline-block">Participants</span>
            </Link>
          </Button>
          
        </nav>
      </div>
    </header>;
};
export default Header;