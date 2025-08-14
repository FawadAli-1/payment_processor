"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function RouteTransition() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    
    // Hide transition indicator after a short delay
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isTransitioning) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-50 animate-pulse">
      <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse"></div>
    </div>
  );
}
