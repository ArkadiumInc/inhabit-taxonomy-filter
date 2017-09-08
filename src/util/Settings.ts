export const METHOD_EXCLUDE = 'exclude';
export const METHOD_INCLUDE = 'include';
export const METHOD_EXCLUDE_INCLUDE = 'excludeAndInclude';

export const TAXONOMY_DEFAULT = "default";

export type FilterMethod = typeof METHOD_EXCLUDE | typeof METHOD_INCLUDE | typeof METHOD_EXCLUDE_INCLUDE;

export type TaxonomyList = typeof TAXONOMY_DEFAULT | string[];

export type Settings = {
    method:            FilterMethod,
    excludeTaxonomies: TaxonomyList,
    includeTaxonomies: TaxonomyList,
    excludeThreshold:        number,
    includeThreshold:        number,
}

export class NormalSettings {
    private method: string;
    private includeTaxonomies: string[];
    private excludeTaxonomies: string[];
    private includeThreshold: number;
    private excludeThreshold: number;

    constructor({ method, includeTaxonomies, excludeTaxonomies, includeThreshold, excludeThreshold }: Settings) {
        this.method = method;
        this.includeTaxonomies = Array.isArray(includeTaxonomies) ? includeTaxonomies : ["society", "law, govt and politics"];
        this.excludeTaxonomies = Array.isArray(excludeTaxonomies) ? excludeTaxonomies : ["sports", "entertainment"];

        this.includeThreshold = includeThreshold;
        this.excludeThreshold = excludeThreshold;
    }

    public getExcludeList() {
        return this.isExclude() ? this.excludeTaxonomies : [];
    }

    public getIncludeList() {
        return this.isInclude() ? this.includeTaxonomies : [];
    }

    public getExcludeThreshold() {
        return this.isExclude() ? this.excludeThreshold : 1;
    }

    public getIncludeThreshold() {
        return this.isInclude() ? this.includeThreshold : 1;
    }

    public isExclude() {
        return ~[ METHOD_EXCLUDE, METHOD_EXCLUDE_INCLUDE ].indexOf(this.method);
    }
    
    public isInclude() {
        return ~[ METHOD_INCLUDE, METHOD_EXCLUDE_INCLUDE ].indexOf(this.method);
    }
}