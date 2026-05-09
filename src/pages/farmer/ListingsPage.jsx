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

      setListings(animals.filter(a => a.farmer_username === user.username));
    } catch (err) {
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
    Object.entries({
      name: formData.name,
      animal_type: formData.animal_type,
      breed: formData.breed,
      age: Number(formData.age),
      price: Number(formData.price),
      description: formData.description,
      quantity: Number(formData.quantity),
    }).forEach(([k, v]) => data.append(k, v));

    if (formData.image) data.append('image', formData.image);

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
      setError('Failed to save listing.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this listing?')) return;

    try {
      await apiClient.delete(`/api/animals/${id}/`, tokens.access);
      fetchListings();
    } catch {
      setError('Failed to delete listing.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07120c] text-white">
        <Spinner className="w-10 h-10 text-green-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07120c] text-white px-4 sm:px-6 py-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

        <h1 className="text-2xl sm:text-3xl font-black">
          My <span className="text-green-400">Listings</span>
        </h1>

        <Button
          onClick={() => handleOpenModal()}
          className="bg-green-500 text-black font-bold px-4 py-2 rounded-xl w-full sm:w-auto"
        >
          + Add Listing
        </Button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-400/20 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* EMPTY STATE */}
      {listings.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          No livestock listings yet
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {listings.map(animal => (
            <div
              key={animal.id}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >

              {/* IMAGE */}
              <div className="h-40 sm:h-44 bg-black/20">
                {animal.image ? (
                  <img
                    src={animal.image}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                    No Image
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-4">

                <h3 className="font-bold truncate">{animal.name}</h3>
                <p className="text-xs text-gray-400">{animal.breed}</p>

                <p className="mt-2 text-green-400 font-bold">
                  Ksh {Number(animal.price).toLocaleString()}
                </p>

                {/* ACTIONS */}
                <div className="flex gap-2 mt-4">

                  <button
                    onClick={() => handleOpenModal(animal)}
                    className="flex-1 py-2 rounded-xl bg-white/5 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(animal.id)}
                    className="flex-1 py-2 rounded-xl bg-red-500/10 text-red-300 text-sm"
                  >
                    Delete
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingAnimal ? 'Edit Listing' : 'New Listing'}
      >

        <form onSubmit={handleSubmit} className="space-y-4">

          {[
            { name: 'name', placeholder: 'Name' },
            { name: 'breed', placeholder: 'Breed' },
            { name: 'age', placeholder: 'Age' },
            { name: 'price', placeholder: 'Price' },
            { name: 'quantity', placeholder: 'Quantity' },
          ].map(field => (
            <input
              key={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-sm"
            />
          ))}

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-3 bg-black/40 border border-white/10 rounded-xl h-24 text-sm"
          />

          {/* FILE UPLOAD */}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-sm file:bg-green-500 file:text-black file:px-4 file:py-2 file:rounded-lg bg-black/40 border border-white/10 rounded-xl p-2"
          />

          <Button
            type="submit"
            className="w-full bg-green-500 text-black font-bold py-3 rounded-xl"
          >
            {editingAnimal ? 'Update' : 'Create'}
          </Button>

        </form>

      </Modal>

    </div>
  );
};

export default FarmerListingsPage;