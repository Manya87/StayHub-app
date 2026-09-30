import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { TenantProfile } from '@/features/tenants/components/TenantProfile';
import { TenantDocuments } from '@/features/tenants/components/TenantDocuments';
import { TenantPayments } from '@/features/tenants/components/TenantPayments';
import { TenantHistory } from '@/features/tenants/components/TenantHistory';
import { useTenants } from '@/features/tenants/hooks/useTenants';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, CreditCard } from 'lucide-react';

export const TenantDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tenants } = useTenants();

  const tenant = tenants.find((t) => t.id === id) || tenants[0];

  if (!tenant) {
    return (
      <PageContainer title="Tenant Not Found">
        <p className="text-slate-400">The requested tenant was not found.</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={`${tenant.firstName} ${tenant.lastName}`}
      subtitle={`Resident in Room ${tenant.roomNumber} (${tenant.bedNumber}) • ${tenant.propertyName}`}
      actions={
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/tenants')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Tenants
          </Button>
          <Button
            size="sm"
            onClick={() => navigate('/payments')}
            leftIcon={<CreditCard className="w-4 h-4" />}
          >
            Record Rent Payment
          </Button>
        </div>
      }
    >
      <TenantProfile tenant={tenant} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TenantPayments tenant={tenant} />
          <TenantHistory tenant={tenant} />
        </div>
        <div className="lg:col-span-1">
          <TenantDocuments tenant={tenant} />
        </div>
      </div>
    </PageContainer>
  );
};
