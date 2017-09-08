import { Taxonomy } from './Taxonomy';

import { expect } from 'chai';

const testTaxonomy = [{"values":["sports","basketball"],"score":0.999915,"type":null,"types":null,"misc":null},{"values":["law, govt and politics","government"],"score":0.301907,"type":null,"types":null,"misc":null},{"values":["science","social science","history"],"score":0.299955,"type":null,"types":null,"misc":null}];

describe('Taxonomy', () => {
    it('should findWord', () => {
        const tf = new Taxonomy(testTaxonomy);

        const actual = tf.findWord('basketball');
        const expected = [{"values":["sports","basketball"],"score":0.999915,"type":null,"types":null,"misc":null}];

        expect(actual).to.be.deep.equal(expected);
    });
    it('should findWords', () => {
        const tf = new Taxonomy(testTaxonomy);
        
        const actual = tf.findWords(['basketball', 'scrappy coco', 'peace of ship']);
        const expected = [{"values":["sports","basketball"],"score":0.999915,"type":null,"types":null,"misc":null}];
    
        expect(actual).to.be.deep.equal(expected);
    })
});