import React, { useEffect, useState } from 'react';
import { Plus, Building2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DataTable } from '../components/DataTable';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ErrorAlert } from '../components/ErrorAlert';
import { EmptyState } from '../components/EmptyState';
interface Corporate {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'inactive';
  licenses: number;
  volunteers: number;
  joinedDate: string;
  lastActivity: string;
}
export const CorporateManagement: React.FC = () => {
  const [corporates, setCorporates] = useState<Corporate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  useEffect(() => {
    fetchCorporates();
  }, []);
  const fetchCorporates = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock data
      const mockCorporates: Corporate[] = [{
        id: '1',
        name: 'TechGiant Inc.',
        status: 'active',
        licenses: 100,
        volunteers: 245,
        joinedDate: '2023-01-15',
        lastActivity: '2023-05-20'
      }, {
        id: '2',
        name: 'Global Finance Ltd',
        status: 'active',
        licenses: 75,
        volunteers: 189,
        joinedDate: '2023-02-22',
        lastActivity: '2023-05-18'
      }, {
        id: '3',
        name: 'Acme Corporation',
        status: 'active',
        licenses: 50,
        volunteers: 156,
        joinedDate: '2023-03-10',
        lastActivity: '2023-05-15'
      }, {
        id: '4',
        name: 'Oceanic Airlines',
        status: 'pending',
        licenses: 30,
        volunteers: 0,
        joinedDate: '2023-05-05',
        lastActivity: '2023-05-05'
      }, {
        id: '5',
        name: 'Universal Systems',
        status: 'inactive',
        licenses: 0,
        volunteers: 0,
        joinedDate: '2023-04-18',
        lastActivity: '2023-04-18'
      }];
      setCorporates(mockCorporates);
    } catch (err) {
      console.error('Failed to fetch corporates:', err);
      setError('Failed to load corporate data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteCorporate = (corporate: Corporate) => {
    // In a real app, this would call an API
    setCorporates(prev => prev.filter(c => c.id !== corporate.id));
  };
  const columns = [{
    header: 'Company',
    accessor: 'name',
    sortable: true
  }, {
    header: 'Status',
    accessor: (row: Corporate) => {
      const statusStyles = {
        active: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        inactive: 'bg-gray-100 text-gray-800'
      };
      const statusIcons = {
        active: <CheckCircle className="h-4 w-4 mr-1" />,
        pending: <AlertCircle className="h-4 w-4 mr-1" />,
        inactive: <XCircle className="h-4 w-4 mr-1" />
      };
      return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[row.status]}`}>
            {statusIcons[row.status]}
            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          </span>;
    }
  }, {
    header: 'Licenses',
    accessor: 'licenses',
    sortable: true
  }, {
    header: 'Volunteers',
    accessor: 'volunteers',
    sortable: true
  }, {
    header: 'Joined',
    accessor: (row: Corporate) => {
      const date = new Date(row.joinedDate);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
    sortable: true
  }, {
    header: 'Last Activity',
    accessor: (row: Corporate) => {
      const date = new Date(row.lastActivity);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
    sortable: true
  }];
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#111827]">
          Corporate Management
        </h1>
        <button onClick={() => setShowAddModal(true)} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#466EE5] hover:bg-[#3355cc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#466EE5]">
          <Plus className="h-4 w-4 mr-2" />
          Add Corporate
        </button>
      </div>
      {error && <ErrorAlert message={error} onRetry={fetchCorporates} />}
      {loading ? <LoadingSkeleton type="table" /> : corporates.length === 0 ? <EmptyState title="No corporates found" description="Get started by adding your first corporate partner." actionLabel="Add Corporate" onAction={() => setShowAddModal(true)} icon={<Building2 className="h-12 w-12 text-gray-400" />} /> : <DataTable columns={columns} data={corporates} keyField="id" onDelete={handleDeleteCorporate} viewPath="/corporate-management" searchable pagination />}
    </div>;
};