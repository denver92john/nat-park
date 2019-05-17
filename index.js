'use strict';

/* ----- 4 ----- */
function formatQueryString(paramsObj) {
    // prepares query info to be passed in request
    const queryItems = Object.keys(paramsObj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObj[key])}`);

    return queryItems.join('&');
}

/* ----- 6 ----- */
function renderResults(responseJson) {
    console.log(`responseJson in renderResults is: ${responseJson.data.length}`);
    $('.search-results').empty();

    responseJson.data.forEach(park => {
        $('.search-results').append(
            `<li>
                <h3><a href="${park.url}">${park.fullName}</a></h3>
                <p>${park.description}</p>
                <p><a href="${park.directionsUrl}">Click Here For Directions</a></p>
            </li>`
        );
    });
    $('.hidden').removeClass('hidden');
}

/* ----- 5 ----- */
function fetchResults(url) {
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            if (responseJson.data.length >= 1) {
                $('#js-error-message').text('');
                renderResults(responseJson);
            } else {
                throw new Error(`${responseJson.data.length} search results came back`);
            }
        })
        .catch(err => {
            $('.results').addClass('hidden');
            $('#js-error-message').text(`There was an issue: ${err}`);
        });
}

/* ----- 2 ----- */
function formatStateString() {
    // grabs user input and removes whitespaces after comma
    const stateList = $('#js-state-selected').val();
    $('#js-state-selected').val('');
    return stateList.replace(/\s+/g, '');
}

/* ----- 3 ----- */
function getResults(states, maxNumber) {
    const params = {
        api_key: "oS1WktVpHasrXn3EEMTNDLx1OZpyl98uDVR34S10",
        stateCode: states,
        limit: maxNumber
    };

    const npsUrl = "https://developer.nps.gov/api/v1/parks";
    const queryString = formatQueryString(params);
    const url = `${npsUrl}?${queryString}`;

    fetchResults(url);
}

/* ----- 1 ----- */
function handleForm() {
    $('form').submit(function(event) {
        event.preventDefault();

        const states = formatStateString();
        const maxNumber = $('#js-search-number').val();

        getResults(states, maxNumber);
    });
}

$(function() {
    console.log('App ready');
    handleForm();
});