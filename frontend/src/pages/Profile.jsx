import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api/axios';

const Profile = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bloodGroup: user?.bloodGroup || '',
    city: user?.city || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Note: You'll need to create an update profile endpoint in the backend
      const response = await fetch('http://localhost:3000/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        login(localStorage.getItem('token'), updatedUser);
        setMessage('Profile updated successfully!');
      } else {
        setMessage('Failed to update profile');
      }
    } catch (error) {
      setMessage('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Edit Profile</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Update your information to help us connect you better
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-10 shadow-lg border border-gray-100 fade-in-up">
            {message && (
              <div className={`mb-8 p-4 rounded-xl ${
                message.includes('successfully') 
                  ? 'bg-green-50 border border-green-200 text-green-700' 
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                <div className="flex items-center">
                  <span className="text-xl mr-3">
                    {message.includes('successfully') ? '✅' : '⚠️'}
                  </span>
                  <span className="font-medium">{message}</span>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-4">
                  👤 Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field w-full text-lg"
                />
              </div>
              
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-4">
                  📧 Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field w-full text-lg"
                />
              </div>
              
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-4">
                  🩸 Blood Group
                </label>
                <select
                  name="bloodGroup"
                  required
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="select-field w-full text-lg"
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-4">
                  📍 City
                </label>
                <input
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g., Mumbai, Delhi, Bangalore"
                  className="input-field w-full text-lg"
                />
              </div>
              
              <div className="flex gap-6 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary text-white py-4 px-8 rounded-xl text-lg font-bold hover:bg-red-600 transition-all duration-300 shadow-lg disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="spinner w-5 h-5 mr-3"></div>
                      Updating...
                    </div>
                  ) : (
                    '💾 Update Profile'
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;