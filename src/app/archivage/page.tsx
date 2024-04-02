

// app/backups/pages.tsx
"use client";
import React, { useState, useEffect } from "react";
import CreerButton from "@/components/buttons/CreerButton";
import SelectionnerForm from "../../components/popups/selectionnerForm";
import BackupTable from "../../components/tables/backupTable";
import { Archive } from "@/types";
import { BACKUPS } from "@/constants";
import RootLayout from "../rootLayout";
import CheckIcon from "../../../public/assets/icons/filter.svg";
import getToken from "../../utils/getToken.js";
const ArchivePage: React.FC = () => {
  const [files, setFiles] = useState<Archive[]>([]);
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const [tables, setTables] = useState<string[]>([
    "admin",
    "agentserviceachat",
    "applicationparams",
    "backups",
    "consumer",
    "director",
    "magasinier",
    "permissions",
    "rolepermissions",
    "roles",
    "structurereponsable",
    "users",
    "usersroles",
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);

  useEffect(() => {
    
    fetchDataFromBackend();
  }, []);

  const fetchDataFromBackend = async () => {
    const accessToken = await getToken();
    try {
      const response = await fetch('http://localhost:4000/api/users/getAllBackups',{
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },

      });
      if (response.ok) {
        const data = await response.json();
  
        
        const extractedBackups = data.backups.map((backup: any) => ({
          id: backup.id, 
          filename: backup.filename,
          filepath: backup.filepath,
          
        }));
        console.log(extractedBackups)
        setFiles(extractedBackups);
      } else {
        console.error('Failed to fetch backups:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching backups:', error);
    }
  };
  
  const handleTableSelection = (selectedTables: string[]) => {
    setSelectedTables(selectedTables);
    setShowPopup(false);
  };
  console.log("this is the selected tabels",selectedTables);




  const handleCreateBackup = async () => {
    setIsCreatingBackup(true);
    const accessToken = await getToken();
   

    try {
      const response = await fetch(`http://localhost:4000/api/users/createbackups`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ table: selectedTables }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Backup created successfully:', data);
        setFiles([...files, data.backup])
      } else {
        console.error('Failed to create backup:', response.statusText);
      
      }
    } catch (error) {
      console.error('Error creating backup:', error);
      
    } finally {
      setIsCreatingBackup(false);
    }
  };



  return (
    <RootLayout>
      <div className="container mx-auto py-8">
        {/* {errorMessage && <p className="text-red-500">{errorMessage}</p>} // Display error message if any */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="mr-2">Sélectionner le tableau</span>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowPopup(true)}
            >
              {" "}
              v
            </button>
          </div>
          <div className="ml-auto">
            {isCreatingBackup ? (
              <p>Creating backup...</p>
            ) : (
              <CreerButton onClick={handleCreateBackup} />
            )}
          </div>
        </div>
        <BackupTable Archives={files} />

        {showPopup && (
          <SelectionnerForm
            tables={tables}
            onSelect={handleTableSelection}
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
    </RootLayout>
  );
};

export default ArchivePage;





