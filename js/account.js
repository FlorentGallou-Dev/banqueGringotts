/*------------------------------- VARS -------------------------------*/

//gets back the page name to use it as the type of account later
let path = window.location.pathname;
path = path.split("/").pop();
path = path.split(".");
let typeBackFromPageName = path[0];

//TARGET accounts
let accountContainer = document.getElementById("accountContainer");

//LINK to the security FILE
var urlAccounts = "apis/accounts.json";

/*------------------------------- FUNCTIONS -------------------------------*/

/*~~~~~~~~~~~~~~~ GET REQUEST TO LIST AND INJECT ACCOUNTS ~~~~~~~~~~~~~~~*/

/*PREPARE RAW HTML ELEMENT TO RECEIVE POST CONTENT IN BETWEEN*/
let cardHTMLStart = '<div class="col-12 mx-auto"><div class="card mx-1"><div class="card-body"><h1 class="card-title color-gold">';
let cardHTMLAfterTitle = '</h1><p class="card-text">';
let cardHTMLAfterText = '</p></div><ul class="list-group list-group-flush"><li class="list-group-item owner">';
let cardHTMLAfterLi = '</li>';

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
            //loop to use datas each index
            
            keys.forEach(function(key) {
                //Only get the account having the same type that page name and is a string to avoid messing with objects
                if( typeof val[key] === "string" && val[key].toLowerCase().replace(/\s/g, '') === typeBackFromPageName){
                    
                    accountFilling += cardHTMLStart + val[key] + cardHTMLAfterTitle;
                    accountFilling += "N° " + val["Number"] + cardHTMLAfterText;
                    accountFilling += "Propriétaire : " + val["Owner"] + cardHTMLAfterLi;
                    accountFilling += '<li class="list-group-item owner">Solde : ' + formatMoney(val["balance"]) + " Gallons" + cardHTMLAfterLi;
                    //listing all the money movements
                    for(let line of val["operations"]){
                        accountFilling += '<li class="list-group-item balance"> ===> ' + line.title + " : " + formatMoney(line.amount) + " G"  + '</li>';
                    }
                    accountFilling += '</ul><div class="card-body text-center"><a href="close.html" class="btn btn-gold mx-1">Clore</a><a href="deposit.html" class="btn btn-gold mx-1">Dépot</a><a href="withdraw.html" class="btn btn-gold mx-1">Retrait</a></div></div></div>';
                    accountContainer.innerHTML = accountFilling;
                    //as we are done we stop
                    return;
                }
            });
        });
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

/*------------------------------- EVENTS EXECUTIONS -------------------------------*/