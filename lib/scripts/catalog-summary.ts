import { readFileSync } from 'fs'
import { join } from 'path'

interface Product {
  'product-id': string
  'display-name'?: Array<{ 'xml:lang': string; _content: string }>
  'classification-category'?: string
  [key: string]: any
}

interface Catalog {
  catalog: {
    'catalog-id': string
    categories: any[]
    products: Product[]
    'category-assignments': any[]
  }
}

const summarizeCatalog = () => {
  const dataDir = join(process.cwd(), 'lib', 'data')
  const catalogPath = join(dataDir, 'electronics-catalog.json')
  const catalog: Catalog = JSON.parse(readFileSync(catalogPath, 'utf8'))

  console.log('📊 Electronics Catalog Summary')
  console.log('================================')
  console.log(`📁 Catalog ID: ${catalog.catalog['catalog-id']}`)
  console.log(`📂 Total Categories: ${catalog.catalog.categories.length}`)
  console.log(`📦 Total Products: ${catalog.catalog.products.length}`)
  console.log(`🏷️ Total Category Assignments: ${catalog.catalog['category-assignments'].length}`)
  console.log('')

  // Count master vs variant products
  const masterProducts = catalog.catalog.products.filter((p) => p['display-name'])
  const variantProducts = catalog.catalog.products.filter((p) => !p['display-name'])

  console.log('Product Breakdown:')
  console.log(`├── Master Products: ${masterProducts.length}`)
  console.log(`└── Variant Products: ${variantProducts.length}`)
  console.log('')

  // Count products by category
  const productsByCategory: { [key: string]: number } = {}
  catalog.catalog['category-assignments'].forEach((assignment) => {
    const categoryId = assignment['category-id']
    productsByCategory[categoryId] = (productsByCategory[categoryId] || 0) + 1
  })

  console.log('Products by Category:')
  Object.entries(productsByCategory)
    .sort(([, a], [, b]) => b - a)
    .forEach(([categoryId, count]) => {
      const category = catalog.catalog.categories.find((c) => c['category-id'] === categoryId)
      const displayName = category?.['display-name']?.[0]?.['_content'] || categoryId
      console.log(`├── ${displayName}: ${count} products`)
    })

  // Show range of product IDs
  const productIds = catalog.catalog.products.map((p) => p['product-id']).sort()
  console.log('')
  console.log('Product ID Range:')
  console.log(`├── First Product: ${productIds[0]}`)
  console.log(`└── Last Product: ${productIds[productIds.length - 1]}`)
}

summarizeCatalog()
