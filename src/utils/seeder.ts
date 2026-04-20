import { db } from "../firebase"; 
import { doc, setDoc } from "firebase/firestore";

const basesData = [
  { id: "b1", name: "Black Tea", color: "#8B4513" },
  { id: "b2", name: "Green Tea", color: "#C8E6C9" },
  { id: "b3", name: "Coffee", color: "#6F4E37" }
];

const creamersData = [
  { id: "c1", name: "No Cream", color: "transparent" },
  { id: "c2", name: "Milk", color: "AliceBlue" },
  { id: "c3", name: "Cream", color: "#F5F5DC" },
  { id: "c4", name: "Half & Half", color: "#FFFACD" }
];

const syrupsData = [
  { id: "s1", name: "No Syrup", color: "transparent" },
  { id: "s2", name: "Vanilla", color: "#FFEFD5" },
  { id: "s3", name: "Caramel", color: "#DAA520" },
  { id: "s4", name: "Hazelnut", color: "#6B4423" }
];

export const seedDatabase = async () => { 
  const collectionsToSeed = [
    { name: "bases", data: basesData },
    { name: "creamers", data: creamersData },
    { name: "syrups", data: syrupsData }
  ];

  try {
    for (const collection of collectionsToSeed) {
      for (const item of collection.data) {  
        const docRef = doc(db, collection.name, item.id);
        
        await setDoc(docRef, {
          name: item.name,
          color: item.color
        });
        
        console.log(`Added to ${collection.name}: ${item.id}`);
      }
    }
    // alert("All collections seeded successfully!");
  } catch (error) {
    console.error("Error seeding database: ", error);
    // alert("Check console for errors. Make sure your Firestore rules allow writes!");
  }
};