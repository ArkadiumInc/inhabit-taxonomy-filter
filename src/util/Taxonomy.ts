export interface TaxonomyObject {
    values: string[];
    score: number;
    type?: string;
    types?: string[];
    misc?: any;
}

export class Taxonomy {
    constructor(private collection: TaxonomyObject[]) {}

    public findWord(word: string) {
        return this.collection.filter(t => ~t.values.indexOf(word))
    }

    public findWords(words: string[]) {
        return [].concat(...words.map(w => this.findWord(w)));
    }
}