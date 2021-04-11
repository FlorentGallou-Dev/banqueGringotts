/*------------------------------- VARS -------------------------------*/

//TARGET the select list element
let select = document.getElementById("Select");

//LINK to the security FILE
var urlAccounts = "apis/accounts.json";

/*------------------------------- FUNCTIONS -------------------------------*/

/*~~~~~~~~~~~~~~~ GET REQUEST TO LIST ACCOUNTS ~~~~~~~~~~~~~~~*/

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
                if( key === "type"){
                    accountFilling += '<option class="option-gold">' + val[key] + '</option>';
                    
                } else if(key === "balance"){
                    select.nextElementSibling.innerHTML += '<div class="valid-feedback" id="solde' + val["type"].toLowerCase().replace(/\s/g, '') + '">Solde du compte : ' + val[key].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' Gallons</div>';
                }
                select.innerHTML = accountFilling;
            });
        });
    }
};

//Methode to ask request
xhrRequestAccountsGet.open("GET", urlAccounts, true);
//Methode to send the request
xhrRequestAccountsGet.send();

/*------------------------------- EVENTS EXECUTIONS -------------------------------*/

//To display the account ballance selected in the div behind the select
select.addEventListener("focusout", function(){
    let target = 'solde' + this.value.toLowerCase().replace(/\s/g, '');
    let everyBalanceDiv = document.getElementsByClassName("valid-feedback");

    if(window.getComputedStyle(document.getElementById(target), null).display === "none"){
        //Put every blance div to none
        for(let div of everyBalanceDiv){
            div.style.display = "none";
        }
        // Display only the good blance div
        document.getElementById(target).style.display = "block";
    } else {
        document.getElementById(target).style.display = "none";
    }
    
});