export interface Product {
  id?: string;
  name: string;
  imageUrls: string[]; // Changed to array of image URLs
  price: string;
  category: string;
  description: string;
  affiliateUrl: string;
  featured: boolean;
  createdAt: Date | unknown;
}

export interface ProductFormData {
  name: string;
  images: File[]; // Changed to array of files
  price: string;
  category: string;
  description: string;
  affiliateUrl: string;
  featured: boolean;
  existingImageUrls?: string[]; // Track which existing images to keep
}

export interface SiteSettings {
  id?: string;
  comingSoonImage?: string;
}