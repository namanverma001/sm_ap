import { useState } from "react";
import { Search, Filter, RefreshCw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

import { PageWrapper } from "@/components/PageWrapper";

export const BrowseContent = () => {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cms-primary mb-4">Welcome to Admin Panel</h1>
          <p className="text-xl text-cms-text-secondary mb-8">Manage your content, users, and settings</p>
          <Button
            asChild
            className="cms-button-primary bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-6 text-lg"
          >
            <a href="#">
              View Dashboard
            </a>
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
};