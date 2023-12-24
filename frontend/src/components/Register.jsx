import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    // Initialize your form fields, for example:
    position: '',
    company: '',
    jobdescription:'',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      // Handle the response here (e.g., showing a success message)
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle the error here (e.g., showing an error message)
    }
  };

  return (
    <div className="column">
        <form className="box" onSubmit={handleSubmit}>
            <div className="field">
                <label className="label">Application Position</label>
                <div className="control">
                    <input 
                    className="input"
                    type="text" 
                    name="position"
                    placeholder="Enter application position" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Application Company</label>
                <div className="control">
                    <input 
                    className="input"
                    type="text" 
                    name="company"
                    placeholder="Enter application company" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required
                    />
                </div>
            </div>
            <div className="field">
                <label className="label">Job Description</label>
                <div className="control">
                    <input 
                    className="input"
                    type="text" 
                    name="jobdescription"
                    placeholder="Enter job description" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required
                    />
                </div>
            </div>
            <br></br>
            <button className="button is-primary" type="submit">Confrimed</button>
        </form>
    </div>
  );
}

export default Register;