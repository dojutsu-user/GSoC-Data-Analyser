# GSoC-Data-Analyser
A simple search for organisations participating/participated in **Google Summer Of Code** from 2009.
## Features
* Search your organisation
* Get the data of your organisation
	* Data of a organisation includes the number of years it has taken part and number of projects completed in that specific year
* Get the data of the GSoC from the year 2009
* Single page application
* Data is beautifully visualised with the help of **Chart.js**
* Material Design
* CSS Loader

## Motivation
When choosing a organisation for the GSoC, it becomes very cumbersome to manually check if the organisation is taking part each year or is it new, number of selected candidates each year and other details. So, with this project I am trying to minimise the manual labor in finding the information about a particular organisation.


## Setting up the project
### Backend Setup
* Clone this repository: `git clone https://github.com/dojutsu-user/GSoC-Data-Analyser.git`
* Navigate to `backend` folder: `cd GSoC-Data-Analyser/website/backend/`
* Install the dependencies: `pipenv install`
* Activate the virtual environment: `pipenv shell`
* Run the `migrate` command: `python manage.py migrate`
* Start the server: `python manage.py runserver`

### Frontend Setup
* After cloning the repository, navigate to `frontend` folder: `cd GSoC-Data-Analyser/website/frontend/`
* Install the dependencies: `npm install` 
* Run the reactjs project: `npm start`

## API Documentation (Version: v1)
**BASE URL**: [https://gsoc-analyzer.herokuapp.com/api/v1](http://gsoc-analyzer.herokuapp.com/api/v1/)
### Overview Of GSoC
Returns the  data about the GSoC from year 2009-2018.
* **URL**
	
    /overview/gsoc
    
* **METHOD**

	`GET`
    
* **Success Response:**

	* **Code:** 200
	* **Content:** 
		```javascript
        {
          "2015":{
            "no_of_orgs":134,
            "no_of_projects":917
          },
          "2014":{
          
            "no_of_orgs":187,
            "no_of_projects":1173
          },
          "2013":{
            "no_of_orgs":172,
            "no_of_projects":1060
          },
          "2012":{
            "no_of_orgs":179,
            "no_of_projects":1073
          },
          "2011":{
            "no_of_orgs":173,
            "no_of_projects":988
          },
          "2010":{
            "no_of_orgs":151,
            "no_of_projects":917
          },
          "2009":{
            "no_of_orgs":150,
            "no_of_projects":858
          },
          "2018":{
            "no_of_orgs":212,
            "no_of_projects":1071
          },
          "2017":{
            "no_of_orgs":201,
            "no_of_projects":1127
          },
          "2016":{
            "no_of_orgs":178,
            "no_of_projects":1032
          },
          "total_orgs":1737,
          "total_projects":10216
        }
        ```
 ### Searching an Organisation
 Returns the organisations names with their slug
 * **URL**
 
 	/search?q=QUERY
* **METHOD**

	`GET`
    
* **Search Params**
	
    **Required:**
    
    `q=[string]`
    
* **Success Response:**
	* **Code:** 200
	* **Content:**: `{ORG_NAME: ORG_SUG}`
* **Error Response**
	* If `q` is not present:
		* **Code:** 400
		* **Content:** `{'error': 'Search query is required'}`
	* If no organisation found for a given query
    	* **Code:** 400
    	* **Content:** `{'error': 'No Results Found', 'query': QUERY}`
* **Example:**
	* **URL**: /search?q=django
	* **Response**: `{"Django Software Foundation":"django-software-foundation"}`

### Getting the info of a particular organisation
Returns the information about a particular organisation
* **URL**

	/org/:slug

* **Method**

	`GET`
    
* **URL Params:**
	* **Required:**
	
    	`slug=[string]`, represents the slug of a organisation.
* **Success Response:**
	* **Code:** 200
	* **Content:** 
		```javascript
        {
            "org_name": ORGANISATION_FULL_NAME,
            "slug": organisation-slug
            "years_of_participation": [
                "2017",
                "2018"
			],
            "projects_each_year": {
            	"2017": 3,
                "2018" 1
			}
		}
        ```
        
* **Error Response:**
	* If the slug doesn't match to any organisation
		* **Code:** 400
		* **Content:** `{'error': 'No Organisation Found.'}`

### Overview of a particular year
Returns the total organisations participated and total projects completed in a particular year from 2009-2018.

* **URL**

	/overview/:year
    
* **METHOD**

	`GET`
    
* **URL Params:**
	* **Required:**
	
    	`year=[integer]`, year must lie between 2009-2018
* **Success Response:**
	* **Code:** 200
	* **Content**: 	`{"total_orgs_participated":212,"total_projects_done":1071}`
* **Error Response:**
	* If no data found for the specified year
		* **Code:** 400
		* **Content:** `{'error': 'Data not found for the year 2000'`
* **Example:**
	* **URL:** /overview/2017
	* **Response:** `{"total_orgs_participated":201,"total_projects_done":1127}`
  
## Screenshots
![screencapture-gsoc-data-analyzer-netlify-2018-10-28-16_15_31](https://user-images.githubusercontent.com/29149191/47614887-044b6180-dacd-11e8-9681-81edc7838f14.png)
![screencapture-gsoc-data-analyzer-netlify-about-2018-10-28-16_15_42](https://user-images.githubusercontent.com/29149191/47614886-044b6180-dacd-11e8-83f6-68f7ef673769.png)
![screencapture-gsoc-data-analyzer-netlify-overview-gsoc-2018-10-28-16_15_56](https://user-images.githubusercontent.com/29149191/47614885-03b2cb00-dacd-11e8-8cd1-1e704aa25556.png)
![screencapture-gsoc-data-analyzer-netlify-search-2018-10-28-16_16_14](https://user-images.githubusercontent.com/29149191/47614884-03b2cb00-dacd-11e8-8598-8aa90accdd36.png)
![screencapture-gsoc-data-analyzer-netlify-org-django-software-foundation-2018-10-28-16_16_23](https://user-images.githubusercontent.com/29149191/47614883-031a3480-dacd-11e8-9571-a5440b726942.png)
