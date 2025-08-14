"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, BookOpen, Code, CreditCard, Settings, Zap, Shield, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const navigation = [
  {
    title: "Getting Started",
    icon: BookOpen,
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Quick Start", href: "/docs/quickstart" },
      { title: "Authentication", href: "/docs/authentication" },
      { title: "SDKs & Libraries", href: "/docs/sdks", comingSoon: true },
    ]
  },
  {
    title: "Core Concepts",
    icon: CreditCard,
    items: [
      { title: "Payment Flow", href: "/docs/payment-flow" },
      { title: "Payment Links", href: "/docs/payment-links" },
      { title: "Hosted Checkout", href: "/docs/hosted-checkout" },
      { title: "Webhooks", href: "/docs/webhooks" },
    ]
  },
  {
    title: "API Reference",
    icon: Code,
    items: [
      { title: "Overview", href: "/docs/api-overview" },
      { title: "Payment Links", href: "/docs/api-payment-links" },
      { title: "Payments", href: "/docs/api-payments" },
      { title: "Customers", href: "/docs/api-customers" },
      { title: "Webhooks", href: "/docs/api-webhooks" },
    ]
  },
  {
    title: "Payment Providers",
    icon: Globe,
    items: [
      { title: "PayFast", href: "/docs/providers/payfast" },
      { title: "Safepay", href: "/docs/providers/safepay" },
      { title: "Easypaisa", href: "/docs/providers/easypaisa" },
      { title: "JazzCash", href: "/docs/providers/jazzcash" },
    ]
  },
  {
    title: "Security & Compliance",
    icon: Shield,
    items: [
      { title: "Security", href: "/docs/security" },
      { title: "PCI Compliance", href: "/docs/pci-compliance" },
      { title: "Best Practices", href: "/docs/best-practices" },
    ]
  },
  {
    title: "Advanced Features",
    icon: Zap,
    items: [
      { title: "Multi-currency", href: "/docs/multi-currency" },
      { title: "Recurring Payments", href: "/docs/recurring-payments" },
      { title: "Refunds", href: "/docs/refunds" },
      { title: "Analytics", href: "/docs/analytics" },
    ]
  },
  {
    title: "Tools & Resources",
    icon: Settings,
    items: [
      { title: "Dashboard", href: "/docs/dashboard" },
      { title: "Testing", href: "/docs/testing" },
      { title: "Troubleshooting", href: "/docs/troubleshooting" },
      { title: "Support", href: "/docs/support" },
    ]
  }
];

export function DocsSidebar() {
  const [openSections, setOpenSections] = useState<string[]>(navigation.map(nav => nav.title));
  const pathname = usePathname();

  const toggleSection = (title: string) => {
    setOpenSections(prev => 
      prev.includes(title) 
        ? prev.filter(s => s !== title)
        : [...prev, title]
    );
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto sticky top-0">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">PF</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">PayFlow Docs</h1>
        </div>

        <nav className="space-y-2">
          {navigation.map((section) => (
            <div key={section.title}>
              <button
                onClick={() => toggleSection(section.title)}
                className={cn(
                  "w-full flex items-center justify-between p-3 text-left text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors",
                  openSections.includes(section.title) && "bg-gray-50"
                )}
              >
                <div className="flex items-center space-x-2">
                  <section.icon className="w-4 h-4" />
                  <span>{section.title}</span>
                </div>
                <ChevronDown 
                  className={cn(
                    "w-4 h-4 transition-transform",
                    openSections.includes(section.title) && "rotate-180"
                  )} 
                />
              </button>
              
              {openSections.includes(section.title) && (
                <div className="ml-6 mt-2 space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block px-3 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors",
                        pathname === item.href && "bg-blue-50 text-blue-700 font-medium"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.title}</span>
                        {item.comingSoon && (
                          <Badge variant="outline" className="text-xs border-orange-200 text-orange-700 bg-orange-50">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
