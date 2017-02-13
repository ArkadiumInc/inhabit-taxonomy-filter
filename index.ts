/**
 * Created by Wishm on 12/7/2016.
 */
import defaultSettings = require('./taxonomyFilterDefault');
import _intersection = require('lodash/intersection');
/**
 * {class} TaxonomyFilter
 */
export class TaxonomyFilter {
    inhabitModule: any;
    textClassification: any;
    settings: any;
    excludeFilter: any;
    includeFilter: any;
    deferred: any;
    defaultExcludeList: Array<string>;
    defaultIncldueList: Array<string>;
    /**
     * @param {InhabitModuleBase} inhabitModule
     * @constructor
     */
    constructor(inhabitModule: any) {
        this.inhabitModule = inhabitModule;
        this.textClassification = this.inhabitModule.textClassificationService;

        this.settings = inhabitModule.configuration.taxonomyFilter || defaultSettings;

        switch (this.settings.method) {
            case "exclude":
                this.excludeFilter = true;
                this.includeFilter = false;
                break;
            case "excludeAndInclude":
                this.excludeFilter = true;
                this.includeFilter = true;
                break;
            default:
                this.excludeFilter = false;
                this.includeFilter = true;
        }

        this.deferred = this.inhabitModule.$.Deferred();

        this.defaultExcludeList = ["society", "law, govt and politics"];
        this.defaultIncldueList = ["sports","entertainment"];
    }

    apply() {
        this.textClassification.getTaxonomy('alchemy').then(this.applyFilter.bind(this));
        return this.deferred.promise();
    }

    private applyFilter(items) {
        let excludeTaxonomyFilter = this.getExcludeList();
        let includeTaxonomyFilter = this.getIncludeList();
        let excludeThreshold = this.getExcludeThreshold();
        let includeThreshold = this.getIncludeThreshold();
        let relevantIncludeTaxonomyFound = false;

        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if(this.excludeFilter) {
                if (item.score > excludeThreshold) {
                    let intersection = _intersection(item.values, excludeTaxonomyFilter);
                    if (intersection.length > 0) {
                        this.deferred.reject();
                        return;
                    }
                }
            }
            if(this.includeFilter && !relevantIncludeTaxonomyFound) {
                if (item.score > includeThreshold) {
                    let intersection = _intersection(item.values, includeTaxonomyFilter);
                    if (intersection.length > 0) {
                        relevantIncludeTaxonomyFound = true;
                    }
                }
            }
        }

        if(this.includeFilter && !relevantIncludeTaxonomyFound){
            this.deferred.reject();
        }
        this.deferred.resolve();
    }

    private getExcludeList() {
        if(this.excludeFilter) {
            if (Array.isArray(this.settings.taxonomies)) {
                return this.settings.taxonomies;
            }
            else if (this.settings.taxonomies === "default") {
                return this.defaultExcludeList;
            }
            else if (Array.isArray(this.settings.excludeTaxonomies)) {
                return this.settings.excludeTaxonomies;
            }
            else if (this.settings.excludeTaxonomies === "default") {
                return this.defaultExcludeList;
            }
        }
        return [];
    }


    private getIncludeList() {
        if(this.includeFilter) {
            if (Array.isArray(this.settings.taxonomies)) {
                return this.settings.taxonomies;
            }
            else if (this.settings.taxonomies === "default") {
                return this.defaultIncldueList;
            }
            else if (Array.isArray(this.settings.includeTaxonomies)) {
                return this.settings.includeTaxonomies;
            }
            else if (this.settings.includeTaxonomies === "default") {
                return this.defaultIncldueList;
            }
        }
        return [];
    }

    private getExcludeThreshold(){
        if(this.excludeFilter) {
            if (this.settings.treshhold != null) {
                return this.settings.treshhold;
            }
            else if (this.settings.excludeThreshold != null) {
                return this.settings.excludeThreshold;
            }
        }
        return [];
    }

    private getIncludeThreshold(){
        if(this.includeFilter) {
            if (this.settings.treshhold != null) {
                return this.settings.treshhold;
            }
            else if (this.settings.includeThreshold != null) {
                return this.settings.includeThreshold;
            }
        }
        return [];
    }
}