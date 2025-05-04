const API_URL = 'http://localhost:5000';

export const getPredictionFromCanvasAPI = async (canvasData, debug = false) => {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: canvasData,
        debug: debug
      }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error in API call:', error);
    return { error: 'Failed to get prediction' };
  }
};

export const getPredictionFromImageAPI = async (imageData) => {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageData
      }),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error in API call:', error);
    return { error: 'Failed to get prediction' };
  }
};

export const submitTrainingData = async (imageData, digit) => {
  try {
    console.log(`Submitting training data for digit ${digit}, data length: ${imageData.length}`);
    
    // Check if the imageData is a proper base64 string
    if (!imageData.startsWith('data:image')) {
      return { error: 'Invalid image data format' };
    }
    
    const response = await fetch(`${API_URL}/contribute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageData,
        digit: digit
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("API response received:", data);
    return data;
  } catch (error) {
    console.error('Error submitting training data:', error);
    return { error: error.message || 'Failed to submit training data' };
  }
};

export const getContributionStatus = async () => {
  try {
    const response = await fetch(`${API_URL}/contribution-status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching contribution status:', error);
    return { error: 'Failed to fetch contribution status' };
  }
};
