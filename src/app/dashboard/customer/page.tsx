'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, Download, ChevronDown, MoreHorizontal, ChevronLeft, ChevronRight, Upload, User } from 'lucide-react';

export default function RestaurantManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRestaurants, setSelectedRestaurants] = useState(new Set());
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [customerForm, setCustomerForm] = useState({
    name: '',
    isStudent: false,
    university: '', // ADD THIS LINE
    email: '',
    phone: '',
    gender: 'male',
    location: ''
  });

  // ADD THIS: List of universities
  const universities = [
'University of Rwanda',

'African Leadership University',

'University of Global Health Equity',

'Kibogora Polytechnic',

'Université Libre de Kigali',

'University of Kigali',

'INES Ruhengeri',

  ];

  const restaurants = [
    {
      id: 1,
      name: 'Sun valley restaurant',
      representative: 'Daniel Steward',
      location: 'Audiotube',
      phone: '(408) 555-0120',
      rating: null,
      status: 'active'
    },
    {
      id: 2,
      name: 'Moon valley restaurant',
      representative: 'Daniel Steward',
      location: 'Afatastie Nettey Road, Accra',
      phone: '(480) 555-0103',
      rating: null,
      status: 'active'
    },
    {
      id: 3,
      name: 'Sun valley restaurant',
      representative: 'Daniel Steward',
      location: 'Audiotube',
      phone: '(603) 555-0123',
      rating: null,
      status: 'active'
    },
    {
      id: 4,
      name: 'Moon valley restaurant',
      representative: 'Daniel Steward',
      location: 'Nettey Road, Accra',
      phone: '(704) 555-0127',
      rating: null,
      status: 'active'
    },
    {
      id: 5,
      name: 'Sun valley restaurant',
      representative: 'Daniel Steward',
      location: 'Afatastie',
      phone: '(239) 555-0108',
      rating: null,
      status: 'active'
    },
    {
      id: 6,
      name: 'Star valley restaurant',
      representative: 'Daniel Steward',
      location: 'Afatastie Nettey Road, Accra',
      phone: '(239) 555-0108',
      rating: 4.8,
      status: 'closed'
    }
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
  }, [searchTerm, selectedLocation, selectedStatus]);

  const totalPages = Math.ceil(filteredRestaurants.length / 10);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRestaurants(new Set(filteredRestaurants.map((r) => r.id)));
    } else {
      setSelectedRestaurants(new Set());
    }
  };

  const handleSelectRestaurant = (id: number, checked: boolean) => {
    const newSelected = new Set(selectedRestaurants);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRestaurants(newSelected);
  };

  const clearFilters = () => {
    setSelectedLocation('');
    setSelectedRating('');
    setSelectedStatus('');
  };

  const applyFilters = () => {
    setShowFilter(false);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-1 h-6 bg-blue-500 rounded"></div>
          <h1 className="text-xl font-semibold text-gray-900">Restaurants</h1>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 placeholder-gray-400"
            />
          </div>
          
          {/* Filter Button */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
          
          {/* Add Restaurant Button */}
          <button 
            onClick={() => setShowAddCustomer(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Restaurant
          </button>
          
          {/* Export Button */}
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <div className="absolute right-6 top-20 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 z-10">
          <h3 className="font-semibold mb-4">Filter</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="Accra">Accra</option>
                <option value="Audiotube">Audiotube</option>
                <option value="Afatastie">Afatastie</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="4+">4+ Stars</option>
                <option value="3+">3+ Stars</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-2 mt-6">
            <button
              onClick={clearFilters}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filter
            </button>
            <button
              onClick={applyFilters}
              className="flex-1 px-4 py-2 bg-blue-600 text-gray-400 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 w-12">
                  <input
                    type="checkbox"
                    checked={selectedRestaurants.size === filteredRestaurants.length && filteredRestaurants.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  Name <span className="text-gray-400">↕</span>
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Representative</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Location</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Phone Number</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Rating</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredRestaurants.map((restaurant) => (
                <tr key={restaurant.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRestaurants.has(restaurant.id)}
                      onChange={(e) => handleSelectRestaurant(restaurant.id, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">{restaurant.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{restaurant.representative}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{restaurant.location}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{restaurant.phone}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {restaurant.rating ? (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span>{restaurant.rating}</span>
                      </div>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      restaurant.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {restaurant.status === 'active' ? 'Active' : 'Closed'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-gray-400 hover:text-gray-600">
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
            1 of {totalPages}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex gap-1">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-sm ${
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
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Add Customer Modal */}
        {showAddCustomer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
              <h2 className="text-xl font-semibold mb-6 text-gray-700">Add Customer</h2>
              
              {/* Profile Picture Upload */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    <Upload className="w-4 h-4" />
                    Upload new picture
                  </button>
                  <button className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm">
                    Remove
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Chelsie Jhonson"
                    value={customerForm.name}
                    onChange={(e) => setCustomerForm({...customerForm, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-700"
                  />
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      id="student"
                      checked={customerForm.isStudent}
                      onChange={(e) => setCustomerForm({...customerForm, isStudent: e.target.checked})}
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="student" className="text-sm text-gray-700">University student</label>
                  </div>
                </div>

                {/* REPLACE THE EXISTING NAME SECTION ABOVE WITH THIS UPDATED VERSION */}
                {/* University Dropdown - Only show when isStudent is true */}
                {customerForm.isStudent && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Choose university</label>
                    <select
                      value={customerForm.university}
                      onChange={(e) => setCustomerForm({...customerForm, university: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    >
                      <option value="" className="text-gray-400">Select university</option>
                      {universities.map((uni) => (
                        <option key={uni} value={uni} className="text-gray-700">
                          {uni}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Email and Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="example@bindiriqu.com"
                      value={customerForm.email}
                      onChange={(e) => setCustomerForm({...customerForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="(+233) 01532548623"
                      value={customerForm.phone}
                      onChange={(e) => setCustomerForm({...customerForm, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-700"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={customerForm.gender === 'male'}
                        onChange={(e) => setCustomerForm({...customerForm, gender: e.target.value})}
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Male</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={customerForm.gender === 'female'}
                        onChange={(e) => setCustomerForm({...customerForm, gender: e.target.value})}
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Female</span>
                    </label>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <textarea
                    placeholder="G. P. O., Asafoatse Nettey Road, Accra..."
                    value={customerForm.location}
                    onChange={(e) => setCustomerForm({...customerForm, location: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder-gray-400 text-gray-700"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddCustomer(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle form submission here
                    console.log('Customer form:', customerForm);
                    setShowAddCustomer(false);
                    // Reset form
                    setCustomerForm({
                      name: '',
                      isStudent: false,
                      university: '', // ADD THIS LINE TO RESET
                      email: '',
                      phone: '',
                      gender: 'male',
                      location: ''
                    });
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Customer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}