"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface BusinessData {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  website?: string | null;
  logo?: string | null;
}

export function BusinessInformationForm() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    logo: "",
  });

  const fetchBusinessData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/settings/business");
      
      if (!response.ok) {
        throw new Error("Failed to fetch business data");
      }

      const data = await response.json();
      setBusinessData(data.business);
      setFormData({
        name: data.business.name || "",
        email: data.business.email || "",
        phone: data.business.phone || "",
        address: data.business.address || "",
        website: data.business.website || "",
        logo: data.business.logo || "",
      });
    } catch (error) {
      console.error("Error fetching business data:", error);
      toast.error("Failed to fetch business data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch("/api/settings/business", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update business information");
      }

      const data = await response.json();
      setBusinessData(data.business);
      toast.success("Business information updated successfully!");
    } catch (error) {
      console.error("Error updating business information:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update business information");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="mr-2 h-5 w-5" />
            Business Information
          </CardTitle>
          <CardDescription>
            Update your business details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building className="mr-2 h-5 w-5" />
          Business Information
        </CardTitle>
        <CardDescription>
          Update your business details and contact information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="business-name">Business Name *</Label>
              <Input 
                id="business-name" 
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="business-email">Business Email *</Label>
              <Input 
                id="business-email" 
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="business-address">Business Address</Label>
            <Input 
              id="business-address" 
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Enter your business address"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="business-phone">Phone Number</Label>
              <Input 
                id="business-phone" 
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+92 300 1234567"
              />
            </div>
            <div>
              <Label htmlFor="business-website">Website</Label>
              <Input 
                id="business-website" 
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="https://yourbusiness.com"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="business-logo">Logo URL</Label>
            <Input 
              id="business-logo" 
              value={formData.logo}
              onChange={(e) => handleInputChange("logo", e.target.value)}
              placeholder="https://yourbusiness.com/logo.png"
            />
          </div>
          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 