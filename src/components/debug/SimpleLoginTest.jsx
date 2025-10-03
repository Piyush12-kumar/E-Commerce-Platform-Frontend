import React, { useState } from 'react';

const SimpleLoginTest = () => {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const testDirectLogin = async () => {
        setLoading(true);
        setResult('Testing...');
        
        try {
            console.log('Testing direct API call...');
            
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: 'johnny',
                    password: 'johnny'
                })
            });
            
            console.log('Response received:', response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const token = await response.text();
            console.log('Token received:', token);
            setResult(`Success! Token: ${token.substring(0, 50)}...`);
            
        } catch (error) {
            console.error('Direct API test failed:', error);
            setResult(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            position: 'fixed', 
            top: '50px', 
            right: '10px', 
            background: 'white', 
            padding: '15px', 
            border: '2px solid #007bff',
            borderRadius: '5px',
            zIndex: 1000,
            maxWidth: '300px'
        }}>
            <h4>Direct API Test</h4>
            <button 
                onClick={testDirectLogin}
                disabled={loading}
                style={{ marginBottom: '10px' }}
            >
                {loading ? 'Testing...' : 'Test Login API'}
            </button>
            <div style={{ fontSize: '12px', wordBreak: 'break-word' }}>
                {result}
            </div>
        </div>
    );
};

export default SimpleLoginTest;
