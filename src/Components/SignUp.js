import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/bg.jpeg';


const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
        return;
      }

      const data = await response.json();
      alert(data.message);
      navigate('/');
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while signing up.");
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      flexDirection: 'column',
      backgroundImage: `url(${bgImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundColor: 'black',
    },
    box: {
      position: 'relative',
      width: '400px',
      height: '550px',
      background: '#1c1c1c',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 0 15px 5px rgba(255, 187, 69, 0.5)',
      animation: 'pulse 2s infinite',
    },
    form: {
      position: 'absolute',
      inset: '2px',
      background: '#4b5455',
      padding: '40px 30px',
      borderRadius: '8px',
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      color: '#fff',
      fontWeight: 500,
      textAlign: 'center',
      letterSpacing: '0.1em',
      marginBottom: '20px',
    },
    submitButton: {
      padding: '10px',
      borderRadius: '10px',
      backgroundColor: '#ffbb45',
      color: 'white',
      cursor: 'pointer',
      marginTop: '76px',
    },
    inputBox: {
      position: 'relative',
      width: '100%',
      marginTop: '30px',
    },
    input: {
      width: '100%',
      padding: '15px 10px',
      background: 'transparent',
      outline: 'none',
      border: 'none',
      color: '#23242a',
      fontSize: '1em',
      transition: '0.5s',
      zIndex: 10,
    },
    inputLabel: {
      position: 'absolute',
      left: 0,
      pointerEvents: 'none',
      fontSize: '1em',
      color: '#8f8f8f',
      transition: '0.5s',
    },
    inputUnderline: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      height: '2px',
      background: '#ffbb45',
      borderRadius: '4px',
      transition: '0.5s',
      pointerEvents: 'none',
      zIndex: 9,
    },
    link: {
      color: 'white',
      marginTop: '1%',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <h1 style={styles.title}>SIGN UP</h1>
          <center>
            <div style={styles.inputBox}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                maxLength="40"
                required
                style={styles.input}
              />
              <span style={styles.inputLabel}>Enter your email</span>
              <i style={styles.inputUnderline}></i>
            </div>

            <div style={styles.inputBox}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                maxLength="40"
                required
                style={styles.input}
              />
              <span style={styles.inputLabel}>Enter your password</span>
              <i style={styles.inputUnderline}></i>
            </div>

            <div style={styles.inputBox}>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                maxLength="40"
                required
                style={styles.input}
              />
              <span style={styles.inputLabel}>Confirm your password</span>
              <i style={styles.inputUnderline}></i>
            </div>

            <input type="submit" value="Sign Up" style={styles.submitButton} />
            <p style={styles.link}>Already registered? <a href="/" style={styles.link}>Login</a></p>
          </center>
        </form>
      </div>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { box-shadow: 0 0 15px 5px rgba(255, 187, 69, 0.5); }
            50% { box-shadow: 0 0 25px 10px rgba(255, 187, 69, 0.8); }
          }
        `}
      </style>
    </div>
  );
};

export default SignUp;
