/**
 * Created by uqvasai on 5/07/2017.
 */
import { isDOIValue, isPartialDOIValue, isPubMedValue } from '../providers/validator';
import { locale } from '../config';

const buttonLabels = locale.pages.addRecord.searchForPublication.buttonLabelVariants;
const label = locale.pages.addRecord.searchForPublication.defaultButtonLabel;

export const getButtonLabel = (value) => {
    if (value) {
        if (isPartialDOIValue(value) || isDOIValue(value)) {
            return buttonLabels.doi;
        } else if (isPubMedValue(value)) {
            return buttonLabels.pubmed;
        } else if (/^\D.*/i.test(value) || value.trim().length > 5) {
            return buttonLabels.title;
        }
    }

    return label;
};
