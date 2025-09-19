import React, { useEffect, useState } from 'react';
import { Key, Users, Calendar, ArrowUpRight, Download } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ErrorAlert } from '../components/ErrorAlert';
import { EmptyState } from '../components/EmptyState';
import { ChartContainer } from '../components/ChartContainer';
interface License {
  id: string;
  assignedTo: string;
  email: string;
  status: 'active' | 'inactive' | 'expired';
  activatedDate: string;
  expiryDate: string;
  lastUsed: string;
}
export const LicensesDashboard: React.FC = () => {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  useEffect(() => {
    fetchLicenses();
  }, []);
  const fetchLicenses = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock data
      const mockLicenses: License[] = [{
        id: '1',
        assignedTo: 'Michael Brown',
        email: 'michael.b@techgiant.com',
        status: 'active',
        activatedDate: '2023-02-15',
        expiryDate: '2024-02-15',
        lastUsed: '2023-05-19'
      }, {
        id: '2',
        assignedTo: 'Emily Davis',
        email: 'emily.d@techgiant.com',
        status: 'active',
        activatedDate: '2023-03-10',
        expiryDate: '2024-03-10',
        lastUsed: '2023-05-15'
      }, {
        id: '3',
        assignedTo: 'David Wilson',
        email: 'david.w@techgiant.com',
        status: 'active',
        activatedDate: '2023-03-20',
        expiryDate: '2024-03-20',
        lastUsed: '2023-05-10'
      }, {
        id: '4',
        assignedTo: 'Jennifer Lee',
        email: 'jennifer.l@techgiant.com',
        status: 'inactive',
        activatedDate: '2023-04-05',
        expiryDate: '2024-04-05',
        lastUsed: '2023-04-25'
      }, {
        id: '5',
        assignedTo: 'Robert Johnson',
        email: 'robert.j@techgiant.com',
        status: 'expired',
        activatedDate: '2022-05-10',
        expiryDate: '2023-05-10',
        lastUsed: '2023-05-05'
      }];
      setLicenses(mockLicenses);
      // Set stats
      setStats({
        total: 100,
        active: 72,
        inactive: 18,
        expired: 10
      });
    } catch (err) {
      console.error('Failed to fetch licenses:', err);
      setError('Failed to load license data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const columns = [{
    header: 'Assigned To',
    accessor: 'assignedTo',
    sortable: true
  }, {
    header: 'Email',
    accessor: 'email',
    sortable: true
  }, {
    header: 'Status',
    accessor: (row: License) => {
      const statusStyles = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-yellow-100 text-yellow-800',
        expired: 'bg-red-100 text-red-800'
      };
      return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[row.status]}`}>
            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          </span>;
    }
  }, {
    header: 'Activated',
    accessor: (row: License) => {
      const date = new Date(row.activatedDate);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
    sortable: true
  }, {
    header: 'Expiry',
    accessor: (row: License) => {
      const date = new Date(row.expiryDate);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    },
    sortable: true
  }, {
    header: 'Last Used',
    accessor: (row: License) => {
      const date = new Date(row.lastUsed);
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
          Licenses Dashboard
        </h1>
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#466EE5]">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>
      {error && <ErrorAlert message={error} onRetry={fetchLicenses} />}
      {loading ? <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <LoadingSkeleton type="card" />
            <LoadingSkeleton type="card" />
            <LoadingSkeleton type="card" />
            <LoadingSkeleton type="card" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LoadingSkeleton type="chart" />
            <LoadingSkeleton type="chart" />
          </div>
          <LoadingSkeleton type="table" />
        </> : <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-[#EFF6FF] text-[#466EE5] mr-4">
                  <Key size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Licenses</p>
                  <p className="text-2xl font-bold">{stats?.total || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-[#ECFDF5] text-green-600 mr-4">
                  <Key size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active</p>
                  <p className="text-2xl font-bold">{stats?.active || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-[#FEF3C7] text-amber-600 mr-4">
                  <Key size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Inactive</p>
                  <p className="text-2xl font-bold">{stats?.inactive || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-[#FEE2E2] text-red-600 mr-4">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expired</p>
                  <p className="text-2xl font-bold">{stats?.expired || 0}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartContainer title="License Status Distribution" type="bar" />
            <ChartContainer title="License Usage Over Time" type="line" />
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">License Details</h2>
              <button className="text-sm text-[#466EE5] hover:text-[#3355cc] flex items-center">
                View All
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            {licenses.length > 0 ? <DataTable columns={columns} data={licenses} keyField="id" searchable pagination /> : <EmptyState title="No licenses found" description="No licenses have been assigned yet." icon={<Key className="h-12 w-12 text-gray-400" />} />}
          </div>
        </>}
    </div>;
};