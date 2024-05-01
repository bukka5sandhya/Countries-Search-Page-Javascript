let searchInputEle = document.getElementById("searchInput");
let spinnerEle = document.getElementById("spinner");
let resultCountriesEle = document.getElementById("resultCountries");

let searchInputValue = "";
let countriesList =[];

function createAndAppendCountrySearch(country){
    let countryEle = document.createElement("div");
    countryEle.classList.add("country-card","col-11", "col-md-5", "mr-auto",  "d-flex", "flex-row");
    resultCountriesEle.appendChild(countryEle)
 
    let countryFlag = document.createElement("img");
    countryFlag.classList.add("country-flag" ,"mt-auto", "mb-auto")
    countryFlag.src= country.flag;
    countryEle.appendChild(countryFlag);

    let countriesInfoEle = document.createElement("div");
    countriesInfoEle.classList.add("d-flex", "flex-column", "ml-4")
    countryEle.appendChild(countriesInfoEle)

    let countryNameEle = document.createElement("p");
    countryNameEle.classList.add("country-name");
    countryNameEle.textContent = country.name;
    countriesInfoEle.appendChild(countryNameEle);

    let countryPopulationEle = document.createElement("p");
    countryPopulationEle.classList.add("country-population");
    countryPopulationEle.textContent = country.population;
    countriesInfoEle.appendChild(countryPopulationEle);

}

function displaySearchResults(){
    resultCountriesEle.textContent = "";
    for(let country of countriesList){
        let countryName = country.name;

        if(countryName.includes(searchInputValue)){
             createAndAppendCountrySearch(country)
        }
    }
}

function getCountries(){
    let url="https://apis.ccbp.in/countries-data";
    let options={method:"GET"};

    spinnerEle.classList.remove("d-none");

    fetch(url,options)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonData){
        spinnerEle.classList.add("d-none");
        countriesList = jsonData;
        displaySearchResults();

    })
}

function onChangeSearchInput(event){
    searchInputValue = event.target.value ;
    displaySearchResults();
}

getCountries();
searchInputEle.addEventListener("keyup",onChangeSearchInput);