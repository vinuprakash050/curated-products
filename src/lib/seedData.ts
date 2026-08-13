import { Product } from '@/types/product'

export const seedProducts: Omit<Product, 'id' | 'createdAt'>[] = [
  {
    name: 'Wireless Noise Cancelling Headphones',
    imageUrls: [
      'https://via.placeholder.com/400x400/2563eb/ffffff?text=Headphones+1',
      'https://via.placeholder.com/400x400/1d4ed8/ffffff?text=Headphones+2'
    ],
    price: '2,999',
    category: 'Tech',
    description: `## Premium Audio Experience

**Features:**
- *Active Noise Cancellation* technology
- **30-hour** battery life
- Premium wireless connectivity
- Crystal clear sound quality

### What's in the box:
1. Headphones
2. Charging cable
3. Carrying case
4. User manual

> Perfect for travel, work, and daily listening!`,
    affiliateUrl: 'https://amazon.com/demo-headphones-affiliate-link',
    featured: true,
  },
  {
    name: 'Smart Fitness Tracker',
    imageUrls: [
      'https://via.placeholder.com/400x400/059669/ffffff?text=Fitness+Tracker+1',
      'https://via.placeholder.com/400x400/047857/ffffff?text=Fitness+Tracker+2',
      'https://via.placeholder.com/400x400/065f46/ffffff?text=Fitness+Tracker+3'
    ],
    price: '1,799',
    category: 'Fitness',
    description: `## Advanced Health Monitoring

**Key Features:**
- Heart rate monitoring
- Sleep tracking
- **50+ workout modes**
- Water resistant (5ATM)
- 7-day battery life

*Track your progress and achieve your fitness goals!*

**Compatible with:** iOS and Android devices`,
    affiliateUrl: 'https://amazon.com/demo-fitness-tracker-affiliate-link',
    featured: true,
  },
  {
    name: 'Minimalist Desk Lamp',
    imageUrls: [
      'https://via.placeholder.com/400x400/dc2626/ffffff?text=Desk+Lamp'
    ],
    price: '899',
    category: 'Home',
    description: `## Modern Workspace Essential

**Design Features:**
- Minimalist aesthetic
- Adjustable brightness levels
- Touch control interface
- Energy-efficient LED

*Perfect companion for your workspace!*`,
    affiliateUrl: 'https://amazon.com/demo-desk-lamp-affiliate-link',
    featured: false,
  },
  {
    name: 'Premium Cotton T-Shirt',
    imageUrls: [
      'https://via.placeholder.com/400x400/7c3aed/ffffff?text=T-Shirt+Front',
      'https://via.placeholder.com/400x400/6d28d9/ffffff?text=T-Shirt+Back'
    ],
    price: '599',
    category: 'Fashion',
    description: `## Sustainable Fashion Choice

**Material & Quality:**
- 100% **organic cotton**
- Soft and breathable fabric
- Durable construction
- Pre-shrunk for perfect fit

### Available sizes:
- Small to XXL
- *Check size chart before ordering*

**Care instructions:** Machine wash cold, tumble dry low`,
    affiliateUrl: 'https://amazon.com/demo-tshirt-affiliate-link',
    featured: false,
  },
  {
    name: 'Travel Backpack 35L',
    imageUrls: [
      'https://via.placeholder.com/400x400/ea580c/ffffff?text=Backpack+1',
      'https://via.placeholder.com/400x400/dc2626/ffffff?text=Backpack+2',
      'https://via.placeholder.com/400x400/b91c1c/ffffff?text=Backpack+3',
      'https://via.placeholder.com/400x400/991b1b/ffffff?text=Backpack+4'
    ],
    price: '2,499',
    category: 'Travel',
    description: `## Adventure-Ready Companion

### Key Specifications:
- **35L capacity**
- Water-resistant material
- Multiple compartments
- Padded laptop sleeve (up to 15.6")
- Ergonomic design

**Perfect for:**
- Business travel
- Weekend getaways
- Daily commuting
- Outdoor adventures

> *Built to last, designed to impress!*`,
    affiliateUrl: 'https://amazon.com/demo-backpack-affiliate-link',
    featured: true,
  },
  {
    name: 'Bluetooth Portable Speaker',
    imageUrls: [
      'https://via.placeholder.com/400x400/0891b2/ffffff?text=Speaker'
    ],
    price: '1,299',
    category: 'Tech',
    description: `## Powerful Sound, Compact Design

**Audio Features:**
- 360° surround sound
- Deep bass technology
- **12-hour** battery life
- Bluetooth 5.0 connectivity

*Take your music anywhere!*

**Additional features:** Hands-free calling, voice assistant support`,
    affiliateUrl: 'https://amazon.com/demo-speaker-affiliate-link',
    featured: false,
  },
  {
    name: 'Yoga Mat Non-Slip',
    imageUrls: [
      'https://via.placeholder.com/400x400/16a34a/ffffff?text=Yoga+Mat+1',
      'https://via.placeholder.com/400x400/15803d/ffffff?text=Yoga+Mat+2'
    ],
    price: '799',
    category: 'Fitness',
    description: `## Premium Yoga Experience

**Material & Safety:**
- Non-toxic TPE material
- **Superior grip** texture
- 6mm thickness for comfort
- Lightweight and portable

### Dimensions:
- Length: 183cm
- Width: 61cm
- Thickness: 6mm

*Enhance your yoga practice with confidence!*`,
    affiliateUrl: 'https://amazon.com/demo-yoga-mat-affiliate-link',
    featured: false,
  },
  {
    name: 'Smart Home Air Purifier',
    imageUrls: [
      'https://via.placeholder.com/400x400/be185d/ffffff?text=Air+Purifier+1',
      'https://via.placeholder.com/400x400/a21caf/ffffff?text=Air+Purifier+2',
      'https://via.placeholder.com/400x400/9333ea/ffffff?text=Air+Purifier+3',
      'https://via.placeholder.com/400x400/8b5cf6/ffffff?text=Air+Purifier+4',
      'https://via.placeholder.com/400x400/7c3aed/ffffff?text=Air+Purifier+5'
    ],
    price: '4,999',
    category: 'Home',
    description: `## Clean Air, Smart Living

### Advanced Filtration:
1. **Pre-filter** - Large particles
2. **HEPA filter** - 99.97% efficiency  
3. **Carbon filter** - Odors and gases
4. **UV-C light** - Bacteria and viruses

**Smart Features:**
- App control
- Air quality monitoring
- Auto mode adjustment
- Filter replacement alerts

> *Breathe cleaner, live healthier!*

**Coverage area:** Up to 500 sq ft`,
    affiliateUrl: 'https://amazon.com/demo-air-purifier-affiliate-link',
    featured: false,
  },
]