// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from '@google/genai'
import { mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

import electronicCatalog from '../data/electronics-catalog.json'
import { mergeCatalogs } from './merge-catalogs'

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  })
  const config = {
    responseMimeType: 'application/json',
  }
  const model = 'gemini-2.5-pro-preview-05-06'
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `I want to create a new product catalog for a fictional store that sells various modern and vintage replicas of small electronics in multiple colors, sizes, memory capacity, or others. 

Categories:
- The catalog should have a category hierarchy under a single 'root' category, with 3-4 top level categories below that, and multiple sub categories under each one of those. 
- Each category should have the fields shown in the example below for top-level or subcategories
- The 3-4 top level categories should also define an attribute group with a list of attribute ids that applies to the kinds of products that will be assigned to it (color, size, etc)
- You will need to make up the categories and possible attributes that would be applicable for our product types

Example top-level category:
\`\`\`
<category category-id="mens-clothing">
        <display-name xml:lang="x-default">Clothing</display-name>
        <display-name xml:lang="fr-FR">Vêtements</display-name>
        <online-flag>true</online-flag>
        <parent>mens</parent>
        <template/>
        <page-attributes/>
        <attribute-groups>
            <attribute-group group-id="mensClothingAttributes">
                <display-name xml:lang="x-default">Men's Clothing Attributes</display-name>
                <display-name xml:lang="fr-FR">Attributs des vêtements homme</display-name>
                <attribute attribute-id="length" system="false"/>
                <attribute attribute-id="color" system="false"/>
                <attribute attribute-id="waist" system="false"/>
                <attribute attribute-id="size" system="false"/>
                <attribute attribute-id="outerwearType" system="false"/>
                <attribute attribute-id="topType" system="false"/>
                <attribute attribute-id="bottomType" system="false"/>
            </attribute-group>
        </attribute-groups>
    </category>
\`\`\`

Example sub category:
\`\`\`
<category category-id="mens-clothing-bottoms">
        <display-name xml:lang="x-default">Bottoms</display-name>
        <display-name xml:lang="fr-FR">Bas</display-name>
        <online-flag>true</online-flag>
        <parent>mens-clothing</parent>
        <template/>
        <page-attributes/>
    </category>
\`\`\`

Products:
- The catalog should have at least 100 master products that contain all of the fields in the example below, make them up and be creative, and make sure descriptions and attributes are applicable to the product type
- It should also have variation products that represent actual physical products with each permutation of attribute selections, use example variation product below
- master products should reference their variation products as shown in the examples
- variation products should reference their master product as shown in the examples

Example master product:
\`\`\`
<product product-id="12416789M">
        <ean/>
        <upc/>
        <unit/>
        <min-order-quantity>1</min-order-quantity>
        <step-quantity>1</step-quantity>
        <display-name xml:lang="x-default">Straight Leg Trousers</display-name>
        <display-name xml:lang="fr-FR">Pantalon droit</display-name>
        <short-description xml:lang="x-default">A menswear favorite, these straight leg trousers are to the point when it comes to business dressing. Made in our lightweight combed stretch cotton suiting with pinstripe pattern.</short-description>
        <short-description xml:lang="fr-FR">Incontournable du vestiaire masculin, ce pantalon droit est parfait en contexte professionnel. En coton stretch peigné léger à fines rayures.</short-description>
        <store-force-price-flag>false</store-force-price-flag>
        <store-non-inventory-flag>false</store-non-inventory-flag>
        <store-non-revenue-flag>false</store-non-revenue-flag>
        <store-non-discountable-flag>false</store-non-discountable-flag>
        <online-flag>true</online-flag>
        <available-flag>true</available-flag>
        <searchable-flag>true</searchable-flag>
        <images>
            <image-group view-type="large">
                <image path="large/B0274206_GYX_0.jpg"/>
                <image path="large/B0274206_GYX_B0.jpg"/>
                <image path="large/B0274206_GYX_L1.jpg"/>
            </image-group>
            <image-group view-type="large">
                <variation attribute-id="color" value="GYX"/>
                <image path="large/B0274206_GYX_0.jpg"/>
                <image path="large/B0274206_GYX_B0.jpg"/>
                <image path="large/B0274206_GYX_L1.jpg"/>
            </image-group>
            <image-group view-type="swatch">
                <image path="swatch/B0274206_GYX_sw.jpg"/>
            </image-group>
            <image-group view-type="swatch">
                <variation attribute-id="color" value="GYX"/>
                <image path="swatch/B0274206_GYX_sw.jpg"/>
            </image-group>
        </images>
        <tax-class-id>standard</tax-class-id>
        <page-attributes>
            <page-title xml:lang="x-default">straight-leg-trousers</page-title>
            <page-title xml:lang="fr-FR">pantalon droit</page-title>
            <page-description xml:lang="x-default">A menswear favorite, these straight leg trousers are to the point when it comes to business dressing. Made in our lightweight combed stretch cotton suiting with pinstripe pattern.</page-description>
            <page-description xml:lang="fr-FR">Incontournable du vestiaire masculin, ce pantalon droit est parfait en contexte professionnel. En coton stretch peigné léger à fines rayures.</page-description>
            <page-url xml:lang="x-default">mens-pants-straight-leg-trousers</page-url>
            <page-url xml:lang="fr-FR">pantalon-droit-homme</page-url>
        </page-attributes>
        <custom-attributes>
            <custom-attribute attribute-id="isNew">true</custom-attribute>
            <custom-attribute attribute-id="isNewtest">true</custom-attribute>
            <custom-attribute attribute-id="isSale">true</custom-attribute>
        </custom-attributes>
        <variations>
            <attributes>
                <variation-attribute attribute-id="color" variation-attribute-id="color">
                    <display-name xml:lang="x-default">Color</display-name>
                    <display-name xml:lang="en-GB">Colour</display-name>
                    <display-name xml:lang="fr-FR">Coloris </display-name>
                    <variation-attribute-values>
                        <variation-attribute-value value="GYX">
                            <display-value xml:lang="x-default">Navy</display-value>
                            <display-value xml:lang="fr-FR">Marine</display-value>
                        </variation-attribute-value>
                    </variation-attribute-values>
                </variation-attribute>
                <variation-attribute attribute-id="size" variation-attribute-id="size">
                    <display-name xml:lang="x-default">Size</display-name>
                    <display-name xml:lang="fr-FR">Taille</display-name>
                    <variation-attribute-values>
                        <variation-attribute-value value="28">
                            <display-value xml:lang="x-default">28</display-value>
                            <display-value xml:lang="fr-FR">28</display-value>
                        </variation-attribute-value>
                        <variation-attribute-value value="29">
                            <display-value xml:lang="x-default">29</display-value>
                            <display-value xml:lang="fr-FR">29</display-value>
                        </variation-attribute-value>
                        <variation-attribute-value value="30">
                            <display-value xml:lang="x-default">30</display-value>
                            <display-value xml:lang="fr-FR">30</display-value>
                        </variation-attribute-value>
                        <variation-attribute-value value="31">
                            <display-value xml:lang="x-default">31</display-value>
                            <display-value xml:lang="fr-FR">31</display-value>
                        </variation-attribute-value>
                        <variation-attribute-value value="32">
                            <display-value xml:lang="x-default">32</display-value>
                            <display-value xml:lang="fr-FR">32</display-value>
                        </variation-attribute-value>
                    </variation-attribute-values>
                </variation-attribute>
            </attributes>
            <variants>
                <variant product-id="883360519722M"/>
                <variant product-id="883360519678M"/>
                <variant product-id="883360519715M"/>
                <variant product-id="883360519685M"/>
                <variant product-id="883360519739M"/>
                <variant product-id="883360519708M"/>
                <variant product-id="883360519692M"/>
                <variant product-id="883360519760M"/>
                <variant product-id="883360519753M"/>
                <variant product-id="883360519746M"/>
            </variants>
        </variations>
        <classification-category>mens-clothing-bottoms</classification-category>
        <pinterest-enabled-flag>false</pinterest-enabled-flag>
        <facebook-enabled-flag>false</facebook-enabled-flag>
        <store-attributes>
            <force-price-flag>false</force-price-flag>
            <non-inventory-flag>false</non-inventory-flag>
            <non-revenue-flag>false</non-revenue-flag>
            <non-discountable-flag>false</non-discountable-flag>
        </store-attributes>
    </product>
\`\`\`

Example variation product:
\`\`\`
<product product-id="095068018722M">
  <ean/>
  <upc>095068018722</upc>
  <unit/>
  <min-order-quantity>1</min-order-quantity>
  <step-quantity>1</step-quantity>
  <store-force-price-flag>false</store-force-price-flag>
  <store-non-inventory-flag>false</store-non-inventory-flag>
  <store-non-revenue-flag>false</store-non-revenue-flag>
  <store-non-discountable-flag>false</store-non-discountable-flag>
  <online-flag>true</online-flag>
  <available-flag>true</available-flag>
  <searchable-flag>true</searchable-flag>
  <tax-class-id>standard</tax-class-id>
  <page-attributes/>
  <custom-attributes>
      <custom-attribute attribute-id="color">BLACKFB</custom-attribute>
      <custom-attribute attribute-id="refinementColor">black</custom-attribute>
      <custom-attribute attribute-id="size">9LG</custom-attribute>
      <custom-attribute attribute-id="width">V</custom-attribute>
  </custom-attributes>
  <pinterest-enabled-flag>false</pinterest-enabled-flag>
  <facebook-enabled-flag>false</facebook-enabled-flag>
  <store-attributes>
      <force-price-flag>false</force-price-flag>
      <non-inventory-flag>false</non-inventory-flag>
      <non-revenue-flag>false</non-revenue-flag>
      <non-discountable-flag>false</non-discountable-flag>
  </store-attributes>
</product>
\`\`\`

Category assignments:
- The catalog should generate additional nodes that assign each master product to a category.

Example category assignment:
\`\`\`
<category-assignment category-id="womens-clothing-tops" product-id="25517787M">
<primary-flag>true</primary-flag>
</category-assignment>
\`\`\`

We want 3-4 top-level categories, each with 3-4 sub categories. We also want 100 master products, each with applicable attributes, with at least 2 options per attribute. For every master product there should be variation products that represent each permutation of attribute selections. Be creative with the attributes and values, products, and categories. This is a boutique electronics store that sells sleek, modern, and vintage replicas of small electronics in multiple colors, sizes, memory capacity, or others. For products with colors, we want a swatch image for each color. Each product should have 4 large images (we will generate later, stub the urls out for now).

The output should be a json document that can fully represent the xml structure we will need to convert to. `,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `**Developing the Structure**

I'm currently focused on defining the initial JSON structure to represent the XML product catalog.  I'm starting with a root category and plan for 3-4 top-level categories.  Each of these will branch into 3-4 subcategories. The goal is to provide a clear and organized hierarchy. I'm exploring different approaches to ensure efficient parsing and representation.


**Structuring Product Data**

I'm now diving deeper into the product representation within the JSON format. I'm focusing on incorporating the required fields for master products, like product ID, EAN, UPC, and the display names and descriptions in both x-default and fr-FR. I'm also ensuring the inclusion of all necessary flags, images, and page attributes. I'm considering using nested objects to effectively represent attributes and images.


**Expanding Product Attributes**

I've transitioned to the specifics of product representation, focusing on master products. I'm prioritizing the required fields, including product identifiers and multilingual display names. Currently, I'm working to fully represent all the flags, images, and page attributes in the JSON structure. My goal is to organize this information efficiently, likely using nested objects.


**Mapping the Catalog Structure**

I'm now integrating the category definitions into the JSON structure. I'm focusing on "categories," "products," and "category-assignments" keys within the root "catalog" object.  I'm fleshing out the "Audio Devices" category, adding subcategories and associated attributes like color and connectivity.  The plan is to ensure each subcategory is properly linked to its parent and includes necessary attributes. I'm also ensuring a logical, expandable structure.

**Product Data Integration**

I've shifted focus to integrating the detailed product data within the JSON.  Specifically, I'm working on how to represent master products and their associated variations. My current approach involves nesting product information within the "products" section, with clear distinctions between master and variant product data.  I'm striving for a structure that facilitates efficient data access and clear relationships between master products and their variants.


**Mapping Variant Relationships**

I'm now determining how to represent the connections between master products and their variants within the JSON structure. My goal is to use a clear and efficient method to define these relationships. I will need to clarify the structure for my records. It seems the best solution will be to explicitly list the variant product IDs within each master product.


**Defining Product Variations**

I'm now determining how to represent the connections between master products and their variants within the JSON structure. My goal is to use a clear and efficient method to define these relationships. For each product, I plan to explicitly list the variant product IDs within the master product record. I'll include attributes associated with the variant in their specific records.


**Mapping Detailed Attributes**

I've transitioned to the structure of product attributes within the master product records.  I'm representing these in a nested object format for clarity. I'm focusing on attributes like color, size, and style. I'm also addressing the representation of images with both large and swatch versions. My focus remains on ensuring efficiency and a clear product-to-variant relationship.


**Defining Master-Variant Relationship**

I'm now implementing the method to establish relationships between master and variant products. I've opted to represent variants within the master product record, with an array containing the variant's product ID. This structure allows efficient lookups and maintains clear connections between product variations.


**Refining Category Representation**

I'm now revising the category representation to better mirror the XML structure. I'm focusing on "attributes" and "children" to enhance clarity and consistency. The key will be ensuring that all necessary XML elements are accurately captured in the JSON representation. This updated structure will streamline the conversion process.


**Adapting to the XML Structure**

I'm now adapting the JSON structure to directly represent the XML elements. I'm using the "@" prefix for attributes and "#text" for text content, mirroring common XML-to-JSON conventions. I'm focusing on ensuring clear key-value pairs for each XML element. This revised approach should provide the detailed mapping needed to facilitate efficient catalog generation.


**Defining Detailed Product Data**

I'm now fully specifying the structure for both master and variant product representation in the JSON output.  I've defined a clear distinction between master products and their variations. This includes all required product identifiers, display names in both English and French, and a consistent approach to representing images. I'm focusing on ensuring these details can be easily parsed and organized.


**Defining the JSON Format**

I'm now implementing the JSON structure, mirroring the XML format.  I'm using  \`@\` for attributes and \`_content\` for text values to represent each element. My focus is on ensuring a clear and direct mapping to the XML, facilitating parsing. I'm also ensuring the JSON is valid and parseable.


**Defining JSON Output**

I've now completely restructured the representation, directly mapping XML elements to JSON keys using \`@\` for attributes and \`_content\` for values.  I'm using arrays for multiple instances of an element, ensuring a clear and concise JSON structure.  I'm using null for empty leaf elements and {} for empty complex elements.  My goal is to provide valid and efficiently parsed JSON.


**Refining JSON Output**

I'm now fully committed to the \`@\` and \`_content\` convention for JSON keys, mirroring the XML structure. I'll represent all attributes and text content directly, ensuring complete data fidelity. I am also planning on arrays for multiple elements. This should allow for efficient and straightforward data generation.


**Defining Core Structure**

Now I'm focusing on defining the top-level structure. I'm moving forward with a root object containing "categories," "products," and "category-assignments," each as arrays. This ensures a clean and parseable JSON format. I am also implementing the \`@\` and \`_content\` convention.


**Finalizing JSON Format**

Now, I'm defining the precise structure for the final JSON output, ensuring it's valid and parseable. I'm focusing on directly mapping XML elements to JSON keys, using the \`@\` and \`_content\` conventions. My approach is to make sure elements with multiple instances are rendered as arrays. The goal is to facilitate efficient data generation and parsing with a valid JSON.


**Finalizing JSON Structure**

I'm now fully immersed in developing the final JSON structure, ensuring a direct and accurate XML mapping. I've decided to represent attributes using the "@" prefix, while the core text content of each element will be stored under the "_content" key, making parsing straightforward. My primary focus is to represent all the provided XML data in the final JSON, in an efficient and easily digestible format.


**Defining JSON Structure**

I'm now implementing the JSON structure, mirroring the XML format.  I'm focusing on attributes becoming direct keys with values and text content mapped to \`_content\`, as per the user's requirements.  I'm also ensuring that elements with multiple instances are rendered as arrays. The aim is to create valid and easily parsed JSON.


**Mapping XML Structure**

I'm now focusing on mapping the XML structure to JSON, using the \`@\` prefix for attributes and \`_content\` for text values. I'm prioritizing direct key-value mapping and using arrays for multiple instances of elements. This approach aims for efficiency and clarity. The goal is valid, well-structured JSON.


I'm now implementing the JSON structure, mirroring the XML format.  I'm focusing on attributes becoming direct keys with values and text content mapped to \`_content\`, as per the user's requirements.  I'm also ensuring that elements with multiple instances are rendered as arrays. The aim is to create valid and easily parsed JSON.


**Finalizing JSON Structure**

I'm now fully immersed in developing the final JSON structure, ensuring a direct and accurate XML mapping. I've decided to represent attributes using the "@" prefix, while the core text content of each element will be stored under the "_content" key, making parsing straightforward. My primary focus is to represent all the provided XML data in the final JSON, in an efficient and easily digestible format.


**Defining Detailed Data Structure**

I'm now fully immersed in developing the final JSON structure, ensuring a direct and accurate XML mapping. I've decided to represent attributes using the "@" prefix, while the core text content of each element will be stored under the "_content" key, making parsing straightforward. My primary focus is to represent all the provided XML data in the final JSON, in an efficient and easily digestible format.


**Finalizing Data Mapping**

I'm now fully committed to the structure for a direct XML-to-JSON mapping. All elements and attributes from the XML structure will be mapped to the JSON output. I'm focusing on ensuring all data, particularly attributes and text content, are represented efficiently. Each entity's textual content will be stored with a \`_content\` key.


**Defining Initial Data Mapping**

I'm now fully immersed in developing the final JSON structure, ensuring a direct and accurate XML mapping. I've decided to represent attributes using the "@" prefix, while the core text content of each element will be stored under the "_content" key, making parsing straightforward. My primary focus is to represent all the provided XML data in the final JSON, in an efficient and easily digestible format.


I'm now implementing the JSON structure, mirroring the XML format.  I'm focusing on attributes becoming direct keys with values and text content mapped to \`_content\`, as per the user's requirements.  I'm also ensuring that elements with multiple instances are rendered as arrays. The aim is to create valid and easily parsed JSON.


**Defining Output Structure**

I'm now implementing the proposed structure, with "catalog" as the root and distinct arrays for categories, products, and category-assignments. I'm focusing on attributes becoming direct keys and text content mapping to \`_content\`, ensuring validity and easy parsing. I am making sure elements with multiple instances are arrays.


**Implementing JSON Mapping**

I'm now implementing the JSON mapping using the agreed-upon structure. I'm focusing on attributes becoming direct keys with values and text content mapped to \`_content\`. I'm using arrays for multiple instances and ensuring the final JSON is valid and parseable. The aim is to create detailed products.


**Generating the JSON**

I'm now implementing the JSON structure, mirroring the XML format.  I'm focusing on attributes becoming direct keys with values and text content mapped to \`_content\`, as per the user's requirements.  I'm also ensuring that elements with multiple instances are rendered as arrays. The aim is to create valid and easily parsed JSON.


**Generating Output Structure**

I'm now implementing the proposed structure, with "catalog" as the root and distinct arrays for categories, products, and category-assignments. I'm focusing on attributes becoming direct keys and text content mapping to \`_content\`, ensuring validity and easy parsing. I am making sure elements with multiple instances are arrays.


**Implementing JSON Mapping**

I've transitioned to the structure of product attributes within the master product records. My main focus is mapping the XML data to the JSON structure, as defined by the user. I'm now using the "@" prefix for attributes and the "_content" key for text content. With the plan to have a direct, valid, and easy to parse, JSON output structure.


**Implementing JSON Mapping**

I'm now mapping the XML data to the JSON structure, using the user-defined approach. Attributes will be directly mapped as keys, and text content will reside under the \`_content\` key. The output should be a valid and easily parsed JSON document. I'm focusing on handling array representations correctly for elements with multiple instances.


**Generating the Structure**

Now I'm implementing the detailed JSON structure, focusing on the root "catalog" object with its arrays for "categories," "products," and "category-assignments." I am also finalizing the precise mapping rules for attributes and text content. The goal is to ensure a valid and clear JSON file.


**Implementing Final Mapping**

I've transitioned to the structure of product attributes within the master product records. My main focus is mapping the XML data to the JSON structure, as defined by the user. I'm now using the \`@\` prefix for attributes and the \`_content\` key for text content. With the plan to have a direct, valid, and easy to parse, JSON output structure.


**Generating the Structure**

Now I'm implementing the detailed JSON structure, focusing on the root "catalog" object with its arrays for "categories," "products," and "category-assignments." I am also finalizing the precise mapping rules for attributes and text content. The goal is to ensure a valid and clear JSON file.


**Generating the JSON**

I've begun the process of transforming the XML structure into the final JSON output.  I'm focusing on the agreed-upon structure, directly mapping XML elements to JSON keys using the "@" prefix for attributes and "_content" for text content. My plan is to ensure all elements with multiple instances are rendered as arrays, and that the data is valid and easily parseable.


**Generating the Final Output**

I've now fully defined the process. I am ready to generate the complete JSON product catalog. I will create a data-driven process. The output will meet all user requirements, ensuring accurate XML-to-JSON mapping. I will provide valid, detailed, and efficiently structured JSON with a catalog structure.


**Finalizing JSON Generation**

I'm now fully committed to generating the complete JSON data, ensuring a valid, parseable format that precisely mirrors the user's defined structure. I'll be using arrays for all repeated elements, following the established conventions for attributes, and text content. The final output is an organized, comprehensive catalog.


`,
        },
        {
          text: JSON.stringify(electronicCatalog),
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `Continue adding more products to the catalog and assigning them to categories that we can paste into the catalog json. Our goal is have 100 master products, each with complete variants.`,
        },
      ],
    },
  ]

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  })

  let fullResponse = ''
  for await (const chunk of response) {
    fullResponse += chunk.text
  }

  // Ensure the lib/data directory exists
  const dataDir = join(process.cwd(), 'lib', 'data')
  mkdirSync(dataDir, { recursive: true })

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const filename = `generated-catalog-${timestamp}.json`
  const filepath = join(dataDir, filename)

  // Write the response to file
  writeFileSync(filepath, fullResponse, 'utf8')

  console.log(`✅ Catalog generated successfully!`)
  console.log(`📁 File saved to: ${filepath}`)
  console.log(`📊 Response length: ${fullResponse.length} characters`)

  // Automatically merge the generated catalog into the existing electronics catalog
  console.log(`\n🔄 Merging generated catalog into electronics catalog...`)
  try {
    const mergeResults = mergeCatalogs(filename)
    console.log(`\n✅ Auto-merge completed successfully!`)
    console.log(`📈 Final catalog stats:`)
    console.log(`   └── Total products: ${mergeResults.totalProducts}`)
    console.log(`   └── Total assignments: ${mergeResults.totalAssignments}`)
  } catch (error) {
    console.error(`❌ Auto-merge failed:`, error)
    console.log(`💡 You can manually run: pnpm tsx lib/scripts/merge-catalogs.ts`)
  }
}

main().catch(console.error)
