
import React, { useState } from 'react';
import dlt from "../../../public/assets/icons/delete.svg";

const SupprimerButton: React.FC<{ email: string; onDelete: (email: string) => void }> = ({ email, onDelete }) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/users/${email}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      // Call the onDelete callback to trigger UI updates
      // onDelete(email); // Pass the email parameter to onDelete
    } catch (error) {
      setError((error as Error).message || 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDelete} disabled={loading} className="w-36 bg-transparent border-black border-2 hover:bg-black hover:text-white font-medium py-2 px-4 rounded-lg">
      <div className="flex items-center space-x-2">
        <img src={dlt.src} width="18" height="15" />
        <span>Supprimer</span>
      </div>
    </button>
  );
};

export default SupprimerButton;
