import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Product } from '@/types/product';

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