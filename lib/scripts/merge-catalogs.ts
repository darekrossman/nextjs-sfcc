import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

interface Product {
  'product-id': string
  [key: string]: any
}

interface CategoryAssignment {
  'category-id': string
  'product-id': string
  'primary-flag': boolean
}

interface Catalog {
  catalog: {
    'catalog-id': string
    categories: any[]
    products: Product[]
    'category-assignments': CategoryAssignment[]
  }
}

interface GeneratedData {
  products_to_add?: Product[]
  category_assignments_to_add?: CategoryAssignment[]
  new_products?: Product[]
  new_category_assignments?: CategoryAssignment[]
}

export const mergeCatalogs = (generatedCatalogFilename?: string) => {
  const dataDir = join(process.cwd(), 'lib', 'data')

  // Read existing electronics catalog
  const existingCatalogPath = join(dataDir, 'electronics-catalog.json')
  const existingCatalog: Catalog = JSON.parse(readFileSync(existingCatalogPath, 'utf8'))

  // Find the latest generated catalog or use the provided filename
  let generatedCatalogPath: string
  if (generatedCatalogFilename) {
    generatedCatalogPath = join(dataDir, generatedCatalogFilename)
  } else {
    generatedCatalogPath = join(dataDir, 'generated-catalog-2025-05-23T17-11-46-381Z.json')
  }

  const generatedData: GeneratedData = JSON.parse(readFileSync(generatedCatalogPath, 'utf8'))

  // Handle both old and new formats
  const newProducts = generatedData.products_to_add || generatedData.new_products || []
  const newCategoryAssignments =
    generatedData.category_assignments_to_add || generatedData.new_category_assignments || []

  // Merge products
  const existingProductIds = new Set(existingCatalog.catalog.products.map((p) => p['product-id']))
  const productsToAdd = newProducts.filter((p) => !existingProductIds.has(p['product-id']))

  existingCatalog.catalog.products.push(...productsToAdd)

  // Merge category assignments
  const existingAssignments = new Set(
    existingCatalog.catalog['category-assignments'].map(
      (ca) => `${ca['category-id']}-${ca['product-id']}`,
    ),
  )

  const assignmentsToAdd = newCategoryAssignments.filter(
    (ca) => !existingAssignments.has(`${ca['category-id']}-${ca['product-id']}`),
  )

  existingCatalog.catalog['category-assignments'].push(...assignmentsToAdd)

  // Write updated catalog back
  writeFileSync(existingCatalogPath, JSON.stringify(existingCatalog, null, 2), 'utf8')

  console.log(`✅ Catalog merge completed!`)
  console.log(`📦 Added ${productsToAdd.length} new products`)
  console.log(`🏷️ Added ${assignmentsToAdd.length} new category assignments`)
  console.log(`📊 Total products: ${existingCatalog.catalog.products.length}`)
  console.log(
    `📊 Total category assignments: ${existingCatalog.catalog['category-assignments'].length}`,
  )

  return {
    productsAdded: productsToAdd.length,
    assignmentsAdded: assignmentsToAdd.length,
    totalProducts: existingCatalog.catalog.products.length,
    totalAssignments: existingCatalog.catalog['category-assignments'].length,
  }
}

// Run the merge if this script is executed directly
if (require.main === module) {
  mergeCatalogs()
}
