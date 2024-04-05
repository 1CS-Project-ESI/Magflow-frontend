// const UserID = async () => {
//     try {
//       const UserID = localStorage.getItem('id');
//       return UserID;
//     } catch (error) {
//       console.error('Error retrieving access id from local storage:', error);
//       // callback(null); // Pass null on error
//     }
//   }
//   export default UserID;

const UserID = async (): Promise<number | null> => {
    try {
      const userIdString = localStorage.getItem('id');
  
      if (!userIdString) {
        return null; // Handle missing ID explicitly
      }
  
      const parsedUserId = Number(userIdString);
  
      if (Number.isNaN(parsedUserId)) {
        throw new Error('Invalid user ID stored in local storage'); // Prevent invalid data
      }
  
      return parsedUserId;
    } catch (error) {
      console.error('Error retrieving access id from local storage:', error);
      return null; // Return null on error
    }
  };
  
  export default UserID;
  