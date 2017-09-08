import { TaxonomyFilter } from './TaxonomyFilter';
import { Settings, METHOD_INCLUDE, METHOD_EXCLUDE, METHOD_EXCLUDE_INCLUDE } from './util/Settings';

import { expect } from 'chai';

const passTaxonomy = [{"values":["sports","basketball"],"score":0.999915,"type":null,"types":null,"misc":null},{"values":["law, govt and politics","government"],"score":0.301907,"type":null,"types":null,"misc":null},{"values":["science","social science","history"],"score":0.299955,"type":null,"types":null,"misc":null}];
const failTaxonomy = [{"values":["crap"],"score":0.999915,"type":null,"types":null,"misc":null},{"values":["law, govt and politics","government"],"score":0.301907,"type":null,"types":null,"misc":null},{"values":["science","social science","history"],"score":0.299955,"type":null,"types":null,"misc":null}];

const exludeConfig = {
    method: METHOD_EXCLUDE,
    excludeTaxonomies: [ "crap" ],
    excludeThreshold: 0.3,
    includeTaxonomies: [ "sports" ],
    includeThreshold: 0.3
} as Settings;

const includeConfig = {
    method: METHOD_INCLUDE,
    excludeTaxonomies: [ "crap" ],
    excludeThreshold: 0.3,
    includeTaxonomies: [ "sports" ],
    includeThreshold: 0.3
} as Settings;

const exludeIncludeConfig = {
    method: METHOD_EXCLUDE_INCLUDE,
    excludeTaxonomies: [ "crap" ],
    excludeThreshold: 0.3,
    includeTaxonomies: [ "sports" ],
    includeThreshold: 0.3
} as Settings;

describe('TaxonomyFilter', () => {
    it('should pass exludeConfig', process(exludeConfig));

    it('should pass includeConfig', process(includeConfig));

    it('should pass exludeIncludeConfig', process(exludeIncludeConfig));
});

function process(conf) {
    return async () => {
        const successFilter = new TaxonomyFilter(new ModuleMock(passTaxonomy, conf));
        const failFilter = new TaxonomyFilter(new ModuleMock(failTaxonomy, conf))

        const result = await successFilter.apply();
        expect(result).to.equal(true);

        try {
            const result = await failFilter.apply();
            expect(true).not.to.equal(true);
        } catch(e) {
            expect(true).to.equal(true);
        }
    }
}

class ModuleMock {
    public textClassificationService: any;
    public configuration: any;

    constructor(taxonomy: any, settings?: Settings) {
        this.configuration = { taxonomyFilter: settings };
        this.textClassificationService = { getTaxonomy: () => Promise.resolve(taxonomy) }
    }
}