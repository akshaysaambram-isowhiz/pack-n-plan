import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Trip {
  id?: string;
  userId: string;
  destination: string;
  duration: string;
  travelStyle: string;
  budget: number;
  interests: string;
  itinerary: any; // Replace with proper type based on your itinerary structure
  createdAt: Date;
}

export async function saveTrip(trip: Omit<Trip, "id" | "createdAt">) {
  const tripData = {
    ...trip,
    createdAt: new Date(),
  };
  const docRef = await addDoc(collection(db, "trips"), tripData);
  return docRef.id;
}

export async function getUserTrips(userId: string) {
  const tripsQuery = query(
    collection(db, "trips"),
    where("userId", "==", userId),
  );
  const snapshot = await getDocs(tripsQuery);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Trip[];
}

export async function deleteTrip(tripId: string) {
  await deleteDoc(doc(db, "trips", tripId));
}
