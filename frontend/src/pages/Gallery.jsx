import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { galleryAPI } from '../api/axios';

const Gallery = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadData, setUploadData] = useState({ imageUrl: '', message: '' });
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await galleryAPI.getAll();
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching gallery posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setUploadData({...uploadData, imageUrl: previewUrl});
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch('http://localhost:3000/upload/image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Upload failed');
    }
    
    const data = await response.json();
    return data.imageUrl;
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile && !uploadData.imageUrl.trim()) return;
    
    setUploading(true);
    try {
      let finalImageUrl;
      
      if (selectedFile) {
        finalImageUrl = await uploadToCloudinary(selectedFile);
      } else {
        // Clean blob URL and use provided URL
        finalImageUrl = uploadData.imageUrl.startsWith('blob:') ? '' : uploadData.imageUrl;
        if (!finalImageUrl) {
          alert('Please provide a valid image URL or select a file to upload.');
          setUploading(false);
          return;
        }
      }
      
      await galleryAPI.create({
        imageUrl: finalImageUrl,
        message: uploadData.message
      });
      
      setUploadData({ imageUrl: '', message: '' });
      setSelectedFile(null);
      setShowUpload(false);
      fetchPosts();
    } catch (error) {
      console.error('Error uploading post:', error);
      alert('Failed to upload post. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      'O+': 'bg-red-500',
      'O-': 'bg-red-600',
      'A+': 'bg-blue-500',
      'A-': 'bg-blue-600',
      'B+': 'bg-green-500',
      'B-': 'bg-green-600',
      'AB+': 'bg-purple-500',
      'AB-': 'bg-purple-600'
    };
    return colors[bloodGroup] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Donor Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating our heroes and their life-saving contributions
          </p>
          {user && (
            <div className="mt-8">
              <button
                onClick={() => setShowUpload(!showUpload)}
                className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg"
              >
                📸 Share Your Donation Story
              </button>
            </div>
          )}
        </div>

        {/* Upload Form */}
        {showUpload && user && (
          <div className="mb-12 fade-in">
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Share Your Story</h3>
              <form onSubmit={handleUpload} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    📷 Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="input-field w-full"
                  />
                  {uploadData.imageUrl && (
                    <div className="mt-4">
                      <img 
                        src={uploadData.imageUrl} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    🔗 Or paste image URL (recommended)
                  </label>
                  <input
                    type="url"
                    value={selectedFile ? '' : uploadData.imageUrl}
                    onChange={(e) => {
                      if (!selectedFile) {
                        setUploadData({...uploadData, imageUrl: e.target.value});
                      }
                    }}
                    placeholder="https://images.unsplash.com/photo-example.jpg"
                    className="input-field w-full"
                    disabled={!!selectedFile}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Use free image hosting like Unsplash, Imgur, or upload to your own server
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    💬 Your Message (Optional)
                  </label>
                  <textarea
                    value={uploadData.message}
                    onChange={(e) => setUploadData({...uploadData, message: e.target.value})}
                    placeholder="Share your donation experience..."
                    className="textarea-field w-full"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={uploading || (!selectedFile && !uploadData.imageUrl.trim())}
                    className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 disabled:opacity-50"
                  >
                    {uploading ? 'Uploading...' : '📤 Share Post'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowUpload(false)}
                    className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-400 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in-up">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 card-hover">
              <div className="relative">
                <img
                  src={post.imageUrl}
                  alt={post.user.name}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400';
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span className={`${getBloodGroupColor(post.user.bloodGroup)} text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg`}>
                    {post.user.bloodGroup}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{post.user.name}</h3>
                <p className="text-gray-600 mb-4 italic">
                  {post.message ? `"${post.message}"` : '"Proud to be a donor!"'}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-red-500">❤️</span>
                    <span className="text-sm font-medium text-gray-700">Life Saver</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600">Be the first to share your donation story!</p>
          </div>
        )}

        {/* Call to Action */}
        {!user && (
          <div className="mt-20 text-center fade-in">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-12 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Want to Join Our Gallery?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Become a donor today and inspire others with your story
              </p>
              <a href="/signup" className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-600 transition-all duration-300 shadow-lg inline-block">
                🩸 Become a Donor
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;