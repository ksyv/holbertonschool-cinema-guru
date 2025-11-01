import React from 'react';
import Button from '../../components/general/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// CORRECTION: On n'importe que "faUser" et "faKey"
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

export default function Register({
  username,
  password,
  setUsername,
  setPassword
}) {
  return (
    <>
      <h3 className="auth-form-title">
        Create a new account
      </h3>

      <div className="auth-input-field">
        <FontAwesomeIcon icon={faUser} className="icon" />
        <span className="label">Username :</span>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={3}
        />
      </div>
      
      <div className="auth-input-field">
        <FontAwesomeIcon icon={faKey} className="icon" />
        <span className="label">Password :</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>
      
      <div className="auth-submit-wrapper">
        <Button
          label="Sign Up"
          className="auth-submit-btn" 
          // CORRECTION: On utilise faKey
          icon={faKey} 
          type="submit" 
        />
      </div>
    </>
  );
}

