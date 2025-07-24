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
      const allAnimals = await apiClient.get('/api/animals/', tokens.access);
      const myListings = allAnimals.filter(animal => animal.farmer === user.id);
      setListings(myListings);
    } catch {
      setError('⚠️ Failed to fetch listings.');
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
    setNewAnimalData({
      name: '', animal_type: 'COW', breed: '', age: '', price: '', description: '', quantity: 1, image: null,
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setNewAnimalData(prev => ({ ...prev, image: files[0] }));
    } else {
      setNewAnimalData(prev => ({ ...prev, [name]: value }));
    }
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
      setError('❌ Failed to create listing. Please check your input.');
    }
  };

  const handleDelete = async (animalId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await apiClient.delete(`/api/animals/${animalId}/`, tokens.access);
        fetchListings();
      } catch {
        setError('❌ Failed to delete listing.');
      }
    }
  };

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-green-800">Manage Listings</h1>
        <Button onClick={handleOpenModal} variant="secondary">+ Add New Animal</Button>
      </div>

      {loading && <Spinner />}

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md border border-red-300 mb-4">
          {error}
        </div>
      )}

      {!loading && listings.length === 0 && (
        <div className="text-center text-gray-600 bg-white py-12 rounded shadow-sm">
          <p className="text-lg">You haven't listed any animals yet.</p>
        </div>
      )}

      {!loading && listings.length > 0 && (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Stock</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {listings.map(animal => (
                <tr key={animal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{animal.name}</td>
                  <td className="px-6 py-4">{animal.animal_type}</td>
                  <td className="px-6 py-4">{animal.quantity}</td>
                  <td className="px-6 py-4">Ksh {parseFloat(animal.price).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <Button onClick={() => handleDelete(animal.id)} variant="danger">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Add New Animal Listing">
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <input
            name="name"
            value={newAnimalData.name}
            onChange={handleChange}
            placeholder="Animal Name (e.g., Bessie)"
            required
            className="w-full p-2 border rounded-md focus:ring-green-300 focus:outline-none"
          />
          <select
            name="animal_type"
            value={newAnimalData.animal_type}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
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
            placeholder="Breed (e.g., Friesian)"
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            name="age"
            type="number"
            value={newAnimalData.age}
            onChange={handleChange}
            placeholder="Age in months"
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            name="price"
            type="number"
            step="0.01"
            value={newAnimalData.price}
            onChange={handleChange}
            placeholder="Price (Ksh)"
            required
            className="w-full p-2 border rounded-md"
          />
          <input
            name="quantity"
            type="number"
            value={newAnimalData.quantity}
            onChange={handleChange}
            placeholder="Available Quantity"
            required
            className="w-full p-2 border rounded-md"
          />
          <textarea
            name="description"
            value={newAnimalData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            className="w-full p-2 border rounded-md"
          />
          <div>
            <label className="block mb-1 font-medium text-gray-700">Image</label>
            <input
              name="image"
              type="file"
              onChange={handleChange}
              accept="image/*"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <Button type="submit" variant="secondary" className="w-full">Create Listing</Button>
        </form>
      </Modal>
    </div>
  );
};

export default FarmerListingsPage;