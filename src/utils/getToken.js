const getToken = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      return accessToken;
    } catch (error) {
      console.error('Error retrieving access token from local storage:', error);
      // callback(null); // Pass null on error
    }
  }
  export default getToken;