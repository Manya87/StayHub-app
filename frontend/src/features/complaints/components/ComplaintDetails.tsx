import React from 'react';
import { ComplaintRecord } from '../types/complaint.types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/utils/formatDate';
import { ComplaintStatusBadge } from './ComplaintStatus';
import { CheckCircle2, User, Home, Calendar } from 'lucide-react';

interface ComplaintDetailsProps {
  complaint: ComplaintRecord;
  onResolve: (id: string) => void;
}

export const ComplaintDetails: React.FC<ComplaintDetailsProps> = ({
  complaint,
  onResolve,
}) => {
  return (
    <Card className="p-5 bg-white border border-[#eef1f6] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">{complaint.title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">Ticket #{complaint.id.toUpperCase()}</p>
        </div>
        <ComplaintStatusBadge status={complaint.status} />
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2 text-slate-700">
          <User className="w-4 h-4 text-slate-400" />
          <span>Tenant: <strong className="text-slate-900">{complaint.tenantName}</strong></span>
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <Home className="w-4 h-4 text-slate-400" />
          <span>Room: <strong className="text-slate-900">{complaint.roomNumber}</strong></span>
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Reported Date: <strong className="text-slate-900">{formatDate(complaint.createdAt)}</strong></span>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
        <p className="font-bold text-slate-900 mb-1">Issue Details:</p>
        <p className="text-slate-600 leading-relaxed">{complaint.description}</p>
      </div>

      {complaint.status !== 'RESOLVED' && complaint.status !== 'CLOSED' && (
        <div className="pt-2">
          <Button
            className="w-full bg-[#5d5fef] hover:bg-[#4f46e5] text-white"
            size="sm"
            onClick={() => onResolve(complaint.id)}
            leftIcon={<CheckCircle2 className="w-4 h-4" />}
          >
            Mark Ticket Resolved
          </Button>
        </div>
      )}
    </Card>
  );
};
