# Next.js Commerce + Salesforce Commerce Cloud

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fcommerce-sfcc&env=COMPANY_NAME,NEXT_PUBLIC_VERCEL_URL,SFCC_CLIENT_ID,SFCC_ORGANIZATIONID,SFCC_SECRET,SFCC_SHORTCODE,SFCC_SITEID,SITE_NAME,SFCC_REVALIDATION_SECRET&project-name=nextjs-commerce-sfcc&repository-name=nextjs-commerce-sfcc&demo-title=ACME%20Store&demo-description=A%20high-performance%20ecommerce%20store%20built%20with%20Next.js%2C%20Vercel%2C%20and%20Salesforce%20Commerce%20Cloud&demo-url=https%3A%2F%2Fnextjs-salesforce-commerce-cloud.vercel.app%2F)

A cutting-edge, high-performance ecommerce application that showcases the latest in modern web development. This demo project demonstrates the seamless integration of **Salesforce Commerce Cloud**, **Next.js**, **React Server Components**, **Sanity.io CMS**, and **PandaCSS** to create a production-ready storefront with exceptional performance and developer experience.

## 🚀 Demo

**Live Demo**: [nextjs-salesforce-commerce-cloud.vercel.app](https://nextjs-salesforce-commerce-cloud.vercel.app/)

## ✨ Key Features

### 🛍️ **Salesforce Commerce Cloud Integration**
- Full B2C Commerce integration with SFCC APIs
- Product catalog management and synchronization
- Shopping cart and checkout functionality  
- Customer authentication and profile management
- Order management and history
- Inventory and pricing real-time updates
- Multi-site and multi-locale support

### ⚡ **Next.js 15 with Latest Experimental Features**
- **React 19** with latest concurrent features
- **Partial Prerendering (PPR)** for optimal performance
- **Server Actions** for seamless form handling
- **Server Components** for enhanced performance
- **Suspense** boundaries for progressive loading
- **useOptimistic** for instant UI updates
- **use cache** for efficient data fetching
- **Turbopack** for lightning-fast development

### 🎨 **Sanity.io CMS with Live Visual Editing**
- Headless CMS for content management
- **Live Visual Editing** with real-time preview
- Structured content with portable text
- Image optimization and asset management
- Internationalization support
- Version control and collaboration tools
- Custom schema types for ecommerce content

### 🎭 **Modern Design System with PandaCSS**
- **Zero-runtime CSS-in-JS** with build-time optimization
- **Atomic CSS** approach for minimal bundle sizes
- **Type-safe styling** with full TypeScript integration
- **Design tokens** for consistent theming
- **Responsive utilities** and breakpoint management
- **Component variants** using CVA (Class Variance Authority)
- **Custom preset** with semantic tokens

### 🌐 **Production-Ready Infrastructure**
- **Vercel deployment** with Edge Runtime optimization
- **ISR (Incremental Static Regeneration)** for dynamic content
- **Edge caching** and CDN optimization
- **Image optimization** with AVIF/WebP support
- **Core Web Vitals** optimization
- **SEO optimization** with metadata API

## 🛠️ Tech Stack

### **Frontend & Framework**
- **Next.js 15** (App Router) - React framework with latest features
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Turbopack** - Next-generation bundler

### **Styling & Design System**
- **PandaCSS** - Zero-runtime CSS-in-JS with build-time optimization
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful, customizable icons
- **Class Variance Authority** - Type-safe component variants

### **Ecommerce Backend**
- **Salesforce Commerce Cloud** - Enterprise ecommerce platform
- **Commerce SDK Isomorphic** - SFCC API integration
- **JWT Authentication** - Secure customer authentication

### **Content Management**
- **Sanity.io** - Headless CMS with live editing
- **Portable Text** - Rich text with structured content
- **Sanity Vision** - Query testing and debugging
- **Internationalized Array** - Multi-language content support

### **Development & Tooling**
- **Biome** - Fast linter and formatter
- **pnpm** - Efficient package manager
- **Zod** - TypeScript-first schema validation
- **React Hook Form** - Performant forms with easy validation

### **Performance & Analytics**
- **Vercel Speed Insights** - Real-time performance monitoring
- **Motion** - Smooth animations and transitions
- **Next.js Image Optimization** - Automatic image optimization

## 🏗️ Project Structure

```
nextjs-sfcc/
├── app/                          # Next.js App Router
│   ├── [locale]/                # Internationalized routes
│   ├── api/                     # API routes
│   ├── slides/                  # Demo slides
│   └── studio/                  # Sanity Studio
├── components/                   # React components
│   ├── blocks/                  # Content blocks
│   ├── cart/                    # Shopping cart components
│   ├── checkout/                # Checkout flow
│   ├── layout/                  # Layout components
│   ├── product/                 # Product components
│   └── ui/                      # UI primitives
├── lib/                         # Utility libraries
│   ├── sfcc/                    # SFCC integration
│   └── dictionaries/            # i18n dictionaries
├── ui/                          # Design system
│   ├── core/                    # Core components
│   └── preset/                  # PandaCSS preset
├── sanity/                      # Sanity CMS configuration
│   ├── schemaTypes/             # Content schemas
│   └── presentation/            # Live editing setup
└── public/                      # Static assets
```

## ⚙️ Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Salesforce Commerce Cloud
SFCC_CLIENT_ID=your_client_id
SFCC_ORGANIZATIONID=your_org_id
SFCC_SECRET=your_client_secret
SFCC_SHORTCODE=your_shortcode
SFCC_SITEID=your_site_id
SFCC_REVALIDATION_SECRET=your_revalidation_secret

# Site Configuration
COMPANY_NAME="Your Company"
SITE_NAME="Your Store"
NEXT_PUBLIC_VERCEL_URL=your_deployment_url

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
SANITY_API_WRITE_TOKEN=your_write_token
SANITY_WEBHOOK_SECRET=your_webhook_secret
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm
- Salesforce Commerce Cloud B2C instance
- Sanity.io project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vercel/commerce-sfcc.git
   cd nextjs-sfcc
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Generate types and setup**
   ```bash
   pnpm typegen
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

6. **Access the application**
   - **Storefront**: http://localhost:3000
   - **Sanity Studio**: http://localhost:3000/studio

## 🎨 Design System

This project features a custom design system built with **PandaCSS** that includes:

### **Design Tokens**
- Semantic color palette with light/dark mode support
- Typography scale with fluid responsive sizing
- Spacing system based on consistent ratios
- Border radius and shadow tokens

### **Component Variants**
- Button variants (primary, secondary, ghost, destructive)
- Input variants with validation states
- Card variants for different content types
- Typography variants for headings and body text

### **Responsive Utilities**
- Mobile-first breakpoint system
- Container queries support
- Flexible grid and layout utilities
- Responsive typography and spacing

## 🌐 Internationalization

The application supports multiple languages and regions:

- **Route-based i18n** with locale prefixes
- **Content localization** via Sanity CMS
- **SFCC locale mapping** for region-specific catalogs
- **Currency and pricing** localization
- **Date and number formatting** per locale

## 🔧 Customization

### **Adding New Components**
1. Create component in `components/` directory
2. Add corresponding styles using PandaCSS patterns
3. Export from appropriate index file

### **Extending the Design System**
1. Update tokens in `ui/preset/tokens/`
2. Add new patterns in `ui/preset/patterns/`
3. Create component recipes in `ui/preset/recipes/`

### **Content Schema**
1. Define new schemas in `sanity/schemaTypes/`
2. Update the schema index
3. Run `pnpm typegen` to generate types

## 📊 Performance Features

- **Core Web Vitals** optimization
- **Partial Prerendering** for instant page loads
- **Edge caching** with smart invalidation
- **Image optimization** with next-gen formats
- **Bundle optimization** with tree shaking
- **CSS optimization** with atomic classes

## 🚀 Deployment

### **Deploy to Vercel**
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with automatic CI/CD

### **Manual Deployment**
```bash
pnpm build
pnpm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and type checking: `pnpm lint && pnpm checktypes`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vercel** for the incredible Next.js framework and deployment platform
- **Salesforce** for Commerce Cloud B2C APIs
- **Sanity.io** for the powerful headless CMS
- **Panda CSS** team for the innovative styling solution
- **Radix UI** for accessible component primitives

---

**Built with ❤️ by the Vercel team**
