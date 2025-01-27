// components/ContactForm.js
export default function Contact() {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105">
          <h2 className="text-3xl font-semibold text-center text-teal-700 mb-6">
            Contact Us
          </h2>
          <form className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-teal-600">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your name"
                required
              />
            </div>
  
            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-teal-600">
                Your Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full p-3 mt-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>
  
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-700 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    );
  }
  