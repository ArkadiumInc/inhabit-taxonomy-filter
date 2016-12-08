#TaxonomyFilter

Special filter for inhabit factives. Allows make factives brand safe and attached to specific categories

##Install

````
npm install inhabit-taxonomy-filter --save
````

````javascript
var TaxonomyFilter = require("inhabit-taxonomy-filter").TaxonomyFilter;
this.taxonomyFilter = new TaxonomyFilter(this);
//...............
this.taxonomyFilter.apply().then(function () {
   //Everything is ok you can continue 
})
.catch(function(){
    //Filter encountered categories that not allowed, you should stop your logic sequence
});

````
##Settings

Settings provided through the module configuration and can be exposed on upper level. if you want to override default settings you should add "taxonomyFilter" section into your module configuration, either on the inhabit configuration level or through the code :

**From code**
````javascript
this.inhabitModule.configuration.taxonomyFilter = {
        method:"exclude",
        taxonomies:"default",
        threshold:0.3
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
                "method":"exclude",
                "taxonomies":"default",
                "threshold":0.3
              }
            }
          ]
}
````

###Settings Description
````json
{
  "method":"exclude",
  "taxonomies":"default",
  "threshold":0.3
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


    