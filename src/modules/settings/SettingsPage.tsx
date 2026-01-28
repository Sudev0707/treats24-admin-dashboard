import { useState } from 'react';
import { Settings as SettingsIcon, DollarSign, Percent, Truck, Smartphone, AlertTriangle } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [config, setConfig] = useState({
    deliveryFee: 5,
    taxRate: 8,
    commissionRate: 15,
    minimumOrderValue: 15,
    maintenanceMode: false,
    currentVersion: '2.1.0',
    forceUpdate: false,
  });

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <>
      <PageHeader 
        title="Settings" 
        description="Configure platform settings"
      />

      <div className="grid gap-6 max-w-3xl">
        {/* Fee Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Fee Configuration
            </CardTitle>
            <CardDescription>
              Set delivery fees, taxes, and commission rates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Delivery Fee ($)</Label>
                <Input
                  type="number"
                  value={config.deliveryFee}
                  onChange={(e) => setConfig({ ...config, deliveryFee: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Tax Rate (%)</Label>
                <Input
                  type="number"
                  value={config.taxRate}
                  onChange={(e) => setConfig({ ...config, taxRate: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Commission Rate (%)</Label>
                <Input
                  type="number"
                  value={config.commissionRate}
                  onChange={(e) => setConfig({ ...config, commissionRate: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Minimum Order Value ($)</Label>
                <Input
                  type="number"
                  value={config.minimumOrderValue}
                  onChange={(e) => setConfig({ ...config, minimumOrderValue: Number(e.target.value) })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Version */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              App Version Control
            </CardTitle>
            <CardDescription>
              Manage mobile app versions and updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Version</Label>
              <Input
                value={config.currentVersion}
                onChange={(e) => setConfig({ ...config, currentVersion: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Force Update</p>
                <p className="text-sm text-muted-foreground">
                  Require users to update to the latest version
                </p>
              </div>
              <Switch
                checked={config.forceUpdate}
                onCheckedChange={(checked) => setConfig({ ...config, forceUpdate: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Mode */}
        <Card className={config.maintenanceMode ? 'border-warning' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className={`w-5 h-5 ${config.maintenanceMode ? 'text-warning' : ''}`} />
              Maintenance Mode
            </CardTitle>
            <CardDescription>
              Temporarily disable the platform for maintenance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable Maintenance Mode</p>
                <p className="text-sm text-muted-foreground">
                  Users will see a maintenance message when enabled
                </p>
              </div>
              <Switch
                checked={config.maintenanceMode}
                onCheckedChange={(checked) => setConfig({ ...config, maintenanceMode: checked })}
              />
            </div>
            {config.maintenanceMode && (
              <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <p className="text-sm text-warning font-medium">
                  ⚠️ Maintenance mode is active. Users cannot access the app.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-gradient-primary hover:opacity-90">
            Save Changes
          </Button>
        </div>
      </div>
    </>
  );
}
