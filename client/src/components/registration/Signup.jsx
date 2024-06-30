import './registration.scss';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/authSlice';
import anime from 'animejs/lib/anime.es.js';

const Signup = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    let currentAnimation = null;

    const handleFocus = (id, offset, dasharray) => {
      if (currentAnimation) currentAnimation.pause();
      currentAnimation = anime({
        targets: 'path',
        strokeDashoffset: {
          value: offset,
          duration: 700,
          easing: 'easeOutQuart',
        },
        strokeDasharray: {
          value: dasharray,
          duration: 700,
          easing: 'easeOutQuart',
        },
      });
    };

    document.getElementById('email').addEventListener('focus', () => {
      handleFocus('email', 0, '240 1386');
    });

    document.getElementById('password').addEventListener('focus', () => {
      handleFocus('password', -336, '240 1386');
    });

    document.getElementById('submit').addEventListener('focus', () => {
      handleFocus('submit', -730, '530 1386');
    });

    return () => {
      if (currentAnimation) currentAnimation.pause();
    };
  }, []);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      register({
        username: state.username,
        email: state.email,
        password: state.password,
      })
    );
  };

  return (
    <div className="page">
      <div className="container">
        <div className="left">
          <div className="login">Sign Up</div>
          <div className="eula">
            Create an account to manage your tasks efficiently and collaborate seamlessly with your team.
          </div>
        </div>
        <div className="right">
          <svg viewBox="0 0 320 300">
            <defs>
              <linearGradient
                id="linearGradient"
                x1="13"
                y1="193.49992"
                x2="307"
                y2="193.49992"
                gradientUnits="userSpaceOnUse"
              >
                <stop style={{ stopColor: '#4779B9' }} offset="0" />
                <stop style={{ stopColor: '#002BFF' }} offset="1" />
              </linearGradient>
            </defs>
            <path
              d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143"
            />
          </svg>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={state.username}
                placeholder="Enter Username"
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={state.email}
                placeholder="Enter Email"
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={state.password}
                placeholder="Enter Password"
                onChange={handleChange}
              />
              <input type="submit" id="submit" value="Sign Up" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
