import React from 'react';
import { Send } from 'lucide-react';

const ContactForm = () => {
  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <h2 className="text-3xl font-bold text-white mb-8">Send us a Message</h2>
      
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-blue-200 focus:border-transparent transition-colors"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-blue-200 focus:border-transparent transition-colors"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-200 mb-2">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg
                     text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-blue-200 focus:border-transparent transition-colors"
            placeholder="Message subject"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg
                     text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-blue-200 focus:border-transparent transition-colors resize-none"
            placeholder="Your message..."
          />
        </div>

        <div>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-blue-200 text-gray-900 rounded-lg
                     font-medium hover:bg-blue-300 focus:outline-none focus:ring-2 
                     focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-gray-900
                     transition-colors"
          >
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;