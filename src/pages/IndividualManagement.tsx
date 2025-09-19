import React, { useEffect, useState } from 'react';
import { Plus, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ErrorAlert } from '../components/ErrorAlert';
import { EmptyState } from '../components/EmptyState';
interface Individual {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'pending' | 'inactive';
  corporate: string;
  corporateId: string;
  role: string;
  joinedDate: string;
  lastActivity: string;
}
export const IndividualManagement: React.FC = () => {
  const [individuals, setIndividuals] = useState<Individual[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  useEffect(() => {
    fetchIndividuals();
  }, []);
  const fetchIndividuals = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock data
      const mockIndividuals: Individual[] = [{
        id: '1',
        name: 'John Smith',
        email: 'john.smith@techgiant.com',
        status: 'active',
        corporate: 'TechGiant Inc.',
        corporateId: '1',
        role: 'Corporate Admin',
        joinedDate: '2023-01-20',
        lastActivity: '2023-05-20'
      }, {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.j@globalfinance.com',
        status: 'active',
        corporate: 'Global Finance Ltd',
        corporateId: '2',
        role: 'Corporate Admin',
        joinedDate: '2023-02-25',
        lastActivity: '2023-05-18'
      }, {
        id: '3',
        name: 'Michael Brown',
        email: 'michael.b@techgiant.com',
        status: 'active',
        corporate: 'TechGiant Inc.',
        corporateId: '1',
        role: 'Volunteer',
        joinedDate: '2023-02-10',
        lastActivity: '2023-05-19'
      }, {
        id: '4',
        name: 'Emily Davis',
        email: 'emily.d@techgiant.com',
        status: 'active',
        corporate: 'TechGiant Inc.',
        corporateId: '1',
        role: 'Volunteer',
        joinedDate: '2023-03-05',
        lastActivity: '2023-05-15'
      }, {
        id: '5',
        name: 'David Wilson',
        email: 'david.w@acme.com',
        status: 'pending',
        corporate: 'Acme Corporation',
        corporateId: '3',
        role: 'Volunteer',
        joinedDate: '2023-05-10',
        lastActivity: '2023-05-10'
      }];
      setIndividuals(mockIndividuals);
    } catch (err) {
      console.error('Failed to fetch individuals:', err);
      setError('Failed to load individual data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteIndividual = (individual: Individual) => {
    // In a real app, this would call an API
    setIndividuals(prev => prev.filter(i => i.id !== individual.id));
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
    header: 'Status',
    accessor: (row: Individual) => {
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
    header: 'Corporate',
    accessor: 'corporate',
    sortable: true
  }, {
    header: 'Role',
    accessor: 'role',
    sortable: true
  }, {
    header: 'Joined',
    accessor: (row: Individual) => {
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
    accessor: (row: Individual) => {
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
          Individual Management
        </h1>
        <button onClick={() => setShowAddModal(true)} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#466EE5] hover:bg-[#3355cc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#466EE5]">
          <Plus className="h-4 w-4 mr-2" />
          Add Individual
        </button>
      </div>
      {error && <ErrorAlert message={error} onRetry={fetchIndividuals} />}
      {loading ? <LoadingSkeleton type="table" /> : individuals.length === 0 ? <EmptyState title="No individuals found" description="Get started by adding your first individual user." actionLabel="Add Individual" onAction={() => setShowAddModal(true)} icon={<Users className="h-12 w-12 text-gray-400" />} /> : <DataTable columns={columns} data={individuals} keyField="id" onDelete={handleDeleteIndividual} searchable pagination />}
    </div>;
};