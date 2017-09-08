/**
 * Created by Wishm on 12/7/2016.
 */
import DefaultSettings from './DefaultSettings';
import { NormalSettings } from './util/Settings';
import { Taxonomy } from './util/Taxonomy';

const threshold = score => tax => tax.score > score;

export class TaxonomyFilter {
    private settings: NormalSettings;

    constructor(private module: any) {
        this.settings = new NormalSettings(
            this.module.configuration.taxonomyFilter || DefaultSettings
        );
    }

    public async apply() {
        const taxonomy = await this.module.textClassificationService.getTaxonomy('alchemy');
        const tax = new Taxonomy(taxonomy);

        const exclude = tax.findWords(this.settings.getExcludeList())
            .filter(threshold(this.settings.getExcludeThreshold()));

        const include = tax.findWords(this.settings.getIncludeList())
            .filter(threshold(this.settings.getIncludeThreshold()));;

        if (exclude.length > 0) throw Error('Taxonomy filter found Exclude match.');
        if (include.length < 1) throw Error('Taxonomy filter not found Include match.');

        return true;
    }
}