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
    deferred: any;
    defaultList: Array<string>;

    /**
     * @param {InhabitModuleBase} inhabitModule
     * @constructor
     */
    constructor(inhabitModule: any) {
        this.inhabitModule = inhabitModule;
        this.textClassification = this.inhabitModule.textClassificationService;

        this.settings = inhabitModule.configuration.taxonomyFilter || defaultSettings;
        this.excludeFilter = this.settings.method === "exclude";
        this.deferred = this.inhabitModule.$.Deferred();

        this.defaultList = ["society", "law, govt and politics"];
    }

    apply() {
        this.textClassification.getTaxonomy('alchemy').then(this.applyFilter.bind(this));
        return this.deferred.promise();
    }

    private applyFilter(items) {
        let taxonomyFilter = this.parseSettings();
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (item.score < this.settings.threshold) continue;
            let intersection = _intersection(item.values, taxonomyFilter);
            if (intersection.length > 0 && this.excludeFilter) {
                this.deferred.reject();
                return;
            }
            if(intersection.length > 0 && !this.excludeFilter){
                this.deferred.resolve();
            }
        }
        if(this.excludeFilter)
        {
            this.deferred.resolve();
        }
        else {
            this.deferred.reject();
        }
    }

    private parseSettings() {
        if (Array.isArray(this.settings.taxonomies)) {
            return this.settings.taxonomies;
        }
        else {
            switch (this.settings.taxonomies) {
                case "default":
                    return this.defaultList;
            }
        }
    }

}