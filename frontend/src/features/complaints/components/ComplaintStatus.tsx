import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { ComplaintState } from '../types/complaint.types';

export const ComplaintStatusBadge: React.FC<{ status: ComplaintState }> = ({ status }) => {
  switch (status) {
    case 'OPEN':
      return <Badge variant="danger" size="sm">Open</Badge>;
    case 'IN_PROGRESS':
      return <Badge variant="warning" size="sm">In Progress</Badge>;
    case 'RESOLVED':
      return <Badge variant="success" size="sm">Resolved</Badge>;
    default:
      return <Badge variant="neutral" size="sm">{status}</Badge>;
  }
};
