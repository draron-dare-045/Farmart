import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import apiClient from '../../api/client';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

const FarmerListingsPage = () => {
  const { user, tokens } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null); 
  const [formData, setFormData] = useState({});

  const fetchListings = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const animals = await apiClient.get('/api/animals/', tokens.access);
      setListings(animals.filter(a => a.farmer_username === user.username));
    } catch {
      setError('⚠️ Failed to fetch your listings.');
    } finally {
      setLoading(false);
    }
  }, [user, tokens.access]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleOpenModal = (animal = null) => {
    if (animal) {
      setEditingAnimal(animal);
      setFormData({
        name: animal.name,
        animal_type: animal.animal_type,
        breed: animal.breed,
        age: animal.age,
        price: animal.price,
        description: animal.description,
        quantity: animal.quantity,
        image: null, 
      });
    } else {
      
      setEditingAnimal(null);
      setFormData({
        name: '', animal_type: 'COW', breed: '', age: '', price: '', description: '', quantity: 1, image: null,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAnimal(null);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'image' ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        data.append(key, value);
      }
    });

    try {
      if (editingAnimal) {
        await apiClient.patchWithFile(`/api/animals/${editingAnimal.id}/`, data, tokens.access);
      } else {
        await apiClient.postWithFile('/api/animals/', data, tokens.access);
      }
      handleCloseModal();
      fetchListings(); 
    } catch (err) {
      const errorDetail = err.data ? JSON.stringify(err.data) : 'An unknown error occurred.';
      setError(`❌ Failed to ${editingAnimal ? 'update' : 'create'} listing: ${errorDetail}`);
    }
  };

  const handleDelete = async (animalId) => {
    if (window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      try {
        await apiClient.delete(`/api/animals/${animalId}/`, tokens.access);
        fetchListings();
      } catch {
        setError('❌ Failed to delete listing.');
      }
    }
  };

  if (loading) return <Spinner fullScreen />;

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Livestock Listings</h1>
          <Button onClick={() => handleOpenModal()} variant="primary">
            + Add New Listing
          </Button>
        </div>

        {error && <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-6">{error}</div>}

        {!loading && listings.length === 0 ? (
          <div className="text-center bg-white py-12 px-4 rounded-lg border">
            <p className="text-lg font-medium text-gray-700">You have no active listings.</p>
            <p className="text-gray-500 mt-2">Click "Add New Listing" to put your livestock on the market!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map(animal => (
              <div key={animal.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <div className="h-48 w-full bg-gray-200">
                  {animal.image ? (
                    <img 
                      src={animal.image} 
                      alt={animal.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900">{animal.name}</h3>
                  <p className="text-sm text-gray-500">{animal.breed}</p>
                  <p className="text-2xl font-bold text-green-600 mt-2">Ksh {parseFloat(animal.price).toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mt-1">Stock: {animal.quantity}</p>
                  <div className="mt-auto pt-4 flex gap-2">
                    <Button onClick={() => handleOpenModal(animal)} variant="secondary" size="sm" className="flex-1">Edit</Button>
                    <Button onClick={() => handleDelete(animal.id)} variant="danger" size="sm" className="flex-1">Delete</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingAnimal ? 'Edit Listing' : 'Add New Listing'}>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <input name="name" value={formData.name || ''} onChange={handleChange} placeholder="Animal Name" required className="w-full p-2 border rounded-md"/>
            <select name="animal_type" value={formData.animal_type || 'COW'} onChange={handleChange} className="w-full p-2 border rounded-md">
              <option value="COW">Cow</option> <option value="GOAT">Goat</option> <option value="SHEEP">Sheep</option> <option value="CHICKEN">Chicken</option> <option value="PIG">Pig</option>
            </select>
            <input name="breed" value={formData.breed || ''} onChange={handleChange} placeholder="Breed" required className="w-full p-2 border rounded-md"/>
            <input name="age" type="number" value={formData.age || ''} onChange={handleChange} placeholder="Age in months" required className="w-full p-2 border rounded-md"/>
            <input name="price" type="number" step="0.01" value={formData.price || ''} onChange={handleChange} placeholder="Price (Ksh)" required className="w-full p-2 border rounded-md"/>
            <input name="quantity" type="number" value={formData.quantity || ''} onChange={handleChange} placeholder="Quantity" required className="w-full p-2 border rounded-md"/>
            <textarea name="description" value={formData.description || ''} onChange={handleChange} placeholder="Description" required className="w-full p-2 border rounded-md h-24"/>
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-1">Image</label>
              <input name="image" type="file" onChange={handleChange} accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"/>
              {editingAnimal && <p className="text-xs text-gray-400 mt-1">Leave blank to keep the current image.</p>}
            </div>
            <Button type="submit" variant="primary" className="w-full">
              {editingAnimal ? 'Save Changes' : 'Create Listing'}
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default FarmerListingsPage;
