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
    <div className="min-h-screen bg-[#07120c] text-white flex flex-col items-center px-4 py-12">

      {/* HEADER */}
      <div className="text-center mb-10 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-black">
          Contact <span className="text-green-400">Support</span>
        </h1>
        <p className="text-gray-400 mt-3 text-sm sm:text-base">
          We usually respond within a few hours. Reach out for help, feedback, or partnerships.
        </p>
      </div>

      {/* CARD */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white/5 backdrop-blur-xl">

        {/* LEFT SIDE */}
        <div className="p-8 sm:p-10 bg-gradient-to-br from-green-500/10 to-lime-300/5 border-r border-white/10">

          <h2 className="text-2xl font-bold mb-4 text-green-300">
            Get in Touch
          </h2>

          <p className="text-gray-300 text-sm leading-relaxed mb-8">
            Whether you're a farmer or buyer, our team is ready to assist you anytime.
          </p>

          <div className="space-y-4 text-sm">

            <div className="flex items-center gap-3">
              <span className="text-green-400">📧</span>
              <span>support@farmart.com</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-400">📞</span>
              <span>+254 746 049 733</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-400">📍</span>
              <span>Nairobi, Kenya</span>
            </div>

          </div>

          {/* DECOR */}
          <div className="mt-10 w-full h-32 rounded-xl bg-green-400/10 blur-xl" />
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="p-8 sm:p-10">

          <h3 className="text-xl font-semibold mb-6 text-white">
            Send a Message
          </h3>

          <form ref={form} onSubmit={sendEmail} className="space-y-4">

            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <textarea
              name="message"
              placeholder="Your Message..."
              rows="5"
              required
              className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <Button
              type="submit"
              loading={isSending}
              disabled={isSending}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-lime-300 text-black font-bold hover:scale-[1.02] transition"
            >
              {isSending ? 'Sending...' : 'Send Message →'}
            </Button>

          </form>
        </div>
      </div>

      {/* BACK BUTTON */}
      <div className="mt-10">
        <Button
          onClick={() => onNavigate(backPath)}
          variant="ghost"
          className="text-gray-300 hover:text-green-400"
        >
          {backText}
        </Button>
      </div>
    </div>
  );
};

export default ContactUs;