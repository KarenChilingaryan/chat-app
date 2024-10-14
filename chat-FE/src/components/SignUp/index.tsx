import React, { useState } from 'react';
import { axiosInstance } from '../../utils/server';
import styles from './signup.module.scss';
import { generateRandomColor } from '../../constants/functions';

const Signup: React.FC = () => {
    const [fullName, setFullName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSignup = async () => {
        if (!username || !fullName || !password) {
            return;
        }

        try {
            const userData = { username, fullName, password, color: generateRandomColor() };
            await axiosInstance.post('/auth/signup', userData);
        } catch (err) {
            console.error('Signup error:', err);
        }
    };

    return (
        <div className={styles.signupContainer}>
            <div className={styles.signupBox}>
                <h1 className={styles.title}>Sign Up for an account</h1>
                <form >
                    <div className={styles.inputGroup}>
                        <label htmlFor="firstName">Full name*</label>
                        <input
                            type="text"
                            id="firstName"
                            placeholder="Enter your first name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="username">Username*</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password*</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                </form>
                <button className={styles.signupButton}
                    onClick={handleSignup}
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default Signup;