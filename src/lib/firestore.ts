import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Product, SiteSettings } from '@/types/product';

const COLLECTION_NAME = 'products';

export const createProduct = async (productData: Omit<Product, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...productData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    // Simple query without orderBy to avoid index requirements
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
    
    // Sort on client side by createdAt if available
    return products.sort((a, b) => {
      const aTime = (a.createdAt as { seconds: number } | undefined)?.seconds || 0;
      const bTime = (b.createdAt as { seconds: number } | undefined)?.seconds || 0;
      return bTime - aTime;
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    // Simple query without orderBy to avoid index requirements
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
    
    // Filter and sort on client side
    return products
      .filter(product => product.featured === true)
      .sort((a, b) => {
        const aTime = (a.createdAt as { seconds: number } | undefined)?.seconds || 0;
        const bTime = (b.createdAt as { seconds: number } | undefined)?.seconds || 0;
        return bTime - aTime;
      });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
};

export const updateProduct = async (id: string, productData: Partial<Product>) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, productData);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Site Settings Management
const SETTINGS_COLLECTION = 'siteSettings';
const SETTINGS_DOC_ID = 'main';

export const getSiteSettings = async (): Promise<SiteSettings | null> => {
  try {
    const settingsRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
    const docSnap = await getDoc(settingsRef);
    
    console.log('Firestore getSiteSettings - exists:', docSnap.exists());
    
    if (docSnap.exists()) {
      const data = { id: docSnap.id, ...docSnap.data() } as SiteSettings;
      console.log('Firestore getSiteSettings - data:', data);
      return data;
    }
    
    console.log('Firestore getSiteSettings - no document found');
    return null;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
};

export const updateComingSoonImage = async (imageUrl: string) => {
  try {
    console.log('Firestore updateComingSoonImage - URL:', imageUrl);
    const settingsRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC_ID);
    const docSnap = await getDoc(settingsRef);
    
    if (!docSnap.exists()) {
      console.log('Firestore updateComingSoonImage - creating new document');
      // Create if doesn't exist using setDoc
      await setDoc(settingsRef, {
        comingSoonImage: imageUrl,
      });
    } else {
      console.log('Firestore updateComingSoonImage - updating existing document');
      // Update existing
      await updateDoc(settingsRef, {
        comingSoonImage: imageUrl,
      });
    }
    console.log('Firestore updateComingSoonImage - saved successfully');
  } catch (error) {
    console.error('Error updating hero image:', error);
    throw error;
  }
};
