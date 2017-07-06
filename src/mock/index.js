import {api} from 'config';
import MockAdapter from 'axios-mock-adapter';
import Cookies from 'js-cookie';
import {SESSION_COOKIE_NAME} from 'config';

// mocked data
import {accounts} from './data/accounts';
import {
    externalDoiSearchResultList,
    internalDoiSearchResultList,
    externalPubMedSearchResultsList,
    internalPubMedSearchResultsList,
    externalTitleSearchResultsList,
    internalTitleSearchResultsList
} from './data/publicationSearch';


const queryString = require('query-string');
const mock = new MockAdapter(api, { delayResponse: 2000 });

// set session cookie in mock mode
Cookies.set(SESSION_COOKIE_NAME, 'abc123');

// Mock the account that the user is logged in as
if (queryString.parse(location.search).user === 'null') {
    mock.onGet('/account').reply(200, null);
} else {
    let account = accounts.find(s => s.id === queryString.parse(location.search).user);

    if (account === undefined) {
        account = accounts.find(s => s.id === 'uqinewton');
    }
    // mock account route
    mock.onGet('/account').reply(200, account);
}


// Mock the publication form external doi search endpoint
mock.onGet(/search\/external\?doi=*/).reply(200, externalDoiSearchResultList);

// Mock the publication form internal doi search endpoint
mock.onGet(/search\/internal\?doi=*/).reply(200, internalDoiSearchResultList);

// Mock the publication form external pubMed search endpoint
mock.onGet(/search\/external\?pub_med_id=*/).reply(200, externalPubMedSearchResultsList);

// Mock the publication form internal pubMed search endpoint
mock.onGet(/search\/internal\?pub_med_id=*/).reply(200, internalPubMedSearchResultsList);

// Mock the publication form external title search endpoint
mock.onGet(/search\/external\?source=wos&rek_display_type=[0-9]*/).reply(200, externalTitleSearchResultsList);

// Mock the publication form internal title search endpoint
mock.onGet(/search\/internal\?source=wos&rek_display_type=[0-9]*/).reply(200, internalTitleSearchResultsList);

