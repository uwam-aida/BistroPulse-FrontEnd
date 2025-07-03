'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, Download, MoreHorizontal, ChevronLeft, ChevronRight, User } from 'lucide-react';

// Add type definitions
interface Restaurant {
  id: number;
  name: string;
  representative: string;
  location: string;
  phone: string;
  rating: number | null;
  status: string;
}

interface CustomerForm {
  name: string;
  isStudent: boolean;
  university: string;
  email: string;
  phone: string;
  gender: string;
  location: string;
}

export default function RestaurantManagement() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRestaurants, setSelectedRestaurants] = useState<Set<number>>(new Set());
  const [showAddCustomer, setShowAddCustomer] = useState<boolean>(false);
  const [customerForm, setCustomerForm] = useState<CustomerForm>({
    name: '',
    isStudent: false,
    university: '',
    email: '',
    phone: '',
    gender: 'male',
    location: ''
  });
  const [showCustomerProfile, setShowCustomerProfile] = useState<boolean>(false);
  const [newCustomer, setNewCustomer] = useState<CustomerForm | null>(null);
  const [customers, setCustomers] = useState<CustomerForm[]>([]); // Initialize as empty array

  const universities: string[] = [
    'University of Rwanda',
    'African Leadership University',
    'University of Global Health Equity',
    'Kibogora Polytechnic',
    'Université Libre de Kigali',
    'University of Kigali',
    'INES Ruhengeri',
  ];

  const restaurants: Restaurant[] = [
    { id: 1, name: 'Pizza Palace', representative: 'John Doe', location: 'Kigali', phone: '+250788123456', rating: 4.5, status: 'Active' },
    { id: 2, name: 'Burger House', representative: 'Jane Smith', location: 'Butare', phone: '+250788654321', rating: 4.2, status: 'Active' },
    { id: 3, name: 'Sushi Bar', representative: 'Mike Johnson', location: 'Kigali', phone: '+250788987654', rating: null, status: 'Inactive' },
    { id: 4, name: 'Coffee Shop', representative: 'Sarah Wilson', location: 'Gisenyi', phone: '+250788456789', rating: 4.8, status: 'Active' },
    { id: 5, name: 'Taco Stand', representative: 'Carlos Rodriguez', location: 'Kigali', phone: '+250788321654', rating: 4.0, status: 'Active' },
  ];

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(restaurant => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           restaurant.representative.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           restaurant.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = !selectedLocation || restaurant.location.includes(selectedLocation);
      const matchesStatus = !selectedStatus || restaurant.status === selectedStatus;
      return matchesSearch && matchesLocation && matchesStatus;
    });
  }, [searchTerm, selectedLocation, selectedStatus, restaurants]);

  const totalPages = Math.ceil(filteredRestaurants.length / 10);
  const startIndex = (currentPage - 1) * 10;
  const endIndex = Math.min(startIndex + 10, filteredRestaurants.length);
  const currentRestaurants = filteredRestaurants.slice(startIndex, endIndex);

  const handleSelectAll = (checked: boolean): void => {
    if (checked) {
      setSelectedRestaurants(new Set(filteredRestaurants.map((r) => r.id)));
    } else {
      setSelectedRestaurants(new Set());
    }
  };

  const handleSelectRestaurant = (id: number, checked: boolean): void => {
    const newSelected = new Set(selectedRestaurants);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRestaurants(newSelected);
  };

  const clearFilters = (): void => {
    setSelectedLocation('');
    setSelectedRating('');
    setSelectedStatus('');
  };

  const applyFilters = (): void => {
    setShowFilter(false);
  };

  const handleAddCustomer = (): void => {
    const updatedCustomer = { ...customerForm, id: customers.length + 1 }; // Add unique id
    setNewCustomer(updatedCustomer);
    setCustomers([...customers, updatedCustomer]); // Safely update customers array
    setShowAddCustomer(false);
    setShowCustomerProfile(true);
    // Reset form
    setCustomerForm({
      name: '',
      isStudent: false,
      university: '',
      email: '',
      phone: '',
      gender: 'male',
      location: ''
    });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Restaurant Management</h1>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {filteredRestaurants.length} restaurants
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 w-4 h-4" />
            <input
              type="text"
              placeholder="Search restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-900"
          >
            <Filter className="w-4 h-4 text-gray-900" />
            Filter
          </button>
          <button
            onClick={() => setShowAddCustomer(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 text-gray-900" />
            Add Customer
          </button>
          <button
            onClick={() => {
              setShowCustomerProfile(true); // Show history
            }}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <User className="w-4 h-4" />
            Customer History
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 text-gray-900" />
            Export
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <div className="absolute right-6 top-20 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 z-10">
          <h3 className="font-semibold text-gray-900 mb-3">Filter Options</h3>
          
          <div className="space-y-4 text-gray-500">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">All Locations</option>
                <option value="Kigali">Kigali</option>
                <option value="Butare">Butare</option>
                <option value="Gisenyi">Gisenyi</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <select 
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">All Ratings</option>
                <option value="4+">4+ Stars</option>
                <option value="3+">3+ Stars</option>
                <option value="2+">2+ Stars</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={clearFilters}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors text-gray-800"
            >
              Clear
            </button>
            <button
              onClick={applyFilters}
              className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedRestaurants.size === filteredRestaurants.length && filteredRestaurants.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Restaurant Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Representative</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Location</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Phone</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Rating</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRestaurants.map((restaurant) => (
                <tr key={restaurant.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRestaurants.has(restaurant.id)}
                      onChange={(e) => handleSelectRestaurant(restaurant.id, e.target.checked)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900">{restaurant.name}</td>
                  <td className="py-3 px-4 text-gray-700">{restaurant.representative}</td>
                  <td className="py-3 px-4 text-gray-700">{restaurant.location}</td>
                  <td className="py-3 px-4 text-gray-700">{restaurant.phone}</td>
                  <td className="py-3 px-4">
                    {restaurant.rating ? (
                      <span className="text-yellow-600">★ {restaurant.rating}</span>
                    ) : (
                      <span className="text-gray-400">No rating</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      restaurant.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {restaurant.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {endIndex} of {filteredRestaurants.length} results
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Add Customer Modal or Customer Profile or Customer History */}
        {(showAddCustomer || showCustomerProfile) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
              {showAddCustomer ? (
                <>
                  <h2 className="text-xl font-semibold mb-6 text-gray-700">Add Customer</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={customerForm.name}
                        onChange={(e) => setCustomerForm({...customerForm, name: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        placeholder="Enter customer name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={customerForm.email}
                        onChange={(e) => setCustomerForm({...customerForm, email: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={customerForm.phone}
                        onChange={(e) => setCustomerForm({...customerForm, phone: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={customerForm.isStudent}
                          onChange={(e) => setCustomerForm({...customerForm, isStudent: e.target.checked})}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm font-medium text-gray-700">Student</span>
                      </label>
                    </div>
                    {customerForm.isStudent && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                        <select
                          value={customerForm.university}
                          onChange={(e) => setCustomerForm({...customerForm, university: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                          <option value="">Select University</option>
                          {universities.map((uni) => (
                            <option key={uni} value={uni}>{uni}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select
                        value={customerForm.gender}
                        onChange={(e) => setCustomerForm({...customerForm, gender: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={customerForm.location}
                        onChange={(e) => setCustomerForm({...customerForm, location: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        placeholder="Enter location"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setShowAddCustomer(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddCustomer}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add Customer
                    </button>
                  </div>
                </>
              ) : showCustomerProfile && newCustomer ? (
                <>
                  <h2 className="text-2xl font-bold mb-8 text-gray-800">Customer Profile</h2> {/* Figma-inspired heading */}
                  <div className="border-b border-gray-300">
                    <nav className="flex space-x-6">
                      {['Overview', 'Orders', 'Fav Restaurants', 'Review & Rating', 'Reward Point'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => {/* Add tab logic if needed */}}
                          className={`py-3 px-4 text-base font-medium ${
                            tab === 'Overview' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
                          } transition-colors`}
                        >
                          {tab}
                        </button>
                      ))}
                    </nav>
                  </div>
                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        <User className="w-12 h-12 text-gray-500" /> {/* Larger avatar */}
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900">{newCustomer.name}</h3>
                        <p className="text-lg text-gray-600 mt-1">{newCustomer.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">Active</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={true}
                          onChange={() => {/* Add toggle logic if needed */}}
                          className="sr-only peer"
                        />
                        <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </div>
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-6 text-gray-700">
                    <p className="text-lg"><strong className="text-gray-900">Phone Number:</strong> {newCustomer.phone}</p>
                    <p className="text-lg"><strong className="text-gray-900">University:</strong> {newCustomer.isStudent ? newCustomer.university : 'N/A'}</p>
                    <p className="text-lg"><strong className="text-gray-900">Location:</strong> {newCustomer.location}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowCustomerProfile(false);
                      setShowAddCustomer(true);
                      setCustomerForm({ ...newCustomer });
                    }}
                    className="mt-10 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
                  >
                    Edit profile
                  </button>
                </>
              ) : showCustomerProfile && customers.length > 0 ? (
                <>
                  <h2 className="text-2xl font-bold mb-8 text-gray-800">Customer History</h2> {/* Figma-inspired heading */}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-300">
                          <th className="text-left py-4 px-6 font-semibold text-gray-800">Name</th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-800">Email</th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-800">Phone</th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-800">University</th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-800">Location</th>
                          <th className="text-left py-4 px-6 font-semibold text-gray-800">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers.map((customer, index) => (
                          <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-4 px-6 font-medium text-gray-900">{customer.name}</td>
                            <td className="py-4 px-6 text-gray-700">{customer.email}</td>
                            <td className="py-4 px-6 text-gray-700">{customer.phone}</td>
                            <td className="py-4 px-6 text-gray-700">{customer.isStudent ? customer.university : 'N/A'}</td>
                            <td className="py-4 px-6 text-gray-700">{customer.location}</td>
                            <td className="py-4 px-6">
                              <button
                                onClick={() => {
                                  setCustomerForm(customer);
                                  setNewCustomer(customer);
                                  setShowCustomerProfile(true); // Switch to profile view
                                }}
                                className="text-blue-600 hover:text-blue-800 text-base transition-colors"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    onClick={() => setShowCustomerProfile(false)}
                    className="mt-10 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-lg"
                  >
                    Close
                  </button>
                </>
              ) : showCustomerProfile && customers.length === 0 ? (
                <>
                  <h2 className="text-2xl font-bold mb-8 text-gray-800">Customer History</h2>
                  <div className="text-center text-gray-500 py-12">No customers added yet.</div>
                  <button
                    onClick={() => setShowCustomerProfile(false)}
                    className="mt-10 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-lg"
                  >
                    Close
                  </button>
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}