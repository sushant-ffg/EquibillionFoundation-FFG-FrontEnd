import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, AlertCircle } from 'lucide-react';
export const IndividualSignup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    corporateCode: '',
    skills: [] as string[],
    termsAccepted: false
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const handleSkillChange = (skill: string) => {
    setFormData(prev => {
      const updatedSkills = prev.skills.includes(skill) ? prev.skills.filter(s => s !== skill) : [...prev.skills, skill];
      return {
        ...prev,
        skills: updatedSkills
      };
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    if (!formData.termsAccepted) {
      setFormError('You must accept the terms and conditions');
      return;
    }
    setFormStatus('submitting');
    setFormError('');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };
  const skillOptions = ['Web Development', 'UI/UX Design', 'Project Management', 'Content Creation', 'Marketing', 'Social Media', 'Financial Analysis', 'Data Science', 'Event Planning', 'Customer Service'];
  if (formStatus === 'success') {
    return <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="mt-4 text-lg font-medium text-gray-900">
              Application Submitted
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Thank you for your interest in Equibillion Foundation. We have
              received your application and will review it shortly.
            </p>
            <div className="mt-6">
              <Link to="/login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#466EE5] hover:bg-[#3355cc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#466EE5]">
                Return to Login
              </Link>
            </div>
          </div>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-[#F9FAFB] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#111827]">
            Equibillion Foundation
          </h1>
          <h2 className="mt-2 text-xl font-semibold text-[#374151]">
            Individual Registration
          </h2>
          <p className="mt-2 text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-[#466EE5] hover:text-[#3355cc]">
              Sign in
            </Link>
          </p>
        </div>
        {formError && <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start" role="alert">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
            <span>{formError}</span>
          </div>}
        <div className="bg-white shadow rounded-lg p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" name="firstName" id="firstName" required value={formData.firstName} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#466EE5] focus:border-[#466EE5]" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" name="lastName" id="lastName" required value={formData.lastName} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#466EE5] focus:border-[#466EE5]" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input type="email" name="email" id="email" required value={formData.email} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#466EE5] focus:border-[#466EE5]" />
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input type="password" name="password" id="password" required value={formData.password} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#466EE5] focus:border-[#466EE5]" />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input type="password" name="confirmPassword" id="confirmPassword" required value={formData.confirmPassword} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#466EE5] focus:border-[#466EE5]" />
                </div>
              </div>
              <div>
                <label htmlFor="corporateCode" className="block text-sm font-medium text-gray-700">
                  Corporate Code (Optional)
                </label>
                <input type="text" name="corporateCode" id="corporateCode" value={formData.corporateCode} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#466EE5] focus:border-[#466EE5]" placeholder="Enter code if you're joining through a corporate partner" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {skillOptions.map(skill => <div key={skill} className="flex items-center">
                      <input id={`skill-${skill}`} name={`skill-${skill}`} type="checkbox" className="h-4 w-4 text-[#466EE5] focus:ring-[#466EE5] border-gray-300 rounded" checked={formData.skills.includes(skill)} onChange={() => handleSkillChange(skill)} />
                      <label htmlFor={`skill-${skill}`} className="ml-2 block text-sm text-gray-700">
                        {skill}
                      </label>
                    </div>)}
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="termsAccepted" name="termsAccepted" type="checkbox" checked={formData.termsAccepted} onChange={handleInputChange} className="h-4 w-4 text-[#466EE5] focus:ring-[#466EE5] border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-[#466EE5]">
                      terms and conditions
                    </a>
                  </label>
                </div>
              </div>
              <div>
                <button type="submit" disabled={formStatus === 'submitting'} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#466EE5] hover:bg-[#3355cc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#466EE5] disabled:opacity-70">
                  {formStatus === 'submitting' ? <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span> : 'Register'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>;
};