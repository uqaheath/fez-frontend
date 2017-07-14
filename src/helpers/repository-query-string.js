/**
 * Created by uqvasai on 5/07/2017.
 */
import { isDOIValue, isPartialDOIValue, isPubMedValue } from './validator';

export const getQueryString = (value) => {
    if (value) {
        if (isPartialDOIValue(value) || isDOIValue(value)) {
            return `doi=${value}`;
        } else if (isPubMedValue(value)) {
            return `pub_med_id=${value}`;
        } else if (/^\D.*/i.test(value) || value.trim().length > 5) {
            /**
             * @todo Move display type to config or make it configurable
             */
            return `source=wos&rek_display_type=179&title=${value}`;
        }
    }
    return '';
};
