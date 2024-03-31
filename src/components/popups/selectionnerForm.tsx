 // src/components/Popups/SelectionnerForm.tsx
 "use client"
 import React, { useState } from 'react';
 
 interface SelectionnerFormProps {
  tables: string[];
  onSelect: (selectedTables: string[]) => void;
  onClose: () => void;
}

const SelectionnerForm: React.FC<SelectionnerFormProps> = ({ onSelect, onClose }) => {
  const tables = [
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
    "structure",
    "structureresponasble",
    "users",
    "usersroles",
  ];
  const [selectedTables, setSelectedTables] = useState<string[]>([]);

  const handleTableSelect = (table: string) => {
    if (selectedTables.includes(table)) {
      setSelectedTables(selectedTables.filter((t) => t !== table));
    } else {
      setSelectedTables([...selectedTables, table]);
    }
  };

  const handleSubmit = () => {
    onSelect(selectedTables);
    onClose();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div>
            {/* Option 1: Checkbox without grouping */}
            {tables.map((table) => (
              <div className="flex items-center mb-4" key={table}>
                <input
                  type="checkbox"
                  id={table} // Use unique IDs here (optional)
                  className="mr-2"
                  checked={selectedTables.includes(table)}
                  onChange={() => handleTableSelect(table)}
                />
                <label htmlFor={table} className="text-sm">
                  {table}
                </label>
              </div>
            ))}
          </div>
 
           <div className="mt-4 flex justify-end">
           <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-40 mr-4 ml-4 $`} 
   style={{ backgroundColor: "#510A6D" ,fontSize:'0.8em' }}
   onClick={handleSubmit}
   > Valider
   </button>
           </div>
         </div>
       </div>
     </div>
   );
 };
 
 export default SelectionnerForm; 