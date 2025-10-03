// Test CORS by running this in browser console
async function testCORS() {
    try {
        const response = await fetch('http://localhost:8080/api/products/allProducts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('CORS test successful:', data);
        return data;
    } catch (error) {
        console.error('CORS test failed:', error);
        throw error;
    }
}

// Run the test
testCORS();
