import React from 'react';

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="mb-4">
            <strong>Phone:</strong> +1 (234) 567-890
          </p>
          <p className="mb-4">
            <strong>Email:</strong> info@driveluxe.com
          </p>
          <p>
            <strong>Address:</strong> 123 Luxury Drive, Beverly Hills, CA 90210
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>
          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full px-4 py-2 border rounded-lg"
            />
            <textarea 
              placeholder="Your Message" 
              className="w-full px-4 py-2 border rounded-lg h-32"
            ></textarea>
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}