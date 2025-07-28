import React, { useState, useEffect } from 'react';
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
  const [newAnimalData, setNewAnimalData] = useState({
    name: '', animal_type: 'COW', breed: '', age: '', price: '', description: '', quantity: 1, image: null,
  });

  const fetchListings = async () => {
    try {
      setLoading(true);
      const animals = await apiClient.get('/api/animals/', tokens.access);
      setListings(animals.filter(a => a.farmer === user.id));
    } catch {
      setError('⚠️ Failed to fetch.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewAnimalData({ name: '', animal_type: 'COW', breed: '', age: '', price: '', description: '', quantity: 1, image: null });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setNewAnimalData(prev => ({ ...prev, [name]: name === 'image' ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(newAnimalData).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });
    try {
      await apiClient.postWithFile('/api/animals/', formData, tokens.access);
      handleCloseModal();
      fetchListings();
    } catch {
      setError('❌ Failed to create.');
    }
  };

  const handleDelete = async (animalId) => {
    if (window.confirm('Delete listing?')) {
      try {
        await apiClient.delete(`/api/animals/${animalId}/`, tokens.access);
        fetchListings();
      } catch {
        setError('❌ Failed to delete.');
      }
    }
  };

  return (
    <div className="p-3 bg-white min-h-screen">
      <div className="container mx-auto">
        <div className="flex justify-between mb-3 gap-2">
          <h1 className="text-xl font-bold text-green-900">Listings</h1>
          <Button 
            onClick={handleOpenModal} 
            className="bg-green-600 hover:bg-green-700 text-white text-xs py-1 px-2 rounded-full"
          >
            Add New Listing
          </Button>
        </div>

        {loading && <div className="flex justify-center py-4"><Spinner className="w-6 h-6 text-green-600" /></div>}

        {error && (
          <div className="bg-red-100 text-red-800 p-2 rounded border border-red-300 mb-2">
            {error}
          </div>
        )}

        {!loading && listings.length === 0 && (
          <div className="text-center bg-white py-6 px-2 rounded border border-gray-100">
            <p className="text-sm text-gray-700">No listings.</p>
          </div>
        )}

        {!loading && listings.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {listings.map(animal => (
              <div 
                key={animal.id} 
                className="bg-white shadow rounded p-2 border border-gray-100"
              >
                <h3 className="text-xs font-semibold text-gray-800">{animal.name}</h3>
                <p className="text-gray-600 text-xs">{animal.animal_type} • {animal.quantity}</p>
                <p className="text-gray-800 text-xs mt-1">Ksh {parseFloat(animal.price).toLocaleString()}</p>
                <Button 
                  onClick={() => handleDelete(animal.id)} 
                  className="mt-1 bg-red-600 hover:bg-red-700 text-white text-xs py-1 px-2 rounded-full w-full"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}

        <Modal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          title="Add"
          className="bg-white rounded shadow max-w-xs w-full mx-4"
        >
          <form onSubmit={handleSubmit} className="space-y-2 text-xs p-2">
            <input
              name="name"
              value={newAnimalData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="w-full p-1 border border-gray-300 rounded focus:ring-1 focus:ring-green-400"
            />
            <select
              name="animal_type"
              value={newAnimalData.animal_type}
              onChange={handleChange}
              className="w-full p-1 border border-gray-300 rounded focus:ring-1 focus:ring-green-400"
            >
              <option value="COW">Cow</option>
              <option value="GOAT">Goat</option>
              <option value="SHEEP">Sheep</option>
              <option value="CHICKEN">Chicken</option>
              <option value="PIG">Pig</option>
            </select>
            <input
              name="breed"
              value={newAnimalData.breed}
              onChange={handleChange}
              placeholder="Breed"
              required
              className="w-full p-1 border border-gray-300 rounded focus:ring-1 focus:ring-green-400"
            />
            <input
              name="age"
              type="number"
              value={newAnimalData.age}
              onChange={handleChange}
              placeholder="Age"
              required
              className="w-full p-1 border border-gray-300 rounded focus:ring-1 focus:ring-green-400"
            />
            <input
              name="price"
              type="number"
              step="0.01"
              value={newAnimalData.price}
              onChange={handleChange}
              placeholder="Price"
              required
              className="w-full p-1 border border-gray-300 rounded focus:ring-1 focus:ring-green-400"
            />
            <input
              name="quantity"
              type="number"
              value={newAnimalData.quantity}
              onChange={handleChange}
              placeholder="Qty"
              required
              className="w-full p-1 border border-gray-300 rounded focus:ring-1 focus:ring-green-400"
            />
            <textarea
              name="description"
              value={newAnimalData.description}
              onChange={handleChange}
              placeholder="Desc"
              required
              className="w-full p-1 border border-gray-300 rounded focus:ring-1 focus:ring-green-400 h-12 resize-none"
            />
            <input
              name="image"
              type="file"
              onChange={handleChange}
              accept="image/*"
              className="w-full p-1 border border-gray-300 rounded file:mr-1 file:py-1 file:px-1 file:rounded file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
            />
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 text-white text-xs py-1 rounded-full"
            >
              Add
            </Button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default FarmerListingsPage;