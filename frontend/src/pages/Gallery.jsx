import { useState } from 'react';
import { Upload, Filter, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SectionHeading from '../components/SectionHeading';

const Gallery = () => {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [filterBloodGroup, setFilterBloodGroup] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Mock gallery data
  const galleryPhotos = [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1631815585553-a8a8d2361e2e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw5fHxibG9vZCUyMGRvbmF0aW9uJTIwbWVkaWNhbCUyMHByb2NlZHVyZSUyMGFybSUyMG5lZWRsZXxlbnwwfDF8fHwxNzYyNTQ0NzUzfDA&ixlib=rb-4.1.0&q=85',
      donorName: 'John Doe',
      bloodGroup: 'O+',
      date: '2024-01-15',
      caption: 'Proud to donate for the 10th time!',
      attribution: 'CDC on Unsplash'
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1606619353143-8e11b4bdf76b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw3fHxibG9vZCUyMGRvbmF0aW9uJTIwbWVkaWNhbCUyMHByb2NlZHVyZSUyMGFybSUyMG5lZWRsZXxlbnwwfDF8fHwxNzYyNTQ0NzUzfDA&ixlib=rb-4.1.0&q=85',
      donorName: 'Sarah Smith',
      bloodGroup: 'A+',
      date: '2024-01-20',
      caption: 'First time donor - feeling amazing!',
      attribution: 'Kristine Wook on Unsplash'
    },
    {
      id: 3,
      imageUrl: 'https://i.pravatar.cc/400?img=5',
      donorName: 'Michael Johnson',
      bloodGroup: 'B+',
      date: '2024-01-25',
      caption: 'Saving lives one donation at a time',
      attribution: 'pravatar.cc'
    },
    {
      id: 4,
      imageUrl: 'https://i.pravatar.cc/400?img=8',
      donorName: 'Emily Davis',
      bloodGroup: 'AB+',
      date: '2024-02-01',
      caption: 'Happy to help my community',
      attribution: 'pravatar.cc'
    },
    {
      id: 5,
      imageUrl: 'https://i.pravatar.cc/400?img=12',
      donorName: 'David Wilson',
      bloodGroup: 'O-',
      date: '2024-02-05',
      caption: 'Universal donor, universal hero!',
      attribution: 'pravatar.cc'
    },
    {
      id: 6,
      imageUrl: 'https://i.pravatar.cc/400?img=15',
      donorName: 'Lisa Anderson',
      bloodGroup: 'A-',
      date: '2024-02-10',
      caption: 'Donation day is the best day',
      attribution: 'pravatar.cc'
    }
  ];

  const filteredPhotos = filterBloodGroup
    ? galleryPhotos.filter(photo => photo.bloodGroup === filterBloodGroup)
    : galleryPhotos;

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="heading-xl text-neutral mb-4">Donor Gallery</h2>
            <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
              Celebrating our heroes and their life-saving contributions
            </p>
          </div>
          {user && (
            <button 
              onClick={() => setShowUploadModal(true)}
              className="btn btn-primary"
            >
              <Upload size={20} />
              Upload Photo
            </button>
          )}
        </div>

          {/* Filter Section */}
        <div className="card bg-white shadow-lg mb-8">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <Filter size={20} className="text-primary" />
              <select
                value={filterBloodGroup}
                onChange={(e) => setFilterBloodGroup(e.target.value)}
                className="select select-bordered w-full max-w-xs"
              >
                <option value="">All Blood Groups</option>
                {bloodGroups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
              {filterBloodGroup && (
                <button 
                  onClick={() => setFilterBloodGroup('')}
                  className="btn btn-ghost btn-sm"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div 
              key={photo.id}
              className="card bg-white shadow-xl hover-lift cursor-pointer"
              onClick={() => setSelectedImage(photo)}
            >
              <figure className="h-64 overflow-hidden">
                <img 
                  src={photo.imageUrl} 
                  alt={`${photo.donorName} - ${photo.attribution}`}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="heading-sm text-neutral">{photo.donorName}</h3>
                  <div className="badge badge-primary">{photo.bloodGroup}</div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{photo.caption}</p>
                <p className="text-sm text-gray-500">
                  {new Date(photo.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No photos found for the selected filter.</p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <button 
              onClick={() => setSelectedImage(null)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              <X size={20} />
            </button>
            <figure className="mb-4">
              <img 
                src={selectedImage.imageUrl} 
                alt={`${selectedImage.donorName} - ${selectedImage.attribution}`}
                className="w-full rounded-lg"
              />
            </figure>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="heading-md text-neutral mb-2">{selectedImage.donorName}</h3>
                <p className="text-base text-gray-600">{selectedImage.caption}</p>
              </div>
              <div className="badge badge-primary badge-lg">{selectedImage.bloodGroup}</div>
            </div>
            <p className="text-sm text-gray-600">
              Donated on {new Date(selectedImage.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setSelectedImage(null)}>close</button>
          </form>
        </dialog>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="heading-md text-neutral mb-4">Upload Donation Photo</h3>
            <form className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input 
                  type="file" 
                  accept="image/*"
                  className="file-input file-input-bordered w-full" 
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Caption</span>
                </label>
                <textarea 
                  className="textarea textarea-bordered w-full" 
                  placeholder="Share your donation experience..."
                  rows="3"
                ></textarea>
              </div>
              <div className="modal-action">
                <button 
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Upload
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setShowUploadModal(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default Gallery;