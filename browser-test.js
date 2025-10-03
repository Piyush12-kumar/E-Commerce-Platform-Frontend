// Simple test to verify login API works in browser
// Open browser console and paste this code

async function testLogin() {
    try {
        console.log('Testing login API...');
        
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
        
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers));
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.text();
        console.log('Login successful, token:', data);
        
        // Test profile API
        const profileResponse = await fetch('/api/users/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${data}`,
                'Content-Type': 'application/json',
            }
        });
        
        console.log('Profile response status:', profileResponse.status);
        
        if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            console.log('Profile data:', profileData);
        } else {
            console.error('Profile fetch failed');
        }
        
    } catch (error) {
        console.error('Test failed:', error);
    }
}

// Run the test
testLogin();
