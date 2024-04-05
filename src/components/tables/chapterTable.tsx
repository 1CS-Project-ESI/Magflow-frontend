
import React from "react";
import Link from "next/link";
import UpdateChapterButton from "../buttons/updateChapterButton";
import deleteIcon from "../../../public/assets/icons/delete.svg";
import getToken from "@/utils/getToken";

interface Chapter {
  id: number;
  name: string;
  description: string;
  id_agentserviceachat: number;
}

interface ChaptersTableProps {
  chapters: Chapter[];
}


const handleDeleteChapter = async (id: number) => {
 
  const accessToken = await getToken();

  try {
    const response = await fetch(
      `http://localhost:4000/api/store/chapter/delete/${id}`,
      {
        method: "DELETE", // Set request method to DELETE
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error deleting structure: ${await response.text()}`);
    }

    console.log("chapter deleted successfully!");
  
  } catch (error) {
    console.error("Error during deletion:", error);

  } finally {
   
  }
};

const ChaptersTable: React.FC<ChaptersTableProps> = ({ chapters }) => {
  return (
    <div>
      {chapters.map((chapter) => (
        <div
          key={chapter.id}
          className="bg-white border border-gray-300 flex justify-between p-6 mb-4 rounded-md"
        >
          <div>
            <span className="font-bold text-xl mb-8">
              <Link href={{ pathname: "/chapitreDetails", query: { id: chapter.id } }}>
                {chapter.name}
              </Link>
            </span>
          </div>
          <div className="flex items-center">
            {/* <span className="mr-3">
              <UpdateChapterButton showPopup={true} />
            </span> */}
            <button
                className="w-36 bg-transparent border-black border-2 hover:bg-black hover:text-white font-medium py-2 px-4 rounded-lg"
                onClick={async () => {
                  await handleDeleteChapter(chapter.id);
                }}
              >
              <div className="flex items-center space-x-2">
                <img src={deleteIcon.src} alt="delete" width="18" height="15" />
                <span>Supprimer</span>
              </div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChaptersTable;

