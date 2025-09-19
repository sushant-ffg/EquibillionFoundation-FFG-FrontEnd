import React, { useEffect, useState } from 'react';
import { Plus, UserCheck, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ErrorAlert } from '../components/ErrorAlert';
import { EmptyState } from '../components/EmptyState';
interface Volunteer {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'pending' | 'inactive';
  corporate: string;
  corporateId: string;
  skills: string[];
  hoursContributed: number;
  projectsCompleted: number;
  joinedDate: string;
  lastActivity: string;
}
export const VolunteerManagement: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const {
    user
  } = {
    user: {
      role: 'super_admin'
    }
  }; // Replace with actual auth context
  useEffect(() => {
    fetchVolunteers();
  }, []);
  const fetchVolunteers = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock data
      const mockVolunteers: Volunteer[] = [{
        id: '1',
        name: 'Michael Brown',
        email: 'michael.b@techgiant.com',
        status: 'active',
        corporate: 'TechGiant Inc.',
        corporateId: '1',
        skills: ['Web Development', 'UI/UX Design'],
        hoursContributed: 120,
        projectsCompleted: 4,
        joinedDate: '2023-02-10',
        lastActivity: '2023-05-19'
      }, {
        id: '2',
        name: 'Emily Davis',
        email: 'emily.d@techgiant.com',
        status: 'active',
        corporate: 'TechGiant Inc.',
        corporateId: '1',
        skills: ['Project Management', 'Content Creation'],
        hoursContributed: 85,
        projectsCompleted: 3,
        joinedDate: '2023-03-05',
        lastActivity: '2023-05-15'
      }, {
        id: '3',
        name: 'James Wilson',
        email: 'james.w@globalfinance.com',
        status: 'active',
        corporate: 'Global Finance Ltd',
        corporateId: '2',
        skills: ['Financial Analysis', 'Data Science'],
        hoursContributed: 65,
        projectsCompleted: 2,
        joinedDate: '2023-03-15',
        lastActivity: '2023-05-10'
      }, {
        id: '4',
        name: 'Sophia Martinez',
        email: 'sophia.m@acme.com',
        status: 'active',
        corporate: 'Acme Corporation',
        corporateId: '3',
        skills: ['Marketing', 'Social Media'],
        hoursContributed: 40,
        projectsCompleted: 1,
        joinedDate: '2023-04-02',
        lastActivity: '2023-05-05'
      }, {
        id: '5',
        name: 'David Johnson',
        email: 'david.j@oceanic.com',
        status: 'pending',
        corporate: 'Oceanic Airlines',
        corporateId: '4',
        skills: ['Customer Service', 'Event Planning'],
        hoursContributed: 0,
        projectsCompleted: 0,
        joinedDate: '2023-05-10',
        lastActivity: '2023-05-10'
      }];
      setVolunteers(mockVolunteers);
    } catch (err) {
      console.error('Failed to fetch volunteers:', err);
      setError('Failed to load volunteer data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteVolunteer = (volunteer: Volunteer) => {
    // In a real app, this would call an API
    setVolunteers(prev => prev.filter(v => v.id !== volunteer.id));
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
    accessor: (row: Volunteer) => {
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
    header: 'Skills',
    accessor: (row: Volunteer) => {
      return <div className="flex flex-wrap gap-1">
            {row.skills.map((skill, index) => <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                {skill}
              </span>)}
          </div>;
    }
  }, {
    header: 'Hours',
    accessor: 'hoursContributed',
    sortable: true
  }, {
    header: 'Projects',
    accessor: 'projectsCompleted',
    sortable: true
  }, {
    header: 'Joined',
    accessor: (row: Volunteer) => {
      const date = new Date(row.joinedDate);
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
          Volunteer Management
        </h1>
        <button onClick={() => setShowAddModal(true)} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#466EE5] hover:bg-[#3355cc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#466EE5]">
          <Plus className="h-4 w-4 mr-2" />
          Add Volunteer
        </button>
      </div>
      {error && <ErrorAlert message={error} onRetry={fetchVolunteers} />}
      {loading ? <LoadingSkeleton type="table" /> : volunteers.length === 0 ? <EmptyState title="No volunteers found" description="Get started by adding your first volunteer." actionLabel="Add Volunteer" onAction={() => setShowAddModal(true)} icon={<UserCheck className="h-12 w-12 text-gray-400" />} /> : <DataTable columns={columns} data={volunteers} keyField="id" onDelete={handleDeleteVolunteer} searchable pagination />}
    </div>;
};