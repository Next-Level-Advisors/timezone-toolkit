// N8N Code Node: Simple HTTP Test
// Test basic HTTP functionality with N8N helpers

return (async () => {

  console.log('Starting simple HTTP test...');

  // Test 1: Simple GET request to a reliable public API
  try {
    console.log('Test 1: Pinging httpbin.org (simple GET)...');
    
    const requestOptions1 = {
      method: 'GET',
      uri: 'https://httpbin.org/get',
      json: true
    };
    
    console.log('Request options:', JSON.stringify(requestOptions1, null, 2));
    
    const response1 = await this.helpers.httpRequest(requestOptions1);
    
    console.log('✅ Test 1 SUCCESS!');
    console.log('Response:', JSON.stringify(response1, null, 2));
    
  } catch (error1) {
    console.log('❌ Test 1 FAILED!');
    console.log('Error:', error1.message);
    console.log('Full error:', JSON.stringify(error1, null, 2));
  }

  // Test 2: Simple GET request to Google (just to see if we can reach it)
  try {
    console.log('Test 2: Pinging Google (simple GET)...');
    
    const requestOptions2 = {
      method: 'GET',
      uri: 'https://www.google.com',
      json: false  // Don't parse as JSON since it's HTML
    };
    
    const response2 = await this.helpers.httpRequest(requestOptions2);
    
    console.log('✅ Test 2 SUCCESS!');
    console.log('Response length:', response2.length, 'characters');
    console.log('Response preview:', response2.substring(0, 100) + '...');
    
  } catch (error2) {
    console.log('❌ Test 2 FAILED!');
    console.log('Error:', error2.message);
  }

  // Test 3: JSON API test (JSONPlaceholder)
  try {
    console.log('Test 3: Testing JSON API (JSONPlaceholder)...');
    
    const requestOptions3 = {
      method: 'GET',
      uri: 'https://jsonplaceholder.typicode.com/posts/1',
      json: true
    };
    
    const response3 = await this.helpers.httpRequest(requestOptions3);
    
    console.log('✅ Test 3 SUCCESS!');
    console.log('JSON Response:', JSON.stringify(response3, null, 2));
    
  } catch (error3) {
    console.log('❌ Test 3 FAILED!');
    console.log('Error:', error3.message);
  }

  // Return test results
  return [{
    json: {
      message: 'HTTP tests completed - check console logs for results',
      testsPassed: 'See console for individual test results',
      timestamp: new Date().toISOString()
    }
  }];

})(); 