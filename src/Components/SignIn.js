import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define your keyframes as a string
const keyframes = `
@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
`;

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const response = await fetch("http://localhost:8080/api/signin", { // Use the correct endpoint for signing in
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  email: formData.email,
                  password: formData.password,
              }),
          });
  
          const data = await response.json();
  
          if (response.ok) {
              navigate("/home"); // Redirect after successful login
          } else {
              alert(data.message); // Show error message from the server
          }
      } catch (error) {
          console.error("Error:", error);
          alert("An error occurred while signing in.");
      }
  };
  

    const handleSignup = () => {
        navigate('/SignUp');
    };

    const styles = {
        container: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: "url('https://i.postimg.cc/XYjWrv36/dark-hexagonal-background-with-gradient-color_79603-1409.jpg') no-repeat",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        box: {
            position: 'relative',
            width: '370px',
            height: '450px',
            background: '#1c1c1c',
            borderRadius: '50px 5px',
            overflow: 'hidden',
        },
        boxBeforeAfter: {
            content: "''",
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '370px',
            height: '450px',
            transformOrigin: 'bottom right',
            animation: 'animate 6s linear infinite',
        },
        boxBefore: {
            background: 'linear-gradient(60deg, transparent, #45f3ff, #45f3ff)',
        },
        boxAfter: {
            background: 'linear-gradient(60deg, transparent, #d9138a, #d9138a)',
            animationDelay: '-3s',
        },
        form: {
            position: 'absolute',
            inset: '2px',
            borderRadius: '50px 5px',
            background: '#28292d',
            zIndex: '10',
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
        },
        h2: {
            color: '#45f3ff',
            fontSize: '35px',
            fontWeight: '500',
            textAlign: 'center',
        },
        inputBox: {
            position: 'relative',
            width: '300px',
            marginTop: '35px',
        },
        input: {
            position: 'relative',
            width: '100%',
            padding: '20px 10px 10px',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#ffffff',
            fontSize: '1em',
            letterSpacing: '.05em',
            zIndex: '10',
            transition: 'border-color 0.3s, color 0.3s',
        },
        inputSubmit: {
            fontSize: '20px',
            border: 'none',
            outline: 'none',
            background: '#45f3ff',
            padding: '5px',
            marginTop: '40px',
            borderRadius: '90px',
            fontWeight: '600',
            cursor: 'pointer',
        },
        span: {
            position: 'absolute',
            left: '0',
            marginTop: '5px',
            fontSize: '1em',
            color: '#8f8f8f',
            pointerEvents: 'none',
            letterSpacing: '.05em',
            transition: '.5s',
        },
        i: {
            position: 'absolute',
            left: '0',
            bottom: '0',
            width: '100%',
            height: '2px',
            background: 'rgb(69, 243, 255)',
            borderRadius: '4px',
            transition: '.5s',
            pointerEvents: 'none',
            zIndex: '9',
        },
        links: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        link: {
            margin: '25px 0',
            fontSize: '1em',
            color: '#8f8f8f',
            textDecoration: 'none',
            marginTop: '18px',
        },
        linkHover2: {
            color: '#d9138a',
        },
        inputHover: {
            color: '#45f3ff',
        },
    };

    return (
        <div style={styles.container}>
            <style>{keyframes}</style>
            <div style={styles.box}>
                <div style={{ ...styles.boxBeforeAfter, ...styles.boxBefore }}></div>
                <div style={{ ...styles.boxBeforeAfter, ...styles.boxAfter }}></div>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <h2 style={styles.h2}>Sign In</h2>
                    <div style={styles.inputBox}>
                        <input 
                            type="text" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required 
                            placeholder="Email" 
                            style={styles.input} 
                        />
                        <i style={styles.i}></i>
                    </div>
                    <div style={styles.inputBox}>
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required 
                            placeholder="Enter Password" 
                            style={styles.input} 
                        />
                        <i style={styles.i}></i>
                    </div>
                    <input type="submit" value="Login" style={styles.inputSubmit} />
                    <div style={styles.links}>
                        <a href="#" style={styles.link}>Forgot Password?</a>
                        <a href="#" 
                           style={{ ...styles.link, ...styles.linkHover2 }} 
                           onClick={handleSignup}>
                           Sign Up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
