"use client";

import { usePathname } from "next/navigation";
import { IntroductionContent } from "./sections/IntroductionContent";
import { QuickStartContent } from "./sections/QuickStartContent";
import { AuthenticationContent } from "./sections/AuthenticationContent";
import { PaymentFlowContent } from "./sections/PaymentFlowContent";
import { PaymentLinksContent } from "./sections/PaymentLinksContent";
import { HostedCheckoutContent } from "./sections/HostedCheckoutContent";
import { WebhooksContent } from "./sections/WebhooksContent";
import { ApiOverviewContent } from "./sections/ApiOverviewContent";
import { ApiPaymentLinksContent } from "./sections/ApiPaymentLinksContent";
import { ApiPaymentsContent } from "./sections/ApiPaymentsContent";
import { ApiCustomersContent } from "./sections/ApiCustomersContent";
import { ApiWebhooksContent } from "./sections/ApiWebhooksContent";
import { PayFastContent } from "./sections/providers/PayFastContent";
import { SecurityContent } from "./sections/SecurityContent";
import { TestingContent } from "./sections/TestingContent";
import { SupportContent } from "./sections/SupportContent";
import { TroubleshootingContent } from "./sections/TroubleshootingContent";
import { DashboardContent } from "./sections/DashboardContent";
import { SdksContent } from "./sections/SdksContent";
import { PciComplianceContent } from "./sections/PciComplianceContent";
import { BestPracticesContent } from "./sections/BestPracticesContent";
import { MultiCurrencyContent } from "./sections/MultiCurrencyContent";

export function DocsContent() {
  const pathname = usePathname();

  const renderContent = () => {
    switch (pathname) {
      case "/docs":
        return <IntroductionContent />;
      case "/docs/quickstart":
        return <QuickStartContent />;
      case "/docs/authentication":
        return <AuthenticationContent />;
      case "/docs/payment-flow":
        return <PaymentFlowContent />;
      case "/docs/payment-links":
        return <PaymentLinksContent />;
      case "/docs/hosted-checkout":
        return <HostedCheckoutContent />;
      case "/docs/webhooks":
        return <WebhooksContent />;
      case "/docs/api-overview":
        return <ApiOverviewContent />;
      case "/docs/api-payment-links":
        return <ApiPaymentLinksContent />;
      case "/docs/api-payments":
        return <ApiPaymentsContent />;
      case "/docs/api-customers":
        return <ApiCustomersContent />;
      case "/docs/api-webhooks":
        return <ApiWebhooksContent />;
      case "/docs/providers/payfast":
        return <PayFastContent />;
      case "/docs/security":
        return <SecurityContent />;
      case "/docs/testing":
        return <TestingContent />;
      case "/docs/support":
        return <SupportContent />;
      case "/docs/troubleshooting":
        return <TroubleshootingContent />;
      case "/docs/dashboard":
        return <DashboardContent />;
      case "/docs/sdks":
        return <SdksContent />;
      case "/docs/pci-compliance":
        return <PciComplianceContent />;
      case "/docs/best-practices":
        return <BestPracticesContent />;
      case "/docs/multi-currency":
        return <MultiCurrencyContent />;
      default:
        return <IntroductionContent />;
    }
  };

  return (
    <div className="flex-1 min-h-screen overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        {renderContent()}
      </div>
    </div>
  );
}
