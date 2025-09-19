import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Building2, Users, Key, CheckCircle, XCircle, AlertCircle, FileText, Clock, MessageSquare } from 'lucide-react';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ErrorAlert } from '../components/ErrorAlert';
import { EmptyState } from '../components/EmptyState';
interface Corporate {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'inactive';
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  licenses: number;
  volunteers: number;
  joinedDate: string;
  lastActivity: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  documents: {
    id: string;
    name: string;
    type: string;
    uploadedAt: string;
    status: 'approved' | 'pending' | 'rejected';
  }[];
  auditTrail: {
    id: string;
    action: string;
    performedBy: string;
    timestamp: string;
    details?: string;
  }[];
  notes: {
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }[];
}
export const CorporateDetail: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [corporate, setCorporate] = useState<Corporate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'audit' | 'notes'>('overview');
  const [note, setNote] = useState('');
  useEffect(() => {
    fetchCorporateDetails();
  }, [id]);
  const fetchCorporateDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock data
      if (id === '1') {
        setCorporate({
          id: '1',
          name: 'TechGiant Inc.',
          status: 'active',
          address: '123 Tech Blvd',
          city: 'San Francisco',
          state: 'CA',
          postalCode: '94105',
          country: 'USA',
          licenses: 100,
          volunteers: 245,
          joinedDate: '2023-01-15',
          lastActivity: '2023-05-20',
          contactName: 'John Smith',
          contactEmail: 'john.smith@techgiant.com',
          contactPhone: '+1 (555) 123-4567',
          documents: [{
            id: 'd1',
            name: 'MOU Document',
            type: 'pdf',
            uploadedAt: '2023-01-10',
            status: 'approved'
          }, {
            id: 'd2',
            name: 'Company Registration',
            type: 'pdf',
            uploadedAt: '2023-01-10',
            status: 'approved'
          }, {
            id: 'd3',
            name: 'Tax Document',
            type: 'pdf',
            uploadedAt: '2023-01-10',
            status: 'approved'
          }],
          auditTrail: [{
            id: 'a1',
            action: 'Corporate approved',
            performedBy: 'Admin User',
            timestamp: '2023-01-15T10:30:00Z',
            details: 'Corporate application approved'
          }, {
            id: 'a2',
            action: 'Licenses allocated',
            performedBy: 'Admin User',
            timestamp: '2023-01-16T14:45:00Z',
            details: 'Allocated 100 licenses'
          }, {
            id: 'a3',
            action: 'Document uploaded',
            performedBy: 'John Smith',
            timestamp: '2023-02-20T09:15:00Z',
            details: 'Uploaded quarterly report'
          }],
          notes: [{
            id: 'n1',
            author: 'Admin User',
            content: 'Initial meeting went well. They are planning to onboard 200+ volunteers over the next quarter.',
            timestamp: '2023-01-20T11:00:00Z'
          }, {
            id: 'n2',
            author: 'Admin User',
            content: 'Follow-up call scheduled for next month to discuss license utilization.',
            timestamp: '2023-02-05T15:30:00Z'
          }]
        });
      } else if (id === '2') {
        setCorporate({
          id: '2',
          name: 'Global Finance Ltd',
          status: 'active',
          address: '456 Finance Ave',
          city: 'New York',
          state: 'NY',
          postalCode: '10004',
          country: 'USA',
          licenses: 75,
          volunteers: 189,
          joinedDate: '2023-02-22',
          lastActivity: '2023-05-18',
          contactName: 'Sarah Johnson',
          contactEmail: 'sarah.j@globalfinance.com',
          contactPhone: '+1 (555) 987-6543',
          documents: [{
            id: 'd1',
            name: 'MOU Document',
            type: 'pdf',
            uploadedAt: '2023-02-15',
            status: 'approved'
          }, {
            id: 'd2',
            name: 'Company Registration',
            type: 'pdf',
            uploadedAt: '2023-02-15',
            status: 'approved'
          }, {
            id: 'd3',
            name: 'Tax Document',
            type: 'pdf',
            uploadedAt: '2023-02-15',
            status: 'approved'
          }],
          auditTrail: [{
            id: 'a1',
            action: 'Corporate approved',
            performedBy: 'Admin User',
            timestamp: '2023-02-22T09:00:00Z',
            details: 'Corporate application approved'
          }, {
            id: 'a2',
            action: 'Licenses allocated',
            performedBy: 'Admin User',
            timestamp: '2023-02-23T11:30:00Z',
            details: 'Allocated 75 licenses'
          }],
          notes: [{
            id: 'n1',
            author: 'Admin User',
            content: 'They have a strong ESG program and are looking to expand their volunteer initiatives.',
            timestamp: '2023-02-25T14:15:00Z'
          }]
        });
      } else {
        // For other IDs, create a generic response
        setCorporate({
          id: id || '0',
          name: `Corporate ${id}`,
          status: 'pending',
          address: '789 Corporate St',
          city: 'Chicago',
          state: 'IL',
          postalCode: '60601',
          country: 'USA',
          licenses: 0,
          volunteers: 0,
          joinedDate: '2023-05-01',
          lastActivity: '2023-05-01',
          contactName: 'Contact Person',
          contactEmail: 'contact@corporate.com',
          contactPhone: '+1 (555) 555-5555',
          documents: [{
            id: 'd1',
            name: 'MOU Document',
            type: 'pdf',
            uploadedAt: '2023-05-01',
            status: 'pending'
          }],
          auditTrail: [{
            id: 'a1',
            action: 'Corporate application submitted',
            performedBy: 'System',
            timestamp: '2023-05-01T12:00:00Z'
          }],
          notes: []
        });
      }
    } catch (err) {
      console.error('Failed to fetch corporate details:', err);
      setError('Failed to load corporate details. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleApprove = () => {
    if (corporate) {
      setCorporate({
        ...corporate,
        status: 'active',
        auditTrail: [{
          id: `a${corporate.auditTrail.length + 1}`,
          action: 'Corporate approved',
          performedBy: 'Admin User',
          timestamp: new Date().toISOString(),
          details: 'Corporate application approved'
        }, ...corporate.auditTrail]
      });
    }
  };
  const handleReject = () => {
    if (corporate) {
      setCorporate({
        ...corporate,
        status: 'inactive',
        auditTrail: [{
          id: `a${corporate.auditTrail.length + 1}`,
          action: 'Corporate rejected',
          performedBy: 'Admin User',
          timestamp: new Date().toISOString(),
          details: 'Corporate application rejected'
        }, ...corporate.auditTrail]
      });
    }
  };
  const handleAddNote = () => {
    if (corporate && note.trim()) {
      setCorporate({
        ...corporate,
        notes: [{
          id: `n${corporate.notes.length + 1}`,
          author: 'Admin User',
          content: note,
          timestamp: new Date().toISOString()
        }, ...corporate.notes]
      });
      setNote('');
    }
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const getStatusBadge = (status: 'active' | 'pending' | 'inactive') => {
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
    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {statusIcons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>;
  };
  const renderTabContent = () => {
    if (!corporate) return null;
    switch (activeTab) {
      case 'overview':
        return <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Corporate Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-sm font-medium">
                      {corporate.address}, {corporate.city}, {corporate.state}{' '}
                      {corporate.postalCode}
                    </p>
                    <p className="text-sm font-medium">{corporate.country}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Joined Date</p>
                    <p className="text-sm font-medium">
                      {formatDate(corporate.joinedDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Activity</p>
                    <p className="text-sm font-medium">
                      {formatDate(corporate.lastActivity)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Primary Contact
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="text-sm font-medium">
                      {corporate.contactName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-sm font-medium">
                      {corporate.contactEmail}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-sm font-medium">
                      {corporate.contactPhone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  License & Volunteer Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-purple-50 text-purple-600 mr-3">
                      <Key size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Licenses</p>
                      <p className="text-lg font-semibold">
                        {corporate.licenses}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-green-50 text-green-600 mr-3">
                      <Users size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Volunteers</p>
                      <p className="text-lg font-semibold">
                        {corporate.volunteers}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-[#466EE5] h-2.5 rounded-full" style={{
                      width: `${corporate.volunteers > 0 ? corporate.volunteers / corporate.licenses * 100 : 0}%`
                    }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      License utilization
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {corporate.status === 'pending' && <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Approval Actions
                </h3>
                <div className="flex space-x-4">
                  <button onClick={handleApprove} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </button>
                  <button onClick={handleReject} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#466EE5]">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Request More Info
                  </button>
                </div>
              </div>}
          </div>;
      case 'documents':
        return <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Documents</h3>
              <p className="text-sm text-gray-500 mt-1">
                Corporate documents and verification files
              </p>
            </div>
            {corporate.documents.length > 0 ? <ul className="divide-y divide-gray-200">
                {corporate.documents.map(doc => <li key={doc.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-blue-50 text-blue-600 mr-3">
                          <FileText size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {doc.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Uploaded on {formatDate(doc.uploadedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${doc.status === 'approved' ? 'bg-green-100 text-green-800' : doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </span>
                        <button className="ml-4 text-sm font-medium text-[#466EE5] hover:text-[#3355cc]">
                          View
                        </button>
                      </div>
                    </div>
                  </li>)}
              </ul> : <div className="p-6">
                <EmptyState title="No documents" description="This corporate has not uploaded any documents yet." icon={<FileText className="h-12 w-12 text-gray-400" />} />
              </div>}
          </div>;
      case 'audit':
        return <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Audit Trail</h3>
              <p className="text-sm text-gray-500 mt-1">
                History of actions and changes
              </p>
            </div>
            {corporate.auditTrail.length > 0 ? <div className="p-6">
                <ul className="space-y-6">
                  {corporate.auditTrail.map(entry => <li key={entry.id} className="relative pl-6 pb-6 border-l border-gray-200 last:pb-0">
                      <div className="absolute -left-1.5 mt-1.5">
                        <div className="h-3 w-3 rounded-full border-2 border-[#466EE5] bg-white"></div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {entry.action}
                          </p>
                          <p className="text-xs text-gray-500">
                            By {entry.performedBy}
                          </p>
                          {entry.details && <p className="text-sm text-gray-600 mt-1">
                              {entry.details}
                            </p>}
                        </div>
                        <div className="mt-1 sm:mt-0 text-xs text-gray-500 sm:text-right">
                          <div className="flex items-center sm:justify-end">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDateTime(entry.timestamp)}
                          </div>
                        </div>
                      </div>
                    </li>)}
                </ul>
              </div> : <div className="p-6">
                <EmptyState title="No audit entries" description="There are no audit trail entries for this corporate." icon={<Clock className="h-12 w-12 text-gray-400" />} />
              </div>}
          </div>;
      case 'notes':
        return <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Notes</h3>
              <p className="text-sm text-gray-500 mt-1">
                Internal notes and comments
              </p>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                  Add Note
                </label>
                <div className="flex">
                  <textarea id="note" rows={3} className="shadow-sm focus:ring-[#466EE5] focus:border-[#466EE5] block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Enter your note here..." value={note} onChange={e => setNote(e.target.value)}></textarea>
                  <button type="button" onClick={handleAddNote} disabled={!note.trim()} className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#466EE5] hover:bg-[#3355cc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#466EE5] disabled:opacity-50 disabled:cursor-not-allowed">
                    Add
                  </button>
                </div>
              </div>
              {corporate.notes.length > 0 ? <ul className="space-y-6">
                  {corporate.notes.map(noteItem => <li key={noteItem.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {noteItem.author}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDateTime(noteItem.timestamp)}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-gray-700">
                        {noteItem.content}
                      </p>
                    </li>)}
                </ul> : <EmptyState title="No notes" description="There are no notes for this corporate yet." icon={<MessageSquare className="h-12 w-12 text-gray-400" />} />}
            </div>
          </div>;
      default:
        return null;
    }
  };
  if (loading) {
    return <div className="space-y-6">
        <div className="flex items-center">
          <Link to="/corporate-management" className="text-[#466EE5] hover:text-[#3355cc] inline-flex items-center">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Corporates
          </Link>
        </div>
        <LoadingSkeleton type="text" count={1} className="w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LoadingSkeleton type="card" />
          <LoadingSkeleton type="card" />
          <LoadingSkeleton type="card" />
        </div>
        <LoadingSkeleton type="card" className="h-64" />
      </div>;
  }
  if (error) {
    return <div className="space-y-6">
        <div className="flex items-center">
          <Link to="/corporate-management" className="text-[#466EE5] hover:text-[#3355cc] inline-flex items-center">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Corporates
          </Link>
        </div>
        <ErrorAlert message={error} onRetry={fetchCorporateDetails} />
      </div>;
  }
  if (!corporate) {
    return <div className="space-y-6">
        <div className="flex items-center">
          <Link to="/corporate-management" className="text-[#466EE5] hover:text-[#3355cc] inline-flex items-center">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Corporates
          </Link>
        </div>
        <EmptyState title="Corporate not found" description="The corporate you are looking for does not exist or has been removed." icon={<Building2 className="h-12 w-12 text-gray-400" />} />
      </div>;
  }
  return <div className="space-y-6">
      <div className="flex items-center">
        <Link to="/corporate-management" className="text-[#466EE5] hover:text-[#3355cc] inline-flex items-center">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Corporates
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
            <Building2 size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">
              {corporate.name}
            </h1>
            <div className="mt-1">{getStatusBadge(corporate.status)}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px" aria-label="Tabs">
            <button onClick={() => setActiveTab('overview')} className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === 'overview' ? 'border-[#466EE5] text-[#466EE5]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} aria-current={activeTab === 'overview' ? 'page' : undefined}>
              Overview
            </button>
            <button onClick={() => setActiveTab('documents')} className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === 'documents' ? 'border-[#466EE5] text-[#466EE5]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} aria-current={activeTab === 'documents' ? 'page' : undefined}>
              Documents
            </button>
            <button onClick={() => setActiveTab('audit')} className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === 'audit' ? 'border-[#466EE5] text-[#466EE5]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} aria-current={activeTab === 'audit' ? 'page' : undefined}>
              Audit Trail
            </button>
            <button onClick={() => setActiveTab('notes')} className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === 'notes' ? 'border-[#466EE5] text-[#466EE5]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`} aria-current={activeTab === 'notes' ? 'page' : undefined}>
              Notes
            </button>
          </nav>
        </div>
      </div>

      {renderTabContent()}
    </div>;
};