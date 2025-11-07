import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestAPI } from '../api/axios';
import { Droplet, MapPin, MessageSquare, AlertCircle } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';

const CreateRequest = () => {
  const [formData, setFormData] = useState({
    bloodGroup: '',
    unitsNeeded: 1,
    location: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  
  const navigate = useNavigate();
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
    setError('');

    try {
      await requestAPI.create(formData);
      navigate('/requests');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create request');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && !formData.bloodGroup) {
      setError('Please select a blood group');
      return;
    }
    if (step === 2 && (!formData.unitsNeeded || formData.unitsNeeded < 1)) {
      setError('Please enter valid units needed');
      return;
    }
    setError('');
    setStep(step + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fade-in">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Create Blood Request</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Help us connect you with the right donors
            </p>
          </div>
          
          {/* Progress Steps */}
          <ul className="steps steps-horizontal w-full mb-8">
            <li className={`step ${step >= 1 ? 'step-primary' : ''}`}>Blood Type</li>
            <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>Details</li>
            <li className={`step ${step >= 3 ? 'step-primary' : ''}`}>Location</li>
            <li className={`step ${step >= 4 ? 'step-primary' : ''}`}>Review</li>
          </ul>
          
          <div className="bg-gray-50 rounded-lg shadow-md border border-gray-100 p-8">
            <div className="card-body">
              {error && (
                <div className="alert alert-error mb-6">
                  <AlertCircle size={20} />
                  <span>{error}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Blood Group */}
                {step === 1 && (
                  <div className="fade-in">
                    <label className="label">
                      <span className="label-text heading-sm">Which blood group do you need?</span>
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {bloodGroups.map(group => (
                        <button
                          key={group}
                          type="button"
                          onClick={() => setFormData({...formData, bloodGroup: group})}
                          className={`btn ${formData.bloodGroup === group ? 'btn-primary' : 'btn-outline'}`}
                        >
                          {group}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Units */}
                {step === 2 && (
                  <div className="fade-in">
                    <label className="label">
                      <span className="label-text heading-sm">How many units do you need?</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={formData.unitsNeeded}
                      onChange={handleChange}
                      name="unitsNeeded"
                      className="range range-primary"
                      step="1"
                    />
                    <div className="flex justify-between text-xs px-2 mt-2">
                      {[1,2,3,4,5,6,7,8,9,10].map(i => (
                        <span key={i}>|</span>
                      ))}
                    </div>
                    <div className="text-center mt-4">
                      <span className="heading-xl text-primary">{formData.unitsNeeded}</span>
                      <span className="body-lg text-neutral/70 ml-2">units</span>
                    </div>
                  </div>
                )}

                {/* Step 3: Location */}
                {step === 3 && (
                  <div className="fade-in space-y-4">
                    <div>
                      <label htmlFor="location" className="label">
                        <span className="label-text heading-sm">
                          <MapPin size={20} className="inline mr-2" />
                          Where is the blood needed?
                        </span>
                      </label>
                      <input
                        id="location"
                        name="location"
                        type="text"
                        required
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g., City Hospital, Mumbai"
                        className="input input-bordered w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="label">
                        <span className="label-text heading-sm">
                          <MessageSquare size={20} className="inline mr-2" />
                          Additional Information (Optional)
                        </span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Any additional information about urgency, patient condition, or special requirements..."
                        className="textarea textarea-bordered w-full"
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Review */}
                {step === 4 && (
                  <div className="fade-in">
                    <h3 className="heading-md text-neutral mb-6">Review Your Request</h3>
                    <div className="space-y-4">
                      <div className="card bg-base-200">
                        <div className="card-body">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Blood Group</p>
                              <p className="heading-sm text-primary">{formData.bloodGroup}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Units Needed</p>
                              <p className="heading-sm text-neutral">{formData.unitsNeeded}</p>
                            </div>
                            <div className="col-span-2">
                              <p className="text-sm text-gray-600 mb-1">Location</p>
                              <p className="text-base text-gray-700">{formData.location}</p>
                            </div>
                            {formData.message && (
                              <div className="col-span-2">
                                <p className="text-sm text-gray-600 mb-1">Message</p>
                                <p className="text-base text-gray-700">{formData.message}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-8">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn btn-outline flex-1"
                    >
                      Previous
                    </button>
                  )}
                  
                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn btn-primary flex-1"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary flex-1"
                    >
                      {loading ? (
                        <>
                          <span className="loading loading-spinner"></span>
                          Creating...
                        </>
                      ) : (
                        <>
                          <Droplet size={20} />
                          Submit Request
                        </>
                      )}
                    </button>
                  )}
                  
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRequest;