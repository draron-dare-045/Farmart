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

  const [formData, setFormData] = useState({
    name: '',
    animal_type: 'COW',
    breed: '',
    age: '',
    price: '',
    description: '',
    quantity: 1,
    image: null,
  });

  const fetchListings = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const animals = await apiClient.get('/api/animals/', tokens.access);

      setListings(
        animals.filter(a => a.farmer_username === user.username)
      );
    } catch (err) {
      console.log(err);
      setError('Failed to load your listings.');
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
        name: animal.name || '',
        animal_type: animal.animal_type || 'COW',
        breed: animal.breed || '',
        age: animal.age || '',
        price: animal.price || '',
        description: animal.description || '',
        quantity: animal.quantity || 1,
        image: null,
      });
    } else {
      setEditingAnimal(null);
      setFormData({
        name: '',
        animal_type: 'COW',
        breed: '',
        age: '',
        price: '',
        description: '',
        quantity: 1,
        image: null,
      });
    }

    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAnimal(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('animal_type', formData.animal_type);
    data.append('breed', formData.breed);
    data.append('age', Number(formData.age));
    data.append('price', Number(formData.price));
    data.append('description', formData.description);
    data.append('quantity', Number(formData.quantity));

    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editingAnimal) {
        await apiClient.patchWithFile(
          `/api/animals/${editingAnimal.id}/`,
          data,
          tokens.access
        );
      } else {
        await apiClient.postWithFile('/api/animals/', data, tokens.access);
      }

      setIsModalOpen(false);
      fetchListings();
    } catch (err) {
      console.log('BACKEND ERROR:', err?.data || err);
      setError(JSON.stringify(err?.data) || 'Failed to save listing.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this listing?')) return;

    try {
      await apiClient.delete(`/api/animals/${id}/`, tokens.access);
      fetchListings();
    } catch (err) {
      console.log(err);
      setError('Failed to delete listing.');
    }
  };

  if (loading) return <Spinner fullScreen />;

  return (
    <div className="min-h-screen bg-[#07120c] text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-black">
          My <span className="text-green-400">Listings</span>
        </h1>

        <Button
          onClick={() => handleOpenModal()}
          className="bg-green-500 text-black font-bold px-4 py-2 rounded-xl"
        >
          + Add Listing
        </Button>
      </div>
      {error && (
        <div className="max-w-7xl mx-auto mb-6 p-4 rounded-xl bg-red-500/10 border border-red-400/20 text-red-300">
          {error}
        </div>
      )}
      {listings.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          No livestock listings yet
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {listings.map(animal => (
            <div
              key={animal.id}
              className="rounded-2xl overflow-hidden bg-white/5 border border-white/10"
            >
              <div className="h-44">
                {animal.image ? (
                  <img
                    src={animal.image}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-bold">{animal.name}</h3>
                <p className="text-xs text-gray-400">{animal.breed}</p>

                <p className="mt-2 text-green-400 font-bold">
                  Ksh {Number(animal.price).toLocaleString()}
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleOpenModal(animal)}
                    className="flex-1 py-2 rounded-xl bg-white/5"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(animal.id)}
                    className="flex-1 py-2 rounded-xl bg-red-500/10 text-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingAnimal ? 'Edit Listing' : 'New Listing'}
      >

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 bg-black/40 border rounded"
          />
          <input
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            placeholder="Breed"
            className="w-full p-2 bg-black/40 border rounded"
          />
          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="w-full p-2 bg-black/40 border rounded"
          />
          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 bg-black/40 border rounded"
          />
          <input
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="w-full p-2 bg-black/40 border rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 bg-black/40 border rounded h-24"
          />
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Upload Image
            </label>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm text-gray-300
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-green-500 file:text-black
                         hover:file:bg-green-400
                         bg-black/40 border border-white/10 rounded-lg p-2"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-500 text-black font-bold"
          >
            {editingAnimal ? 'Update' : 'Create'}
          </Button>

        </form>
      </Modal>

    </div>
  );
};

export default FarmerListingsPage;