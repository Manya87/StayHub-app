import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { CreditCard, AlertCircle, Wrench, UserPlus, CheckCircle, Bell } from 'lucide-react';

interface NotificationItem {
  id: string;
  category: 'Payments' | 'Complaints' | 'Maintenance' | 'System';
  title: string;
  description: string;
  timeAgo: string;
  icon: React.ReactNode;
  iconBg: string;
}

const notificationsData: NotificationItem[] = [
  {
    id: '1',
    category: 'Payments',
    title: 'Payment Reminder',
    description: "Amit Kumar's payment is pending for Apr 2025",
    timeAgo: '2 hours ago',
    icon: <CreditCard className="w-4 h-4 text-amber-600" />,
    iconBg: 'bg-amber-50',
  },
  {
    id: '2',
    category: 'Complaints',
    title: 'New Complaint',
    description: 'WiFi not working (Room 301)',
    timeAgo: '5 hours ago',
    icon: <AlertCircle className="w-4 h-4 text-rose-600" />,
    iconBg: 'bg-rose-50',
  },
  {
    id: '3',
    category: 'Maintenance',
    title: 'Maintenance Completed',
    description: 'Fan repair in Room 202 has been completed',
    timeAgo: '1 day ago',
    icon: <Wrench className="w-4 h-4 text-[#5d5fef]" />,
    iconBg: 'bg-indigo-50',
  },
  {
    id: '4',
    category: 'System',
    title: 'New Visitor',
    description: 'Anjali Mehta checked in to meet: Neha Verma',
    timeAgo: '1 day ago',
    icon: <UserPlus className="w-4 h-4 text-sky-600" />,
    iconBg: 'bg-sky-50',
  },
  {
    id: '5',
    category: 'Payments',
    title: 'Payment Received',
    description: '₹6,500 received from Rahul Sharma',
    timeAgo: '2 days ago',
    icon: <CheckCircle className="w-4 h-4 text-emerald-600" />,
    iconBg: 'bg-emerald-50',
  },
];

export const NotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'All' | 'Payments' | 'Complaints' | 'Maintenance' | 'System'
  >('All');

  const filtered = activeTab === 'All'
    ? notificationsData
    : notificationsData.filter((n) => n.category === activeTab);

  return (
    <PageContainer
      title="Notifications"
      subtitle="Stay updated with important alerts"
    >
      {/* Category Tabs matching Screen 14 */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 mb-6 overflow-x-auto pb-1">
        {(['All', 'Payments', 'Complaints', 'Maintenance', 'System'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2.5 px-3 text-xs font-bold transition-all relative whitespace-nowrap ${
              activeTab === tab
                ? 'text-[#5d5fef]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5d5fef] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="space-y-3 max-w-3xl">
        {filtered.map((item) => (
          <Card
            key={item.id}
            className="p-4 bg-white border border-[#eef1f6] hover:shadow-card-hover transition-all flex items-start gap-4"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${item.iconBg}`}>
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h4>
                <span className="text-[11px] text-slate-400 font-medium">{item.timeAgo}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">{item.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};
