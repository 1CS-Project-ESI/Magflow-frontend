


// "use client";

// import React, { useState, useEffect } from "react";
// import RootLayout from "../rootLayout";
// import { Chapter, Product, Article, Fournisseur } from "@/types";
// import OptionSelection from "@/components/commands/selection";
// import save from "../../../public/assets/icons/EnregistrerPDF.svg";
// import getToken from "@/utils/getToken";
// import UserID from "@/utils/getID";

// const Page = () => {
//   const [chapters, setChapters] = useState<Chapter[]>([]);
//   const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
//   const [chapterId, setChapterId] = useState<string>('');
//   const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
//   const [articleId, setArticleId] = useState<string>('');
//   const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
//   const [fournisseurs, setFournisseurs] = useState<Fournisseur[]>([]);
//   const [selectedFournisseur, setSelectedFournisseur] = useState<Fournisseur | null>(null);
//   const [fournisseurId, setFournisseurId] = useState<string>('');
//   const [selectedFournisseurId, setSelectedFournisseurId] = useState<string | null>(null);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [selectedOptions, setSelectedOptions] = useState<
//     { chapter: Chapter | null; article: Article | null; product: Product | null; fournisseur: Fournisseur | null; price: number; quantity: number }[]
//   >([]);

//   useEffect(() => {
//     const fetchChapters = async () => {
//       try {
//         const response = await fetch('http://localhost:4000/api/store/chapter/all');
//         const data = await response.json();
//         console.log("this is chapter array", data)
//         setChapters(data.chapters);
//       } catch (error) {
//         console.error("Error fetching chapters:", error);
//       }
//     };
//     fetchChapters();
//   }, []);

//   const handleSelectdChapter = (chapter: Chapter | null) => {
//     setSelectedChapter(chapter);
//     if (chapter) {
//       setChapterId(chapter.id?.toString() || '');
//       setSelectedChapterId(chapter.id?.toString() || null);
//     } else {
//       setChapterId('');
//       setSelectedChapterId(null);
//     }
//   };

//   useEffect(() => {
//     if (selectedChapterId !== null) {
//       console.log("final consol of id chapter ", selectedChapterId)
//       fetchChapterArticles(selectedChapterId);
//     }
//   }, [selectedChapterId]);

//   const fetchChapterArticles = async (chapterId: string) => {
//     const accessToken = await getToken();
//     console.log("id of chapter selected ", chapterId);

//     try {
//       const response = await fetch(`http://localhost:4000/api/store/chapter/articles/${chapterId}`, {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const articles = data;
//         console.log(articles);
//         setArticles(articles);
//       } else {
//         console.error("Failed to fetch chapter articles:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching chapter articles:", error);
//     }
//   };

//   const handleSelectedArticle = (article: Article | null) => {
//     setSelectedArticle(article);
//     if (article) {
//       setArticleId(article.id?.toString() || '');
//       setSelectedArticleId(article.id?.toString() || null);
//     } else {
//       setArticleId('');
//       setSelectedArticleId(null);
//     }
//   };

//   useEffect(() => {
//     if (selectedArticleId !== null) {
//       console.log("final consol of id article ", selectedArticleId)
//       fetchArticleProducts(selectedArticleId);
//     }
//   }, [selectedArticleId]);

//   const fetchArticleProducts = async (articleId: string) => {
//     const accessToken = await getToken();
//     console.log("id of article selected ", articleId);

//     try {
//       const response = await fetch(`http://localhost:4000/api/store/article/products/${articleId}`, {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const products = data;
//         console.log(products);
//         setProducts(products);
//       } else {
//         console.error("Failed to fetch article products:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching article products:", error);
//     }
//   };

//   useEffect(() => {
//     if (selectedChapterId !== null) {
//       console.log("final consol of id chapter ", selectedChapterId)
//       fetchChapterFournisseurs(selectedChapterId);
//     }
//   }, [selectedChapterId]);

//   const fetchChapterFournisseurs = async (chapterId: string) => {
//     const accessToken = await getToken();
//     console.log("id of chapter selected ", chapterId);

//     try {
//       const response = await fetch('http://localhost:4000/api/fournisseur/allFournisseurs', {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const fournisseurs = data;
//         console.log(fournisseurs);
//         setFournisseurs(fournisseurs);
//       } else {
//         console.error("Failed to fetch chapter fournisseurs:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching chapter fournisseurs:", error);
//     }
//   };

//   const handleSelectedFournisseur = (fournisseur: Fournisseur | null) => {
//     setSelectedFournisseur(fournisseur);
//     if (fournisseur) {
//       setFournisseurId(fournisseur.id?.toString() || '');
//       setSelectedFournisseurId(fournisseur.id?.toString() || null);
//     } else {
//       setFournisseurId('');
//       setSelectedFournisseurId(null);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const accessToken = await getToken();
//     const id = await UserID();

//     console.log("token is ", accessToken);
//     console.log("id is ", id);

//     const now = new Date();
//     const orderdate = now.toISOString().substring(0, 10); // Format date as YYYY-MM-DD

//     const randomNumber = Math.floor(Math.random() * 100000) + 100000; // Generate a 6-digit number
//     const number = `${randomNumber}`;

//     const DeliveryDate = new Date(now);
//     DeliveryDate.setDate(DeliveryDate.getDate() + 60);
//     const deliverydate = DeliveryDate.toISOString().substring(0, 10);

//     const status = "pending";
//     const productsOrdered = selectedOptions.map((option) => ({
//       productId: option.product?.id,
//       ordered_quantity: option.quantity,
//       price: option.price,
//     }));
//     const orderspecifications = "Example command for linking";
//     const id_fournisseur = selectedFournisseur?.id;
//     console.log("this is the id of the selected fournisseur ", selectedFournisseur?.id);
//     try {
//       const response = await fetch(`http://localhost:4000/api/bons/create/${id}`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           number,
//           orderdate,
//           orderspecifications,
//           status,
//           productsOrdered,
//           id_fournisseur,
//         }),
//       });
//       console.log("this is the id of the selected article ", selectedArticle?.id);
//       if (response.ok) {
//         // Handle success
//       } else {
//         console.error('Error adding commandes:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error adding commandes:', error);
//     }
//   };

//   return (
//     <RootLayout>
//       <div className="bg-white border border-gray-300 grid grid-cols-1 p-8 m-8 rounded-md">
//         <h1 className="text-3xl mx-8">Nouvelle Commande Externe</h1>
//         <OptionSelection
//           chapters={chapters}
//           articles={articles}
//           products={products}
//           fournisseurs={fournisseurs}
//           selectedOptions={selectedOptions}
//           setSelectedOptions={setSelectedOptions}
//           onSelectChapter={handleSelectdChapter}
//           onSelectArticle={handleSelectedArticle}
//           onSelectFournisseur={handleSelectedFournisseur} setSelectedChapterId={function (value: React.SetStateAction<string | null>): void {
//             throw new Error("Function not implemented.");
//           } } setSelectedArticleId={function (value: React.SetStateAction<string | null>): void {
//             throw new Error("Function not implemented.");
//           } } setSelectedFournisseurId={function (value: React.SetStateAction<string | null>): void {
//             throw new Error("Function not implemented.");
//           } }        />
//         <div className="w-full flex justify-end">
//           <button
//             className="bg-purple-950 text-white hover:bg-black font-medium py-2 px-4 mx-8 rounded-lg"
//             onClick={handleSubmit}
//           >
//             <div className="flex items-center space-x-2">
//               <img src={save.src} alt="Save Icon" className="h-6 w-6" />
//                          <span>Enregistrer</span>
//           </div>
//         </button>
//       </div>
//     </div>
//   </RootLayout>
//   );
// };

// export default Page;



"use client";

import React, { useState, useEffect } from "react";
import RootLayout from "../rootLayout";
import { Chapter, Product, Article, Fournisseur } from "@/types";
import OptionSelection from "@/components/commands/selection";
import save from "../../../public/assets/icons/EnregistrerPDF.svg";
import getToken from "@/utils/getToken";
import UserID from "@/utils/getID";

const Page = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [fournisseurs, setFournisseurs] = useState<Fournisseur[]>([]);
  const [selectedFournisseur, setSelectedFournisseur] = useState<Fournisseur | null>(null);
  const [selectedFournisseurId, setSelectedFournisseurId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<
    { chapter: Chapter | null; article: Article | null; product: Product | null; fournisseur: Fournisseur | null; price: number; quantity: number }[]
  >([]);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/store/chapter/all');
        const data = await response.json();
        console.log("this is chapter array", data);
        setChapters(data.chapters);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };
    fetchChapters();
  }, []);

  const handleSelectChapter = (chapter: Chapter | null) => {
    setSelectedChapter(chapter);
    if (chapter) {
      setSelectedChapterId(chapter.id?.toString() || null);
    } else {
      setSelectedChapterId(null);
    }
  };

  useEffect(() => {
    if (selectedChapterId !== null) {
      console.log("final console of id chapter ", selectedChapterId);
      fetchChapterArticles(selectedChapterId);
    }
  }, [selectedChapterId]);

  const fetchChapterArticles = async (chapterId: string) => {
    const accessToken = await getToken();
    console.log("id of chapter selected ", chapterId);

    try {
      const response = await fetch(`http://localhost:4000/api/store/chapter/articles/${chapterId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setArticles(data);
      } else {
        console.error("Failed to fetch chapter articles:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching chapter articles:", error);
    }
  };

  const handleSelectArticle = (article: Article | null) => {
    setSelectedArticle(article);
    if (article) {
      setSelectedArticleId(article.id?.toString() || null);
    } else {
      setSelectedArticleId(null);
    }
  };

  useEffect(() => {
    if (selectedArticleId !== null) {
      console.log("final console of id article ", selectedArticleId);
      fetchArticleProducts(selectedArticleId);
    }
  }, [selectedArticleId]);

  const fetchArticleProducts = async (articleId: string) => {
    const accessToken = await getToken();
    console.log("id of article selected ", articleId);

    try {
      const response = await fetch(`http://localhost:4000/api/store/article/products/${articleId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } else {
        console.error("Failed to fetch article products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching article products:", error);
    }
  };

  useEffect(() => {
    fetchFournisseurs();
  }, []);

  const fetchFournisseurs = async () => {
    const accessToken = await getToken();

    try {
      const response = await fetch('http://localhost:4000/api/fournisseur/allFournisseurs', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setFournisseurs(data);
      } else {
        console.error("Failed to fetch fournisseurs:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching fournisseurs:", error);
    }
  };

  const handleSelectFournisseur = (fournisseur: Fournisseur | null) => {
    setSelectedFournisseur(fournisseur);
    if (fournisseur) {
      setSelectedFournisseurId(fournisseur.id?.toString() || null);
    } else {
      setSelectedFournisseurId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = await getToken();
    const id = await UserID();

    console.log("token is ", accessToken);
    console.log("id is ", id);

    const now = new Date();
    const orderdate = now.toISOString().substring(0, 10); // Format date as YYYY-MM-DD

    const randomNumber = Math.floor(Math.random() * 100000) + 100000; // Generate a 6-digit number
    const number = `${randomNumber}`;

    const DeliveryDate = new Date(now);
    DeliveryDate.setDate(DeliveryDate.getDate() + 60);
    const deliverydate = DeliveryDate.toISOString().substring(0, 10);

    const status = "pending";
    const productsOrdered = selectedOptions.map((option) => ({
      productId: option.product?.id,
      ordered_quantity: option.quantity,
      price: option.price,
    }));
    const orderspecifications = "Example command for linking";
    const id_fournisseur = selectedFournisseur?.id;
    console.log("this is the id of the selected fournisseur ", selectedFournisseur?.id);

    try {
      const response = await fetch(`http://localhost:4000/api/bons/create/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          number,
          orderdate,
          orderspecifications,
          status,
          productsOrdered,
          id_fournisseur,
        }),
      });
      console.log("this is the id of the selected article ", selectedArticle?.id);
      if (response.ok) {
        // Handle success
      } else {
        console.error('Error adding commandes:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding commandes:', error);
    }
  };

  return (
    <RootLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-8 m-8 rounded-md">
        <h1 className="text-3xl mx-8">Nouvelle Commande Externe</h1>
        <OptionSelection
          chapters={chapters}
          articles={articles}
          products={products}
          fournisseurs={fournisseurs}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          onSelectChapter={handleSelectChapter}
          onSelectArticle={handleSelectArticle}
          onSelectFournisseur={handleSelectFournisseur}
          setSelectedChapterId={setSelectedChapterId}
          setSelectedArticleId={setSelectedArticleId}
          setSelectedFournisseurId={setSelectedFournisseurId}
        />
        <div className="w-full flex justify-end">
          <button
            className="bg-purple-950 text-white hover:bg-black font-medium py-2 px-4 mx-8 rounded-lg"
            onClick={handleSubmit}
          >
            <div className="flex items-center space-x-2">
              <img src={save.src} alt="Save Icon" className="h-6 w-6" />
              <span>Enregistrer</span>
            </div>
          </button>
        </div>
      </div>
    </RootLayout>
  );
};

export default Page;
