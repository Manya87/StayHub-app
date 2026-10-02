import React from 'react';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Tenant } from '../types/tenant.types';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { Mail, Phone, Calendar, ShieldCheck, CreditCard } from 'lucide-react';

export const TenantProfile: React.FC<{ tenant: Tenant }> = ({ tenant }) => {
  return (
    <Card className="p-6 bg-white border border-[#eef1f6]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div className="flex items-center gap-4">
          <Avatar name={`${tenant.firstName} ${tenant.lastName}`} size="lg" />
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              {tenant.firstName} {tenant.lastName}
            </h3>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              Room {tenant.roomNumber} ({tenant.bedNumber}) • {tenant.propertyName}
            </p>
          </div>
        </div>
        <Badge variant={tenant.status === 'ACTIVE' ? 'success' : 'warning'} size="md">
          {tenant.status === 'ACTIVE' ? 'Active' : tenant.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 text-xs">
        <div className="space-y-3.5">
          <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
            Contact Details
          </h4>
          <div className="flex items-center gap-2.5 text-slate-700">
            <Mail className="w-4 h-4 text-slate-400" />
            <span className="font-medium text-slate-800">{tenant.email}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-700">
            <Phone className="w-4 h-4 text-slate-400" />
            <span className="font-medium text-slate-800">Primary: {tenant.phone}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-700">
            <Phone className="w-4 h-4 text-slate-400" />
            <span className="font-medium text-slate-800">Emergency: {tenant.emergencyContact}</span>
          </div>
        </div>

        <div className="space-y-3.5">
          <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
            Tenancy Terms
          </h4>
          <div className="flex items-center gap-2.5 text-slate-700">
            <CreditCard className="w-4 h-4 text-slate-400" />
            <span className="font-medium text-slate-700">
              Monthly Rent:{' '}
              <strong className="text-emerald-600 font-bold text-sm ml-1">
                {formatCurrency(tenant.monthlyRent)}
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-700">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            <span className="font-medium text-slate-700">
              Security Deposit:{' '}
              <strong className="text-slate-900 font-bold ml-1">
                {formatCurrency(tenant.securityDeposit)}
              </strong>
            </span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-700">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="font-medium text-slate-700">
              Check-in Date:{' '}
              <strong className="text-slate-900 font-bold ml-1">
                {formatDate(tenant.checkInDate)}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
