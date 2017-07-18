/**
 * Created by uqvasai on 17/07/2017.
 */
import { isDOIValue, isPubMedValue } from './validator';

export function convertToQueryString(searchText, rekDisplayType = 179) {
    if (isDOIValue(searchText)) {
        return `doi=${searchText}`;
    } else if (isPubMedValue(searchText)) {
        return `pub_med_id=${searchText}`;
    } else {
        return `rek_display_type=${rekDisplayType}&title=${searchText}`;
    }
}
