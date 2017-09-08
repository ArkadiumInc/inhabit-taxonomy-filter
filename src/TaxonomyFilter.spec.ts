import { TaxonomyFilter } from './TaxonomyFilter';
import { Settings } from './util/Settings';

import { expect } from 'chai';

const testTaxonomy = [{"values":["sports","basketball"],"score":0.999915,"type":null,"types":null,"misc":null},{"values":["law, govt and politics","government"],"score":0.301907,"type":null,"types":null,"misc":null},{"values":["science","social science","history"],"score":0.299955,"type":null,"types":null,"misc":null}];

class ModuleMock {
    public textClassificationService = { getTaxonomy: () => Promise.resolve(testTaxonomy) };
    public configuration: any;

    constructor(settings?: Settings) {
        this.configuration = { taxonomyFilter: settings };
    }
}

const crappyConfig = {
    method: "exclude",
    excludeTaxonomies: [ "basketball" ],
    excludeThreshold: 0.3,
    includeTaxonomies: "default",
    includeThreshold: 0.3
};

describe('TaxonomyFilter', () => {
    it('should pass on normal settings', async () => {
        const tf = new TaxonomyFilter(new ModuleMock());
        expect(typeof tf).to.equal('object');
    
        const result = await tf.apply();
    
        expect(result).to.equal(true);
    });
    it('should fail on crappy settings', async () => {
        const tf = new TaxonomyFilter(new ModuleMock(crappyConfig as Settings));
        expect(typeof tf).to.equal('object');
    
        try {
            const result = await tf.apply();
        } catch(e) {
            expect(e.message).to.equal('Taxonomy filter found Exclude match.');
        }
    })
});

// test('Exclude flow', async t => {
// })