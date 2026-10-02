import React from 'react';
import { Card } from '@/components/ui/Card';
import { FileUpload } from '@/components/common/FileUpload';
import { FileText, Download } from 'lucide-react';
import { Tenant } from '../types/tenant.types';

export const TenantDocuments: React.FC<{ tenant: Tenant }> = ({ tenant }) => {
  return (
    <Card className="p-5 bg-white border border-[#eef1f6] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h4 className="text-sm font-bold text-slate-900">KYC & Documents</h4>
          <p className="text-xs text-slate-500 mt-0.5">Identity verification and rental agreements</p>
        </div>
      </div>

      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-50 text-[#5d5fef]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">
                {tenant.idProofType || 'Aadhaar Card'}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">{tenant.idProofNumber || 'XXXX-XXXX-1234'}</p>
            </div>
          </div>
          <button className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors" title="Download Document">
            <Download className="w-4 h-4" />
          </button>
        </div>

        <FileUpload
          label="Upload Additional Document"
          onUploaded={(url) => console.log('Uploaded doc:', url)}
        />
      </div>
    </Card>
  );
};
