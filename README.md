# TaxonomyFilter

Special filter for inhabit factives. Allows make factives brand safe and attached to specific categories

## Install

````
npm install inhabit-taxonomy-filter --save
````

````javascript
import { TaxonomyFilter } from 'inhabit-taxonomy-filter';

class InhabitModule() {
  ...
  public async getContent() {
    const taxfilter = new TaxonomyFilter(this);
    if (await taxfilter.apply()) {
      return <success filter result>
    }
  }
}

````
## Settings

Settings provided through the module configuration and can be exposed on upper level. if you want to override default settings you should add "taxonomyFilter" section into your module configuration, either on the inhabit configuration level or through the code :

**From code**
````javascript
this.inhabitModule.configuration.taxonomyFilter = {
        method:"excludeAndInclude",
        taxonomies:"default",
        excludeTaxonomies:"default",
        excludeThreshold:0.3,
        includeTaxonomies:"default",
        includeThreshold:0.7
}
````
**From inhabit configuration**
````json
{
 "modules": [
            {
              "id": "mymodule",
              "deliveryMethod": "random",
              "taxonomyFilter":{
                "method":"excludeAndInclude",
                "excludeTaxonomies":"default",
                "excludeThreshold":0.3,
                "includeTaxonomies":"default",
                "includeThreshold":0.7
              }
            }
          ]
}
````

Add the forms to allow the client to edit on the adminsite:
#### Form data
````json
[
  {
    "key": "taxonomyFilter",
    "items": [
      {
        "key":"taxonomyFilter.method",
        "type": "select",
        "titleMap": {
          "exclude": "Exclude",
          "include": "Include",
          "excludeAndInclude": "ExcludeAndInclude"
        }
      },
      {
        "key":"taxonomyFilter.excludeTaxonomies",
        "items": [
            "taxonomyFilter.excludeTaxonomies[]"
            ]
      },
      "taxonomyFilter.excludeThreshold",
      {
        "key":"taxonomyFilter.includeTaxonomies",
        "items": [
            "taxonomyFilter.includeTaxonomies[]"
            ]
      },
      "taxonomyFilter.includeThreshold"
    ]
  }
]
````
### schema
````json
{
  "type": "object",
  "title": "Taxonomy",
  "properties": {
    "taxonomyFilter": {
      "type": "object",
      "properties": {
        "method": {
          "title": "Taxonomy Method",
          "type": "select",
		  "enum": [
			"exclude",
			"include",
			"excludeAndInclude"
		  ]
        },
        "excludeTaxonomies": {
          "title": "array of excluded taxonomies",
          "type": "array",
		  "items": {
			"type": "string",
			"default": "politics"
		  }
        },
        "excludeThreshold": {
          "title": "excludeThreshold",
          "type": "number",
		  "default": 3
        },
        "includeTaxonomies": {
          "title": "array of included Taxonomies",
          "type": "array",
		  "items": {
			"type": "string",
			"default": "sports"
		  }
        },
        "includeThreshold": {
          "title": "includeThreshold",
          "type": "number",
		  "default": 3
        }
      }
    }
  }
}
````

### Settings Description
````json
{
  "method":"excludeAndInclude",
  "excludeTaxonomies":"default",
  "excludeThreshold":0.3,
  "includeTaxonomies":"default",
  "includeThreshold":0.7
}
````

**method**

    "exclude" - if you want to show factive only if it is not in the list of categories provided to filter. In other words if you want to exclude your factive and not show it if article is from the list of provided categories
    "include" - opposite from exclude, at this case you are showing factive only if article is from provided list of categories
    
**taxonomies**

    "default" - if you want to use default exclusion list that is ["society", "law, govt and politics"]
    "["category 1","category 2"]" - array of categories, if you want to use your own list
    
**threshold**

    "0.3" - number that represent contextuality threshold. everything that higher will be included/excluded depending on your preferences 


    