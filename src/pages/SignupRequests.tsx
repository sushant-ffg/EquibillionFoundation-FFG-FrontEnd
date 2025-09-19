import React, { useEffect, useState } from 'react';
import { ClipboardList, CheckCircle, XCircle, Eye } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ErrorAlert } from '../components/ErrorAlert';
import { EmptyState } from '../components/EmptyState';
interface SignupRequest {
  id: string;
  name: string;
  email: string;
  type: 'corporate' | 'individual';
  companyName?: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
}
export const SignupRequests: React.FC = () => {
  const [requests, setRequests] = useState<SignupRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<SignupRequest | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  useEffect(() => {
    fetchRequests();
  }, []);
  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock data
      const mockRequests: SignupRequest[] = [{
        id: '1',
        name: 'Robert Johnson',
        email: 'robert.j@newcorp.com',
        type: 'corporate',
        companyName: 'NewCorp Technologies',
        requestDate: '2023-05-15',
        status: 'pending'
      }, {
        id: '2',
        name: 'Lisa Chen',
        email: 'lisa.c@innovate.io',
        type: 'corporate',
        companyName: 'Innovate.io',
        requestDate: '2023-05-14',
        status: 'pending'
      }, {
        id: '3',
        name: 'Alex Thompson',
        email: 'alex.t@gmail.com',
        type: 'individual',
        requestDate: '2023-05-12',
        status: 'pending'
      }, {
        id: '4',
        name: 'Maria Garcia',
        email: 'maria.g@futuretech.com',
        type: 'corporate',
        companyName: 'FutureTech Inc.',
        requestDate: '2023-05-10',
        status: 'approved'
      }, {
        id: '5',
        name: 'James Wilson',
        email: 'james.w@outlook.com',
        type: 'individual',
        requestDate: '2023-05-08',
        status: 'rejected'
      }];
      setRequests(mockRequests);
    } catch (err) {
      console.error('Failed to fetch signup requests:', err);
      setError('Failed to load signup requests. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleViewRequest = (request: SignupRequest) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };
  const handleApproveRequest = (request: SignupRequest) => {
    setRequests(prev => prev.map(r => r.id === request.id ? {
      ...r,
      status: 'approved' as const
    } : r));
  };
  const handleRejectRequest = (request: SignupRequest) => {
    setRequests(prev => prev.map(r => r.id === request.id ? {
      ...r,
      status: 'rejected' as const
    } : r));
  };
  const columns = [{
    header: 'Name',
    accessor: 'name',
    sortable: true
  }, {
    header: 'Email',
    accessor: 'email',
    sortable: true
  }, {
    header: 'Type',
    accessor: (row: SignupRequest) => {
      return row.type.charAt(0).toUpperCase() + row.type.slice(1);
    },
    sortable: true
  }, {
    header: 'Company',
    accessor: (row: SignupRequest) => {
      return row.companyName || '-';
    },
    sortable: true
  }, {
    header: 'Request Date',
    accessor: (row: SignupRequest) => {
      const date = new Date(row.requestDate);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
    sortable: true
  }, {
    header: 'Status',
    accessor: (row: SignupRequest) => {
      const statusStyles = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800'
      };
      return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[row.status]}`}>
            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          </span>;
    }
  }, {
    header: 'Actions',
    accessor: (row: SignupRequest) => {
      return <div className="flex space-x-2">
            <button onClick={() => handleViewRequest(row)} className="text-[#466EE5] hover:text-[#3355cc]" aria-label="View details">
              <Eye size={18} />
            </button>
            {row.status === 'pending' && <>
                <button onClick={() => handleApproveRequest(row)} className="text-green-600 hover:text-green-700" aria-label="Approve request">
                  <CheckCircle size={18} />
                </button>
                <button onClick={() => handleRejectRequest(row)} className="text-red-600 hover:text-red-700" aria-label="Reject request">
                  <XCircle size={18} />
                </button>
              </>}
          </div>;
    }
  }];
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#111827]">Signup Requests</h1>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-md text-sm p-2">
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      {error && <ErrorAlert message={error} onRetry={fetchRequests} />}
      {loading ? <LoadingSkeleton type="table" /> : requests.length === 0 ? <EmptyState title="No signup requests" description="There are no signup requests to review at this time." icon={<ClipboardList className="h-12 w-12 text-gray-400" />} /> : <DataTable columns={columns} data={requests} keyField="id" searchable pagination />}
    </div>;
};