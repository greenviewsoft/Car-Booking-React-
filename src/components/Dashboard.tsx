import React, { useState, useEffect } from "react";
import { carService } from "../services/cars";
import { Car, Calendar, MapPin, ChevronRight, X, Clock, Users, CreditCard, MessageSquare, Tag, ArrowLeft, ArrowRight, Zap, Truck, Gauge } from "lucide-react";

// Booking Card Component
const BookingCard = ({ booking, onViewDetails }) => {
  const statusColor = {
    pending: "bg-amber-100 text-amber-800 border-amber-300",
    confirmed: "bg-emerald-100 text-emerald-800 border-emerald-300",
    completed: "bg-blue-100 text-blue-800 border-blue-300",
    cancelled: "bg-rose-100 text-rose-800 border-rose-300",
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      {/* Card Header with Car Image */}
      <div className="h-48 bg-gray-100 relative overflow-hidden">
        <img 
          src={booking.car?.image_url || "https://via.placeholder.com/500x200?text=Car+Image"} 
          alt={booking.car?.model || "Car"} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${statusColor[booking.status] || "bg-gray-100 text-gray-800 border-gray-200"}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>
        
        {/* Booking ID */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg">
          <span className="text-white font-medium text-sm">Booking #: {booking.id}</span>
        </div>
        
        {/* Car Model in Image Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-bold text-white text-xl drop-shadow-md">{booking.car?.model || "N/A"}</h3>
          <div className="flex items-center text-white/90 text-sm mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDate(booking.start_date)}</span>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        {/* Car Details Row */}
        <div className="flex gap-4 mb-4 border-b border-gray-100 pb-4">
          <div className="flex items-center bg-blue-50 rounded-lg p-2 flex-1">
            <Car className="w-4 h-4 text-blue-600 mr-2" />
            <div>
              <p className="text-xs text-blue-600 font-medium">Category</p>
              <p className="text-sm font-medium">{booking.car?.category || "N/A"}</p>
            </div>
          </div>
          
          <div className="flex items-center bg-purple-50 rounded-lg p-2 flex-1">
            <Gauge className="w-4 h-4 text-purple-600 mr-2" />
            <div>
              <p className="text-xs text-purple-600 font-medium">Year</p>
              <p className="text-sm font-medium">{booking.car?.year || "N/A"}</p>
            </div>
          </div>
          
          <div className="flex items-center bg-emerald-50 rounded-lg p-2 flex-1">
            <Zap className="w-4 h-4 text-emerald-600 mr-2" />
            <div>
              <p className="text-xs text-emerald-600 font-medium">Fuel</p>
              <p className="text-sm font-medium">{booking.car?.fuel_type || "N/A"}</p>
            </div>
          </div>
        </div>
        
        {/* Price Section */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center">
            <CreditCard className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-gray-500 text-sm">Total Price:</span>
          </div>
          <div className="bg-blue-50 px-3 py-1.5 rounded-lg">
            <p className="font-bold text-lg text-blue-700">${booking.total_price}</p>
          </div>
        </div>
        
        {/* Trip Route */}
        <div className="bg-gray-50 p-4 rounded-xl mb-4">
          <div className="flex items-center mb-3">
            <MapPin className="w-5 h-5 text-indigo-600 mr-2" />
            <h4 className="font-medium text-gray-700">Trip Route</h4>
          </div>
          
          <div className="flex flex-col space-y-3 pl-2">
            <div className="flex items-start">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                <div className="absolute top-3 bottom-0 left-1.5 w-0.5 h-10 bg-indigo-300 bg-dashed"></div>
              </div>
              <div>
                <p className="text-xs text-blue-600 mb-1">Pickup Location</p>
                <p className="font-medium text-gray-800 bg-blue-50 px-2 py-1 rounded-md inline-block">{booking.pickup_location}</p>
              </div>
            </div>
            
            <div className="flex items-start pt-4">
              <div className="w-3 h-3 rounded-full bg-emerald-500 mr-3"></div>
              <div>
                <p className="text-xs text-emerald-600 mb-1">Drop-off Location</p>
                <p className="font-medium text-gray-800 bg-emerald-50 px-2 py-1 rounded-md inline-block">{booking.drop_location}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notes Section with styled container */}
        {booking.note && (
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
            <div className="flex items-start mb-2">
              <MessageSquare className="w-4 h-4 text-amber-600 mr-2 mt-0.5" />
              <p className="text-sm text-amber-800 font-medium">Booking Note:</p>
            </div>
            <p className="text-sm text-gray-700 italic pl-6">"{booking.note}"</p>
          </div>
        )}
      </div>
      
      {/* Card Footer */}
      <div className="px-5 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <div className="text-sm text-gray-500 flex items-center">
          <Clock className="w-4 h-4 text-gray-400 mr-1" />
          <span>{new Date(booking.created_at).toLocaleDateString()}</span>
        </div>
        <button 
          onClick={() => onViewDetails(booking)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          View details
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

// Booking Details Modal Component
const BookingDetailsModal = ({ booking, onClose }) => {
  if (!booking) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const statusColor = {
    pending: 'bg-amber-100 text-amber-700 border-amber-200',
    confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    completed: 'bg-blue-100 text-blue-700 border-blue-200',
    cancelled: 'bg-rose-100 text-rose-700 border-rose-200',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay with blur */}
        <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75 backdrop-blur-sm" aria-hidden="true" onClick={onClose}></div>

        {/* Modal panel */}
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-xl shadow-2xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="relative">
            {/* Header with car image */}
            <div className="h-56 bg-gray-100 relative">
              <img 
                src={booking.car?.image_url || "https://via.placeholder.com/800x300?text=Car+Image"} 
                alt={booking.car?.model} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              <button
                type="button"
                className="absolute top-3 right-3 rounded-full bg-black/50 backdrop-blur-sm p-2 text-white hover:bg-black/70 transition-colors focus:outline-none"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-bold text-white drop-shadow-md mb-1">
                      {booking.car?.model || 'Vehicle Booking'}
                    </h3>
                    <div className="flex items-center text-white/90">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-sm">{formatDate(booking.start_date)}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${statusColor[booking.status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Booking ID Banner */}
            <div className="bg-indigo-600 text-white px-6 py-3 flex justify-between items-center">
              <div className="flex items-center">
                <Tag className="w-5 h-5 mr-2" />
                <span className="font-medium">Booking #: {booking.id}</span>
              </div>
              <div className="text-xs opacity-80">{new Date(booking.created_at).toLocaleDateString()}</div>
            </div>
            
            {/* Modal content */}
            <div className="px-6 py-5 space-y-6">
              {/* Car Details Section */}
              <div>
                <div className="flex items-center mb-3">
                  <Car className="w-5 h-5 text-indigo-600 mr-2" />
                  <h4 className="text-base font-semibold text-gray-800">Vehicle Information</h4>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-2 gap-x-6 gap-y-4 border border-gray-100">
                  <div className="flex items-center">
                    <div className="w-7 h-7 flex items-center justify-center bg-blue-100 rounded-full mr-2">
                      <Car className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Model</p>
                      <p className="font-medium text-gray-800">{booking.car?.model || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-7 h-7 flex items-center justify-center bg-purple-100 rounded-full mr-2">
                      <Gauge className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Year</p>
                      <p className="font-medium text-gray-800">{booking.car?.year || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-7 h-7 flex items-center justify-center bg-emerald-100 rounded-full mr-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="font-medium text-gray-800">{booking.car?.category || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-7 h-7 flex items-center justify-center bg-amber-100 rounded-full mr-2">
                      <Zap className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Fuel Type</p>
                      <p className="font-medium text-gray-800">{booking.car?.fuel_type || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-7 h-7 flex items-center justify-center bg-rose-100 rounded-full mr-2">
                      <Users className="w-4 h-4 text-rose-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Seats</p>
                      <p className="font-medium text-gray-800">{booking.car?.seats || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-7 h-7 flex items-center justify-center bg-cyan-100 rounded-full mr-2">
                      <Truck className="w-4 h-4 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Doors</p>
                      <p className="font-medium text-gray-800">{booking.car?.doors || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Trip Details Section */}
              <div>
                <div className="flex items-center mb-3">
                  <MapPin className="w-5 h-5 text-indigo-600 mr-2" />
                  <h4 className="text-base font-semibold text-gray-800">Trip Details</h4>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 space-y-4 border border-gray-100">
                  <div className="flex items-center bg-indigo-50 rounded-lg p-3">
                    <Calendar className="w-5 h-5 text-indigo-600 mr-3" />
                    <div>
                      <p className="text-xs text-indigo-600 font-medium">Trip Date</p>
                      <p className="font-medium text-gray-800">{formatDate(booking.start_date)}</p>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex items-start mb-6">
                      <div className="relative mr-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                        </div>
                        <div className="absolute top-8 bottom-0 left-4 w-0.5 h-12 bg-gray-300 bg-dashed"></div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 flex-1">
                        <p className="text-xs text-blue-700 font-medium mb-1">Pickup Location</p>
                        <p className="font-medium text-gray-800">{booking.pickup_location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                        <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                      </div>
                      <div className="bg-emerald-50 rounded-lg p-3 flex-1">
                        <p className="text-xs text-emerald-700 font-medium mb-1">Drop Location</p>
                        <p className="font-medium text-gray-800">{booking.drop_location}</p>
                      </div>
                    </div>
                  </div>
                  
                  {booking.passengers && (
                    <div className="flex items-center bg-rose-50 rounded-lg p-3">
                      <Users className="w-5 h-5 text-rose-600 mr-3" />
                      <div>
                        <p className="text-xs text-rose-600 font-medium">Passengers</p>
                        <p className="font-medium text-gray-800">{booking.passengers}</p>
                      </div>
                    </div>
                  )}
                  
                  {booking.note && (
                    <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                      <div className="flex items-center mb-1">
                        <MessageSquare className="w-4 h-4 text-amber-600 mr-2" />
                        <p className="text-xs text-amber-700 font-medium">Booking Note</p>
                      </div>
                      <p className="text-sm font-medium text-gray-700 italic">{booking.note}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Payment Details Section */}
              <div>
                <div className="flex items-center mb-3">
                  <CreditCard className="w-5 h-5 text-indigo-600 mr-2" />
                  <h4 className="text-base font-semibold text-gray-800">Payment Information</h4>
                </div>
                
                <div className="bg-indigo-50 rounded-xl border border-indigo-100 overflow-hidden">
                  <div className="grid grid-cols-2 divide-x divide-indigo-200">
                    <div className="p-4">
                      <p className="text-xs text-indigo-600 font-medium mb-1">Daily Rate</p>
                      <p className="text-xl font-bold text-indigo-900">${booking.car?.daily_rate}</p>
                    </div>
                    <div className="p-4 bg-indigo-100/50">
                      <p className="text-xs text-indigo-600 font-medium mb-1">Total Price</p>
                      <p className="text-xl font-bold text-indigo-900">${booking.total_price}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Booking Timestamps */}
              <div>
                <div className="flex items-center mb-3">
                  <Clock className="w-5 h-5 text-indigo-600 mr-2" />
                  <h4 className="text-base font-semibold text-gray-800">Booking Timestamps</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Created At</p>
                    <p className="text-sm font-medium text-gray-800">
                      {new Date(booking.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Last Updated</p>
                    <p className="text-sm font-medium text-gray-800">
                      {new Date(booking.updated_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <button
                type="button"
                className="inline-flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                onClick={onClose}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg border ${
          currentPage === 1
            ? "text-gray-400 border-gray-200 cursor-not-allowed"
            : "text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300"
        }`}
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
            currentPage === index + 1
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
              : "text-gray-700 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
          }`}
        >
          {index + 1}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg border ${
          currentPage === totalPages
            ? "text-gray-400 border-gray-200 cursor-not-allowed"
            : "text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300"
        }`}
      >
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

// My Bookings Page Component
const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 3;
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await carService.getUserBookings();
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const openBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  // Calculate pagination
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {/* Header with animated gradient background */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl p-6 mb-6 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">My Bookings</h2>
            <p className="text-indigo-100 mt-1">Manage your car rental bookings</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium shadow-inner">
            {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64 bg-white border border-gray-100 rounded-xl shadow-sm">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading your bookings...</p>
          </div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center shadow-sm">
          <div className="inline-block p-4 bg-indigo-50 rounded-full mb-5">
            <Calendar className="w-8 h-8 text-indigo-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No bookings yet</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">You haven't made any bookings yet. Browse our cars and book your first ride!</p>
          <a href="/cars" className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 font-medium transition-all duration-300">
            Browse Available Cars
          </a>
        </div>
      ) : (
        <>
          <div className="space-y-8">
            {currentBookings.map((booking) => (
              <BookingCard 
                key={booking.id} 
                booking={booking} 
                onViewDetails={openBookingDetails} 
              />
            ))}
          </div>
          
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {/* Details Modal */}
      {isModalOpen && (
        <BookingDetailsModal 
          booking={selectedBooking}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default MyBookings;