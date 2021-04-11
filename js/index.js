/*------------------------------- VARS -------------------------------*/

//TARGET the security SECTION
let securityPannel = document.getElementById("securityPannel");
//TARGET every othe main containers
let otherContainers = {
    "header": document.getElementById("header"),
    "main": document.getElementById("main"),
    "footer": document.getElementById("footer")
};
//TARGET the button link
let stopSecurity = document.getElementById("stopSecurity");

//TARGET accounts
let accountsContainer = document.getElementById("accountsContainer");

//LINK to the security FILE
var urlSecu = "apis/secu.json";

//LINK to the security FILE
var urlText = "apis/index.json";

//LINK to the security FILE
var urlAccounts = "apis/accounts.json";

/*------------------------------- FUNCTIONS -------------------------------*/

/*~~~~~~~~~~~~~~~ GET REQUEST FOR SECURITY CLIKED OR NOT ~~~~~~~~~~~~~~~*/

//VAR to send XHR GET request
let xhrRequestSecuGet = new XMLHttpRequest();
//REQUEST to read the file that receive if security button has been clicked or not
xhrRequestSecuGet.onreadystatechange = function() {
//Test Request and HTTP ready and ok
if (this.readyState == 4 && this.status == 200) {
        //Receive JSON file response parse as object
        let securityResponse = JSON.parse(this.responseText);
        //function that will do something with the response
        securityCheck(securityResponse);
    }
};
//Methode to ask request
xhrRequestSecuGet.open("GET", urlSecu, true);
//Methode to send the request
xhrRequestSecuGet.send();

//To display or hide security SECTION
function securityCheck(reponse) {
    //Test if the response is false - non visited
    if(!reponse[0].visit){
        securityOn();
    } else {
        securityOff();
    };
};

/*~~~~~~~~~~~~~~~ GET REQUEST To inject secutity text ~~~~~~~~~~~~~~~*/

//VAR to send XHR GET request
let xhrRequestTextGet = new XMLHttpRequest();
//REQUEST to read the file that receive if security button has been clicked or not
xhrRequestTextGet.onreadystatechange = function() {
//Test Request and HTTP ready and ok
if (this.readyState == 4 && this.status == 200) {
        //Receive JSON file response parse as object
        let text = JSON.parse(this.responseText);
        //Inject text from file into text paragraph
        document.getElementsByClassName('textSecu')[0].innerHTML = text[0].text;
    }
};
//Methode to ask request
xhrRequestTextGet.open("GET", urlText, true);
//Methode to send the request
xhrRequestTextGet.send();

/*~~~~~~~~~~~~~~~ GET REQUEST TO LIST AND INJECT ACCOUNTS ~~~~~~~~~~~~~~~*/

/*PREPARE RAW HTML ELEMENT TO RECEIVE POST CONTENT IN BETWEEN*/
let cardHTMLStart = '<div class="col-12 col-lg-4 my-3 mx-auto"><div class="card mx-1"><div class="card-body"><h5 class="card-title">';
let cardHTMLAfterTitle = '</h5><p class="card-text">';
let cardHTMLAfterText = '</p></div><ul class="list-group list-group-flush"><li class="list-group-item owner">';
let cardHTMLAfterLi = '</li><li class="list-group-item balance">';

//VAR to send XHR GET request
let xhrRequestAccountsGet = new XMLHttpRequest();
//REQUEST to read the file that receive if security button has been clicked or not
xhrRequestAccountsGet.onreadystatechange = function() {
//Test Request and HTTP ready and ok
if (this.readyState == 4 && this.status == 200) {
        //Receive JSON file response parse as object
        let accountsList = JSON.parse(this.responseText);
        //Inject text from file into text paragraph
        //Var used to recreate HTML element
        let accountFilling = "";
                    
        accountsList.forEach(function(val) {
            //Var to get the object in each line
            const keys = Object.keys(val);
            // Will receive account type to create an html page link in button
            let linkToAccount = "";
            //loop to use datas each index
            keys.forEach(function(key) {
                //to avoid id index fill HTML and values
                if(key === "type"){
                    //Receive account type as string without spaces an lowercassed adding .html extension 
                    linkToAccount = val[key].toLowerCase().replace(/\s/g, '') + ".html";
                    accountFilling += cardHTMLStart + val[key] + cardHTMLAfterTitle;
                }
                else if(key === "Number"){
                    accountFilling += "N° " + val[key] + cardHTMLAfterText;
                }
                else if(key === "Owner"){
                    accountFilling += "Propriétaire : " + val[key] + cardHTMLAfterLi;
                }
                else if(key === "balance"){
                    accountFilling += "Solde : " + formatMoney(val[key]) + " Gallons" + cardHTMLAfterLi;
                }
                else if(key === "operations"){
                    let lastOperation = val[key].length-1;
                    accountFilling += "Dernière opération : " + val[key][lastOperation].title + " : " + formatMoney(val[key][lastOperation].amount) + " G"  + '</li></ul><div class="card-body text-center"><a href="' + linkToAccount + '" class="btn btn-gold">Consulter</a></div></div></div>';
                }
            });
        });
        accountsContainer.innerHTML = accountFilling;
    }
};
//Methode to ask request
xhrRequestAccountsGet.open("GET", urlAccounts, true);
//Methode to send the request
xhrRequestAccountsGet.send();

/*~~~~~~~~~~~~~~~ FORMAT MONEY WITH SPACE AND UNIT ~~~~~~~~~~~~~~~*/
function formatMoney(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/*~~~~~~~~~~~~~~~ SOW HIDE EVENTS ~~~~~~~~~~~~~~~*/

//Hide everything else and show security pannel
function securityOn(){
    //Show the security SECTION
    securityPannel.style.display = "flex";
    //Make every element content desapear
    for(let element in otherContainers){
        otherContainers[element].style.display = "none";
    }
}

//Hide security pannel and show everything else
function securityOff(){
    //Otherwise hide the security SECTION because it has been visited
    securityPannel.style.display = "none";
    //Make every element content reappead
    for(let element in otherContainers){
        otherContainers[element].style.display = "block";
    }
}

/*------------------------------- EVENTS EXECUTIONS -------------------------------*/

/*~~~~~~~~~~~~~~~ BUTTON CLICK EVENT ~~~~~~~~~~~~~~~*/

stopSecurity.addEventListener("click", function(){
    //Hide security pannel and show everything else
    securityOff();

/*~~~~~~~~~~~~~~~ POST REQUEST ~~~~~~~~~~~~~~~*/ //DOESN'T WORK ON LOCAL
    /*const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 201){
        alert(xhr.response);
    }
    };
    const inValidate = JSON.stringify({ visit: true});
    xhr.send(inValidate);*/
});