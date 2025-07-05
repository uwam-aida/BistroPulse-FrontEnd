import React, { useState } from "react";
import { Search, Filter, Plus, Download, MoreVertical, Eye, Edit, Trash2, ChevronLeft, Bell, ChevronDown, UserMinus } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  location: string;
  created: string;
  avatar: string;
  category?: string;
  status?: string;
  orders?: { id: number; details: string; date: string; status: string }[];
}

interface Order {
  id: number;
  customerName: string;
  details: string;
  date: string;
  status: string;
}

export default function CustomerDashboard() {
  const [activePage, setActivePage] = useState("Customer List");
  const [customers, setCustomers] = useState<Customer[]>([
    { 
      id: 1, 
      name: "Chelsie Johnson", 
      phone: "88016000770", 
      email: "chelsie@ui8.net", 
      location: "London", 
      created: "2 Feb 2022", 
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face&auto=format", 
      category: "Regular", 
      status: "Active", 
      orders: [
        { id: 101, details: "Grilled Chicken Salad", date: "3 Jul 2025", status: "Delivered" },
        { id: 102, details: "Cheeseburger Combo", date: "5 Jul 2025 10:30 PM", status: "Preparing" }
      ]
    },
    { 
      id: 2, 
      name: "John Doe", 
      phone: "88016000771", 
      email: "john@ui8.net", 
      location: "New York", 
      created: "3 Mar 2022", 
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format", 
      category: "VIP", 
      status: "Closed", 
      orders: [
        { id: 103, details: "Margherita Pizza", date: "4 Jul 2025", status: "Delivered" },
        { id: 104, details: "Spaghetti Carbonara", date: "6 Jul 2025 11:00 AM", status: "Ordered" }
      ]
    },
    { 
      id: 3, 
      name: "Grok 3", 
      phone: "555-0101", 
      email: "grok3@xai.com", 
      location: "Virtual Space", 
      created: "5 Jul 2025", 
      avatar: "https://via.placeholder.com/32", 
      category: "AI", 
      status: "Active", 
      orders: [
        { id: 105, details: "AI-Enhanced Meal", date: "5 Jul 2025 10:00 PM", status: "Ordered" },
        { id: 106, details: "Digital Dessert", date: "6 Jul 2025 12:00 PM", status: "Pending" }
      ]
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({ location: "", category: "", status: "" });
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showProfile, setShowProfile] = useState<number | null>(null);
  const [showEditCustomer, setShowEditCustomer] = useState<number | null>(null);
  const [editedCustomer, setEditedCustomer] = useState<Customer | null>(null);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    universityStatus: "University student",
    university: "",
    email: "",
    phone: "",
    gender: "Male",
    location: "",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face&auto=format",
  });
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredCustomers = customers.filter(customer => {
    return (
      (filters.location === "" || customer.location === filters.location) &&
      (filters.category === "" || customer.category === filters.category) &&
      (filters.status === "" || customer.status === filters.status)
    );
  });
  const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const activeCustomers = customers.filter(c => c.status === "Active").length;

  const allOrders: Order[] = customers.flatMap(customer =>
    customer.orders?.map(order => ({
      id: order.id,
      customerName: customer.name,
      details: order.details,
      date: order.date,
      status: order.status,
    })) || []
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCustomers(currentCustomers.map(c => c.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelectCustomer = (customerId: number, checked: boolean) => {
    if (checked) {
      setSelectedCustomers([...selectedCustomers, customerId]);
    } else {
      setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
    }
  };

  const toggleDropdown = (customerId: number) => {
    setActiveDropdown(activeDropdown === customerId ? null : customerId);
  };

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilter = () => {
    setFilters({ location: "", category: "", status: "" });
  };

  const applyFilter = () => {
    setCurrentPage(1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewCustomer({ ...newCustomer, avatar: URL.createObjectURL(file) });
    }
  };

  const handleRemovePicture = () => {
    setNewCustomer({ ...newCustomer, avatar: "" });
  };

  const handleAddCustomer = () => {
    const newCust = { ...newCustomer, id: customers.length + 1, created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), orders: [] };
    setCustomers([...customers, newCust]);
    setShowAddCustomer(false);
    setNewCustomer({
      name: "",
      universityStatus: "University student",
      university: "",
      email: "",
      phone: "",
      gender: "Male",
      location: "",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face&auto=format",
    });
  };

  const handleViewProfile = (customerId: number) => {
    setShowProfile(showProfile === customerId ? null : customerId);
  };

  const handleEditCustomer = (customerId: number) => {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      setEditedCustomer({ ...customer });
      setShowEditCustomer(customerId);
    }
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (editedCustomer) {
      setEditedCustomer({ ...editedCustomer, [e.target.name]: e.target.value });
    }
  };

  const handleEditFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editedCustomer) {
      setEditedCustomer({ ...editedCustomer, avatar: URL.createObjectURL(file) });
    }
  };

  const handleSaveEdit = () => {
    if (editedCustomer) {
      setCustomers(customers.map(c => c.id === editedCustomer.id ? editedCustomer : c));
      setShowEditCustomer(null);
      setEditedCustomer(null);
    }
  };

  const handleRemoveEditPicture = () => {
    if (editedCustomer) {
      setEditedCustomer({ ...editedCustomer, avatar: "" });
    }
  };

  const handleDeleteOrder = (orderId: number) => {
    const updatedCustomers = customers.map(customer => ({
      ...customer,
      orders: customer.orders?.filter(order => order.id !== orderId) || []
    }));
    setCustomers(updatedCustomers);
  };

  const handleViewOrder = (orderId: number) => {
    alert(`Viewing order ${orderId}`);
  };

  const handleEditOrder = (orderId: number) => {
    alert(`Editing order ${orderId}`);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg h-full">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              K
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Klavuna Restaurant</h1>
          </div>
          <nav className="space-y-2">
            {["Overview", "Customer List", "Food Menu", "Order", "Sales", "Wallet", "Reviews And Rating", "Advertisement"].map((item) => (
              <div
                key={item}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer ${
                  activePage === item ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActivePage(item)}
              >
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 overflow-auto">
        <header className="bg-white shadow-md p-4 rounded-lg mb-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-600">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">{activePage}</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        {activePage === "Overview" ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg shadow">
                <h3 className="text-md font-medium text-gray-700">Total Customers</h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">{customers.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg shadow">
                <h3 className="text-md font-medium text-gray-700">Active Customers</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">{activeCustomers}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg shadow">
                <h3 className="text-md font-medium text-gray-700">Inactive Customers</h3>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{customers.length - activeCustomers}</p>
              </div>
            </div>
          </div>
        ) : activePage === "Customer List" ? (
          <div className="bg-white shadow-md rounded-lg">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">👤</span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Customers</h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search customers..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button onClick={toggleFilter} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    <Filter className="w-5 h-5" />
                    <span>Filter</span>
                  </button>
                  <button onClick={() => setShowAddCustomer(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Plus className="w-5 h-5" />
                    <span>Add Customer</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    <Download className="w-5 h-5" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>

            {filterVisible && (
              <div className="absolute right-6 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <select
                      name="location"
                      value={filters.location}
                      onChange={handleFilterChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Locations</option>
                      <option value="London">London</option>
                      <option value="New York">New York</option>
                      <option value="Paris">Paris</option>
                      <option value="Virtual Space">Virtual Space</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Categories</option>
                      <option value="Regular">Regular</option>
                      <option value="VIP">VIP</option>
                      <option value="AI">AI</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button onClick={clearFilter} className="px-4 py-2 text-gray-600 hover:text-gray-800">Clear</button>
                    <button onClick={applyFilter} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Apply</button>
                  </div>
                </div>
              </div>
            )}

            {showAddCustomer && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Add New Customer</h2>
                  <div className="flex flex-col items-center mb-6">
                    <img
                      src={newCustomer.avatar || "https://via.placeholder.com/64"}
                      alt="Avatar"
                      className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-gray-200"
                    />
                    <div className="flex gap-2">
                      <label className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 cursor-pointer">
                        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                        Upload
                      </label>
                      <button onClick={handleRemovePicture} className="px-3 py-1 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 text-sm">Remove</button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={newCustomer.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={newCustomer.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={newCustomer.phone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter phone"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={newCustomer.location}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter location"
                      />
                    </div>
                    <button onClick={handleAddCustomer} className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Customer</button>
                    <button onClick={() => setShowAddCustomer(false)} className="w-full mt-2 text-gray-600 hover:text-gray-800">Cancel</button>
                  </div>
                </div>
              </div>
            )}

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.length === currentCustomers.length}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="p-4 text-sm font-medium text-gray-700">Name</th>
                    <th className="p-4 text-sm font-medium text-gray-700">Phone</th>
                    <th className="p-4 text-sm font-medium text-gray-700">Email</th>
                    <th className="p-4 text-sm font-medium text-gray-700">Location</th>
                    <th className="p-4 text-sm font-medium text-gray-700">Created</th>
                    <th className="p-4 text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCustomers.map((customer) => (
                    <tr key={customer.id} className="border-t hover:bg-gray-50">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedCustomers.includes(customer.id)}
                          onChange={(e) => handleSelectCustomer(customer.id, e.target.checked)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="p-4 flex items-center gap-3">
                        <img src={customer.avatar} alt={customer.name} className="w-10 h-10 rounded-full object-cover" />
                        <span className="text-sm font-medium text-gray-800">{customer.name}</span>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{customer.phone}</td>
                      <td className="p-4 text-sm text-blue-600">{customer.email}</td>
                      <td className="p-4 text-sm text-gray-600">{customer.location}</td>
                      <td className="p-4 text-sm text-gray-600">{customer.created}</td>
                      <td className="p-4 relative">
                        <button onClick={() => toggleDropdown(customer.id)} className="p-2 hover:bg-gray-100 rounded-full">
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>
                        {activeDropdown === customer.id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                            <button onClick={() => handleViewProfile(customer.id)} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Eye className="w-4 h-4" /> View
                            </button>
                            <button onClick={() => handleEditCustomer(customer.id)} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Edit className="w-4 h-4" /> Edit
                            </button>
                            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                              <UserMinus className="w-4 h-4" /> Disable
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4 p-4 bg-white shadow-md rounded-lg">
              <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : activePage === "Order" ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-sm font-medium text-gray-700">Order ID</th>
                    <th className="p-4 text-sm font-medium text-gray-700">Customer Name</th>
                    <th className="p-4 text-sm font-medium text-gray-700">Details</th>
                    <th className="p-4 text-sm font-medium text-gray-700">Date</th>
                    <th className="p-4 text-sm font-medium text-gray-700">Status</th>
                    <th className="p-4 text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.map((order) => (
                    <tr key={order.id} className="border-t hover:bg-gray-50">
                      <td className="p-4 text-sm text-gray-600">{order.id}</td>
                      <td className="p-4 text-sm text-gray-600">{order.customerName}</td>
                      <td className="p-4 text-sm text-gray-600">{order.details}</td>
                      <td className="p-4 text-sm text-gray-600">{order.date}</td>
                      <td className="p-4 text-sm">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-white ${
                            order.status === "Delivered" ? "bg-green-500" :
                            order.status === "Preparing" ? "bg-yellow-500" :
                            order.status === "Ordered" ? "bg-blue-500" :
                            order.status === "Pending" ? "bg-orange-500" : "bg-gray-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 relative">
                        <button
                          onClick={() => toggleDropdown(order.id)}
                          className="p-2 hover:bg-gray-100 rounded-full"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>
                        {activeDropdown === order.id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                            <button
                              onClick={() => handleViewOrder(order.id)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <Eye className="w-4 h-4" /> View
                            </button>
                            <button
                              onClick={() => handleEditOrder(order.id)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <Edit className="w-4 h-4" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                            >
                              <Trash2 className="w-4 h-4" /> Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {showProfile !== null && customers[showProfile - 1] && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
              <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Customer Profile</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={customers[showProfile - 1].avatar || "https://via.placeholder.com/64"}
                    alt={customers[showProfile - 1].name}
                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-200 mx-auto md:mx-0"
                  />
                  <div className="mt-4 text-center md:text-left">
                    <label className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm cursor-pointer">
                      <input type="file" accept="image/*" onChange={() => { setNewCustomer({ ...newCustomer, avatar: "https://via.placeholder.com/64" }); customers[showProfile - 1].avatar = "https://via.placeholder.com/64"; }} className="hidden" />
                      Upload
                    </label>
                    <button
                      onClick={() => { setNewCustomer({ ...newCustomer, avatar: "" }); customers[showProfile - 1].avatar = ""; }}
                      className="mt-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 p-2 bg-gray-50 rounded-md">{customers[showProfile - 1].name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 p-2 bg-gray-50 rounded-md">{customers[showProfile - 1].phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 p-2 bg-gray-50 rounded-md">{customers[showProfile - 1].email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <p className="mt-1 p-2 bg-gray-50 rounded-md">{customers[showProfile - 1].location}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Created</label>
                    <p className="mt-1 p-2 bg-gray-50 rounded-md">{customers[showProfile - 1].created}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <p className="mt-1 p-2 bg-gray-50 rounded-md">{customers[showProfile - 1].status}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Order History</h3>
                    <table className="w-full border-collapse">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="p-2 text-sm font-medium text-gray-700">Order ID</th>
                          <th className="p-2 text-sm font-medium text-gray-700">Details</th>
                          <th className="p-2 text-sm font-medium text-gray-700">Date</th>
                          <th className="p-2 text-sm font-medium text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers[showProfile - 1].orders?.map((order) => (
                          <tr key={order.id} className="border-t">
                            <td className="p-2 text-sm text-gray-600">{order.id}</td>
                            <td className="p-2 text-sm text-gray-600">{order.details}</td>
                            <td className="p-2 text-sm text-gray-600">{order.date}</td>
                            <td className="p-2 text-sm text-gray-600">{order.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <button onClick={() => setShowProfile(null)} className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Close</button>
            </div>
          </div>
        )}

        {showEditCustomer !== null && editedCustomer && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Edit Customer</h2>
              <div className="flex flex-col items-center mb-6">
                <img
                  src={editedCustomer.avatar || "https://via.placeholder.com/64"}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-gray-200"
                />
                <div className="flex gap-2">
                  <label className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 cursor-pointer">
                    <input type="file" accept="image/*" onChange={handleEditFileUpload} className="hidden" />
                    Upload
                  </label>
                  <button onClick={handleRemoveEditPicture} className="px-3 py-1 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 text-sm">Remove</button>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editedCustomer.name}
                    onChange={handleEditInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editedCustomer.email}
                    onChange={handleEditInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editedCustomer.phone}
                    onChange={handleEditInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phone"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={editedCustomer.location}
                    onChange={handleEditInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter location"
                  />
                </div>
                <button onClick={handleSaveEdit} className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
                <button onClick={() => { setShowEditCustomer(null); setEditedCustomer(null); }} className="w-full mt-2 text-gray-600 hover:text-gray-800">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}