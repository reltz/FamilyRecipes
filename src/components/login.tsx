import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuthStatus, login } from '../services/login-service';
import { Box, Button, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Log } from '../services/logging-service';

interface LoginProps {
  onLogin: (status: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate(); // Hook to navigate to other routes

  const { t } = useTranslation();

  useEffect(() => {
    // Check if the user is already authenticated
    Log("LOGIN COMPONENT EFFECT!")
    const authStatus = checkAuthStatus();
    if (authStatus.isAuth) {
      navigate('/'); // Redirect to home page if already authenticated
    }
  }, [navigate]);

  const handleLogin = async () => {
    // Simulate login check (replace with real validation)
    const loginAttempt = await login({
      username,
      password,
    })

    if (!!loginAttempt) {
      onLogin(true);  // Successful login
      navigate('/');   // Redirect to the home page
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Box sx={{margin: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <h2>{t("login")}</h2>
      <TextField
        type="text"
        placeholder={t("username")}
        name ="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{margin: 1}}
      />
      <TextField
        type="password"
        name="password"
        placeholder={t("password")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{margin: 1}}
      />
      <Button variant='outlined' onClick={handleLogin} sx={{margin: 1}}>{t("login")}</Button>
      {error && <p>{error}</p>}
    </Box>
  );
};

export default Login;
