const getRole = async () => {
  try {
    const role = localStorage.getItem("role");
    console.log('this the user role', role);
    return role;
  } catch (error) {
    console.error("Error retrieving role from local storage:", error);
    // callback(null); // Pass null on error
  }
};
export default getRole;
