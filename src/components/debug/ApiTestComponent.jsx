import React, { useState } from 'react';
import { getProducts } from '../../api/productApi';

const ApiTestComponent = () => {
    const [testResult, setTestResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const testApi = async () => {
        setIsLoading(true);
        setTestResult('Testing...');
        
        try {
            const response = await getProducts();
            console.log('Direct API test response:', response);
            setTestResult(`Success! Got ${response.data?.products?.length || 'unknown'} products`);
        } catch (error) {
            console.error('Direct API test error:', error);
            setTestResult(`Error: ${error.message} - ${error.response?.status || 'No status'}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ 
            position: 'fixed', 
            top: '10px', 
            right: '10px', 
            background: 'white', 
            padding: '10px', 
            border: '1px solid #ccc',
            zIndex: 1000
        }}>
            <h4>API Test</h4>
            <button onClick={testApi} disabled={isLoading}>
                Test Products API
            </button>
            <p>{testResult}</p>
        </div>
    );
};

export default ApiTestComponent;
