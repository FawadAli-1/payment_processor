import { BusinessInformationForm } from "@/components/shared/BusinessInformationForm";
import { PaymentSettingsCard } from "@/components/shared/PaymentSettingsCard";
import { SecuritySettingsCard } from "@/components/shared/SecuritySettingsCard";
import { ApiKeysCard } from "@/components/shared/ApiKeysCard";
import { NotificationsCard } from "@/components/shared/NotificationsCard";
import { AccountActionsCard } from "@/components/shared/AccountActionsCard";

export default function SettingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Manage your account and business preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          <BusinessInformationForm />
          <PaymentSettingsCard />
          <SecuritySettingsCard />
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <ApiKeysCard />
          <NotificationsCard />
          <AccountActionsCard />
        </div>
      </div>
    </div>
  );
} 