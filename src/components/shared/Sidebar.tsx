"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback, memo } from "react";
import { 
  LayoutDashboard, 
  CreditCard, 
  Link as LinkIcon, 
  Users, 
  BarChart3, 
  Settings,
  Menu,
  X
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
  { name: "Payment Links", href: "/dashboard/links", icon: LinkIcon },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavigationItem = memo(({ item, isActive, onClose }: { 
  item: typeof navigation[0]; 
  isActive: boolean; 
  onClose: () => void; 
}) => (
  <Link href={item.href} onClick={onClose} prefetch>
    <Button
      variant={isActive ? "default" : "ghost"}
      className={`w-full justify-start ${
        isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
      }`}
    >
      <item.icon className="mr-3 h-5 w-5" />
      {item.name}
    </Button>
  </Link>
));

NavigationItem.displayName = 'NavigationItem';

export const Sidebar = memo(function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useUser();
  const pathname = usePathname();
  
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={handleClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile close button */}
        <div className="lg:hidden flex justify-end p-4 border-b">
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Logo */}
        <div className="flex h-16 items-center px-6 border-b">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-bold text-gray-900">PayFlow</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <NavigationItem 
                key={item.name} 
                item={item} 
                isActive={isActive} 
                onClose={handleClose}
              />
            );
          })}
        </nav>

        {/* User Section */}
        <div className="border-t p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.emailAddresses[0]?.emailAddress}</p>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </>
  );
});

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="ghost" size="sm" onClick={onClick} className="lg:hidden">
      <Menu className="h-5 w-5" />
    </Button>
  );
} 