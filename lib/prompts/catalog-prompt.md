I want to create a new product catalog for a fictional store that sells various modern and vintage replicas of small electronics in multiple colors, sizes, memory capacity, or others. 

Categories:
- The catalog should have a category hierarchy under a single 'root' category, with 3-4 top level categories below that, and multiple sub categories under each one of those. 
- Each category should have the fields shown in the example below for top-level or subcategories
- The 3-4 top level categories should also define an attribute group with a list of attribute ids that applies to the kinds of products that will be assigned to it (color, size, etc)
- You will need to make up the categories and possible attributes that would be applicable for our product types

Example top-level category:
```
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
```

Example sub category:
```
<category category-id="mens-clothing-bottoms">
        <display-name xml:lang="x-default">Bottoms</display-name>
        <display-name xml:lang="fr-FR">Bas</display-name>
        <online-flag>true</online-flag>
        <parent>mens-clothing</parent>
        <template/>
        <page-attributes/>
    </category>
```

Products:
- The catalog should have at least 100 master products that contain all of the fields in the example below, make them up and be creative, and make sure descriptions and attributes are applicable to the product type
- It should also have variation products that represent actual physical products with each permutation of attribute selections, use example variation product below
- master products should reference their variation products as shown in the examples
- variation products should reference their master product as shown in the examples

Example master product:
```
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
```

Example variation product:
```
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
```

Category assignments:
- The catalog should generate additional nodes that assign each master product to a category.

Example category assignment:
```
<category-assignment category-id="womens-clothing-tops" product-id="25517787M">
<primary-flag>true</primary-flag>
</category-assignment>
```

We want 3-4 top-level categories, each with 3-4 sub categories. We also want 100 master products, each with applicable attributes, with at least 2 options per attribute. For every master product there should be variation products that represent each permutation of attribute selections. Be creative with the attributes and values, products, and categories. This is a boutique electronics store that sells sleek, modern, and vintage replicas of small electronics in multiple colors, sizes, memory capacity, or others. For products with colors, we want a swatch image for each color. Each product should have 4 large images (we will generate later, stub the urls out for now).

The output should be a json document that can fully represent the xml structure we will need to convert to. 