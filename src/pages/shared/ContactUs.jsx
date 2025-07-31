import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Button from '../../components/common/Button';

const ContactUs = ({ onNavigate, fromPortal }) => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const backPath = fromPortal === 'seller' ? '/seller/dashboard' : '/shop';
  const backText = fromPortal === 'seller' ? '← Back to Dashboard' : '← Back to Shop';

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        'service_ili2gqn',    
        'template_fcam8bq',   
        form.current,
        'HPYSq67Uru7FGi-2N'     
      )
      .then(
        () => {
          alert('Message sent successfully!');
          form.current.reset();
          setIsSending(false);
        },
        (error) => {
          alert('Failed to send message. Please try again.');
          console.error('EmailJS Error:', error);
          setIsSending(false);
        }
      );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
      <div className="bg-teal-700 text-white p-8 flex flex-col justify-center">

          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-6">Have questions? We'd love to hear from you. Reach out and we’ll get back to you soon.</p>
          <ul className="space-y-4">
            <li>📧 support@farmart.com</li>
            <li>📞 +254 746 049 733</li>
            <li>📍 Nairobi, Kenya</li>
          </ul>
        </div>
        <div className="p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send a Message</h3>
          <form ref={form} onSubmit={sendEmail} className="space-y-5">
            <input type="text" name="user_name" placeholder="Your Name" required className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500" />
            <input type="email" name="user_email" placeholder="Your Email" required className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500" />
            <textarea name="message" placeholder="Your Message" rows="5" required className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"></textarea>
            <Button type="submit" loading={isSending} disabled={isSending} className="w-full">
              {isSending ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>

      <div className="mt-8">
        <Button onClick={() => onNavigate(backPath)} variant="ghost">
          {backText}
        </Button>
      </div>
    </div>
  );
};

export default ContactUs;