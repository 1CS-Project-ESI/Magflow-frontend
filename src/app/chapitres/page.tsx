"use client";

// import React, { useEffect, useState } from "react";

// import RootLayout from "../rootLayout";

// import AddChapterButton from "@/components/buttons/addChapterButton";
// import ChaptersTable from "@/components/tables/chapterTable";
// import getRole from "@/utils/getRole";

// const ChaptersPage: React.FC = () => {

//   const [chapters, setChapters] = useState([]);
//   const [role, setRole] = useState([]);

//   useEffect(() => {
//     const fetchChapters = async () => {
//       const userRole = await getRole();
//       setRole(userRole);
//       console.log("the role is ",userRole);
//       try {
//         const response = await fetch('http://localhost:4000/api/store/chapter/all'); 
//         const data = await response.json();
//         console.log(data);
//         if (!response.ok) {
//           throw new Error(`Error fetching chapters: ${data.message}`);
//         }

//         setChapters(data.chapters);
//       } catch (error) {
//         console.error("Error fetching chapters:", error);
        
//       }
//     };

//     fetchChapters();
//   }, []);

//   return (
//     <RootLayout>
//       <div className="flex m-8 justify-end">
//       {userRole === 'agentserviceachat' && <AddChapterButton showPopup={true} />}
//       </div>
//       <div className="m-8 mt-8">
//         <ChaptersTable chapters={chapters} />
//       </div>
//     </RootLayout>
//   );
// };

// export default ChaptersPage;
import React, { useEffect, useState } from "react";
import RootLayout from "../rootLayout";
import AddChapterButton from "@/components/buttons/addChapterButton";
import ChaptersTable from "@/components/tables/chapterTable";
import getRole from "@/utils/getRole";

const ChaptersPage: React.FC = () => {
  const [chapters, setChapters] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const userRole = await getRole();
        if (userRole !== null && userRole !== undefined) {
          setRole(userRole);
          console.log("the role is ", userRole);

          const response = await fetch("http://localhost:4000/api/store/chapter/all");
          if (!response.ok) {
            throw new Error(`Error fetching chapters: ${response.statusText}`);
          }
          
          const data = await response.json();
          console.log(data);
          setChapters(data.chapters);
        }
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    fetchChapters();
  }, []);

  return (
    <RootLayout>
      <div className="flex m-8 justify-end">
        {role === 'agentserviceachat' && <AddChapterButton showPopup={true} />}
      </div>
      <div className="m-8 mt-8">
        <ChaptersTable chapters={chapters} />
      </div>
    </RootLayout>
  );
};

export default ChaptersPage;
