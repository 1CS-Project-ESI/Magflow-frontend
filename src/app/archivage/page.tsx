//src/app/archivage/page.tsx 
"use client";
import React, { useState, useEffect } from 'react';
import CreerButton from '@/components/buttons/CreerButton';
import SelectionnerForm from '../../components/popups/selectionnerForm';
import BackupTable from '../../components/tables/backupTable';
import { Archive } from "@/types";
import { BACKUPS } from "@/constants";
import RootLayout from "../rootLayout";
import CheckIcon from '../../../public/assets/icons/filter.svg'

const ArchivePage: React.FC = () => {
  const [files, setFiles] = useState<Archive[]>([]);
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const [tables, setTables] = useState<string[]>(["admin", 'agentserviceachat', 'applicationparams', 'backups', 'consumer', 'director', 'magasinier', 'permissions', 'rolepermissions', 'roles', 'structurereponsable', 'users', 'usersroles']);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Récupérer les données du backend en fonction des tables sélectionnées
    fetchDataFromBackend();
  }, []);

  const fetchDataFromBackend = async () => {
    const data: Archive[] = [
      // ... vos données
    ];
    setFiles(data);
  };

  const handleTableSelection = (selectedTables: string[]) => {
    setSelectedTables(selectedTables);
    setShowPopup(false);
  };
  return (
    <RootLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="mr-2">Sélectionner le tableau</span>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowPopup(true)}
            > v
            </button>
          </div>
          <div className="ml-auto">
      <CreerButton />
    </div>
        </div >
        <BackupTable Archives={BACKUPS}/>
        
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