# Amazon Affiliate Product Listing Website

A simple MVP for listing Amazon affiliate products with a clean, mobile-first design.

## Features

- 🛍️ Beautiful product catalog with image-focused design
- 🖼️ **Multiple images per product (up to 5 images with carousel navigation)**
- 📱 Mobile-first responsive design
- 🔍 Client-side search and category filtering
- ⭐ Featured products section
- 🔧 Simple admin panel for product management
- 📷 Image hosting via ImgBB
- 💾 Firebase Firestore for data storage
- 🔗 Direct affiliate link redirects

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Database**: Firebase Firestore
- **Image Hosting**: ImgBB API
- **Deployment**: Vercel (recommended)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore database
4. Get your Firebase configuration from Project Settings

### 3. ImgBB Setup

1. Go to [ImgBB](https://imgbb.com/)
2. Create an account
3. Get your API key from the API section

### 4. Environment Variables

Copy `.env.local` and fill in your credentials:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# ImgBB Configuration
IMGBB_API_KEY=your_imgbb_api_key_here
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

### 6. Seed Sample Data (Optional)

Visit [http://localhost:3000/admin/seed](http://localhost:3000/admin/seed) to add sample products.

## Usage

### Adding Products

1. Go to `/admin`
2. Fill out the product form
3. **Upload up to 5 images** (drag and drop or click to select multiple)
4. Click "Publish Product"

**Multiple Images:**
- Each product can have 1-5 images
- Images are displayed as a carousel on the product cards
- Navigation arrows and dots appear on hover
- First image is used as the thumbnail in admin table

The image will be uploaded to ImgBB and the product will be saved to Firestore.

### Managing Products

- **Edit**: Click the edit button in the admin table
- **Delete**: Click delete and confirm
- **Featured**: Toggle the featured checkbox when adding/editing

### Public Website

- Homepage shows all products with search and filtering
- Featured products appear in a special section
- Click "View on Amazon" to redirect to affiliate links

## Project Structure

```
src/
├── app/
│   ├── admin/                  # Admin pages
│   ├── api/upload-image/       # ImgBB upload endpoint
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx               # Homepage
├── components/
│   ├── admin/                 # Admin-specific components
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── SearchBar.tsx
│   └── CategoryFilter.tsx
├── lib/
│   ├── firebase.ts           # Firebase config
│   ├── firestore.ts          # Database operations
│   └── seedData.ts           # Sample data
└── types/
    └── product.ts            # TypeScript types
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to add all environment variables in your deployment platform:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `IMGBB_API_KEY`

## Key Features Explained

### Mobile-First Design
The website is optimized for mobile users coming from Instagram with:
- 2-column product grid on mobile
- Large tap targets
- Optimized images
- Fast loading

### Simple Admin Interface
No authentication required for MVP - just visit `/admin` to:
- Add new products
- Edit existing products
- Delete products
- Manage featured status

### Affiliate Link Management
Each product stores the complete Amazon affiliate URL. When users click "View on Amazon", they're redirected directly to your affiliate link.

### Image Handling
Images are uploaded to ImgBB via a secure API route to keep your API key secret. The ImgBB URL is then stored in Firestore.

## Security Notes

- ImgBB API key is kept server-side
- No authentication for MVP (add later if needed)
- All affiliate URLs are stored as provided
- Images are hosted externally (ImgBB)

## Limitations

This is an MVP focused on simplicity:
- No user authentication
- No shopping cart
- No payment processing
- No Amazon API integration
- Manual product addition only

## Support

For issues or questions, check the Firebase and Next.js documentation:
- [Next.js Docs](https://nextjs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)