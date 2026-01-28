import { useState } from 'react';
import { Bell, Plus, Send, Users, Store } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

export default function NotificationsPage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('push');
  const [audience, setAudience] = useState('all_users');

  const handleSend = () => {
    if (!title || !message) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Notification sent successfully!');
    setTitle('');
    setMessage('');
  };

  const recentNotifications = [
    {
      id: 1,
      title: 'Weekend Special!',
      message: 'Get 20% off on all orders this weekend',
      type: 'push',
      audience: 'All Users',
      sentAt: '2 hours ago',
    },
    {
      id: 2,
      title: 'New Partner Onboarded',
      message: 'Sushi Master is now available for orders',
      type: 'push',
      audience: 'All Users',
      sentAt: '1 day ago',
    },
    {
      id: 3,
      title: 'Payment Reminder',
      message: 'Your weekly payout is ready for processing',
      type: 'email',
      audience: 'Partners',
      sentAt: '3 days ago',
    },
  ];

  return (
    <>
      <PageHeader 
        title="Notifications" 
        description="Send push notifications and messages"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Send Notification Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Send Notification
              </CardTitle>
              <CardDescription>
                Broadcast messages to your users and partners
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Notification Type</Label>
                <RadioGroup value={type} onValueChange={setType} className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="push" id="push" />
                    <Label htmlFor="push" className="font-normal cursor-pointer">Push</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="email" id="email" />
                    <Label htmlFor="email" className="font-normal cursor-pointer">Email</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="sms" id="sms" />
                    <Label htmlFor="sms" className="font-normal cursor-pointer">SMS</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Target Audience</Label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all_users">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        All Users
                      </div>
                    </SelectItem>
                    <SelectItem value="all_partners">
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4" />
                        All Partners
                      </div>
                    </SelectItem>
                    <SelectItem value="specific">Specific Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  placeholder="Notification title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  placeholder="Enter your notification message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
              </div>

              <Button 
                className="w-full bg-gradient-primary hover:opacity-90"
                onClick={handleSend}
              >
                <Send className="w-4 h-4 mr-2" />
                Send Notification
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Notifications */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentNotifications.map((notif) => (
                <div key={notif.id} className="p-3 bg-muted/50 rounded-lg space-y-1">
                  <p className="font-medium text-sm">{notif.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{notif.message}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-muted-foreground">{notif.audience}</span>
                    <span className="text-xs text-muted-foreground">{notif.sentAt}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
