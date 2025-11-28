"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import { toast } from "sonner";

export default function PricingModal({ isOpen, onClose, userEmail }) {
  const handleUpgrade = async () => {
    toast.info("Payment integration coming soon! For now, contact support to upgrade.");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Choose Your Plan</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Free Tier */}
          <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-800 transition-all">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-bold mb-2">$0</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Perfect to get started</p>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">3 mock interviews per month</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">AI-generated questions</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Basic feedback & ratings</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Community support</span>
              </li>
            </ul>

            <Button variant="outline" className="w-full" disabled>
              Current Plan
            </Button>
          </div>

          {/* Premium Tier */}
          <div className="border-2 border-blue-600 rounded-xl p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 relative overflow-hidden transition-all">
            <div className="absolute top-4 right-4">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </span>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <div className="text-4xl font-bold mb-2">
                $1<span className="text-lg font-normal text-gray-600 dark:text-gray-400">/mo</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Everything you need to ace interviews</p>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-semibold">Unlimited mock interviews</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Advanced AI feedback</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Detailed performance analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Priority support</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Custom interview scenarios</span>
              </li>
            </ul>

            <Button
              onClick={handleUpgrade}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold"
            >
              <Zap className="mr-2 h-4 w-4" />
              Upgrade Now
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>All plans include a 7-day money-back guarantee. Cancel anytime.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
