import { getRootCategory, searchAllProducts } from 'lib/sfcc'

export default async function DebugPage() {
  const rootCategory = await getRootCategory()
  const searchResults = await searchAllProducts()
  console.log(rootCategory.categories)
  console.log(searchResults)

  return <div>Debug</div>
}
