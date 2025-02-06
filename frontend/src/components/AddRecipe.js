import React, { useState } from 'react';

const AddRecipe = () => {
  // State to store form input values and error messages
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !message) {
      setError('All fields are required.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }

    // Reset errors and set success message
    setError('');
    setSuccess(true);
    
    // Here, you can make an API call or process the form data as needed
    console.log({ name, email, message });

    // Optionally clear form after submission
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="form-page">
      <h2>Contact Us</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-btn">Submit</button>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">Your message has been sent successfully!</div>}
      </form>
    </div>
  );
};

export default AddRecipe;
