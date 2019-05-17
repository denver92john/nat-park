# nat-parks

Search by state for national parks.

# issues
In the national park service api documentation (https://www.nps.gov/subjects/developer/api-documentation.htm) it shows more information that is accessible than what was returned in the response when fetching /parks. 


Attempted passing api key in a header but attempt failed with this response: "Access to fetch at 'https://developer.nps.gov/api/v1/parks?stateCode=mi&limit=10' from origin 'null' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: It does not have HTTP ok status."

    const options = {
        headers: new Headers({
            "X-Api-Key": "api_key"
        })
    }

