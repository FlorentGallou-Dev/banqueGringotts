/*------------------------------- VARS -------------------------------*/

//TARGET money zone
let amountTransfer = document.getElementById("amountTransfer");
let bouttonTransfer = document.getElementById("bouttonTransfer");

//TARGET the select list element
let selectDebit = document.getElementById("selectDebit");
let selectCredit = document.getElementById("selectCredit");

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
                    selectDebit.nextElementSibling.innerHTML += '<div class="valid-feedback debit" id="soldeDeb' + val["type"].toLowerCase().replace(/\s/g, '') + '">Solde du compte : ' + val[key].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' Gallons</div>';
                    selectCredit.nextElementSibling.innerHTML += '<div class="valid-feedback credit" id="soldeCred' + val["type"].toLowerCase().replace(/\s/g, '') + '">Solde du compte : ' + val[key].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' Gallons</div>';
                }
                selectDebit.innerHTML = accountFilling;
                selectCredit.innerHTML = accountFilling;
            });
        });
    }
};

//Methode to ask request
xhrRequestAccountsGet.open("GET", urlAccounts, true);
//Methode to send the request
xhrRequestAccountsGet.send();

/*Function to show good balance under selected account*/
function showBalance(){
    //Point the div ID corresponding to this
    let target = "";
    //Point the div class corresponding to this
    let classRemade = "";
    
    if(this === selectDebit){
        target = 'soldeDeb' + this.value.toLowerCase().replace(/\s/g, '');
        classRemade = "valid-feedback debit";
    } else {
        classRemade = "valid-feedback credit";
        target = 'soldeCred' + this.value.toLowerCase().replace(/\s/g, '');
    }
    
    //List div with this item class
    let everyBalanceDiv = document.getElementsByClassName(classRemade);

    // test if div is displayed or not
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
    
}

/*------------------------------- EVENTS EXECUTIONS -------------------------------*/

//To display the account ballance selected in the div behind the select
selectDebit.addEventListener("focusout", showBalance);
selectCredit.addEventListener("focusout", showBalance);

bouttonTransfer.addEventListener("click", function(){

    //let valeurTemp = this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    let balanceDeb = document.getElementsByClassName("valid-feedback debit");
    let balanceCred = document.getElementsByClassName("valid-feedback credit");

    for(let divDeb of balanceDeb){
        if(window.getComputedStyle(divDeb, null).display === "block"){
            for(let divCred of balanceCred){
                if(window.getComputedStyle(divCred, null).display === "block"){
                    //gets back blance to int from solde div debit
                    let balanceDebit = divDeb.innerHTML.match(/\d/g);
                     //gets back blance to int from solde div credit
                    let balanceCredit = divCred.innerHTML.match(/\d/g);

                    balanceDebit = balanceDebit.join("");
                    balanceCredit = balanceCredit.join("");

                    if(parseInt(balanceDebit) < amountTransfer.value){
                        alert(`Le solde de votre compte ne permet pas ce transfert.`);
                    } else {
                        balanceDebit = parseInt(balanceDebit) - parseInt(amountTransfer.value);
                        balanceCredit = parseInt(balanceCredit) + parseInt(amountTransfer.value);

                        balanceDebit = balanceDebit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                        balanceCredit = balanceCredit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

                        alert(`Vous venez de transférer ${amountTransfer.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Gallons du compte ${selectDebit.value} (nouveau solde : ${balanceDebit} Gallons) sur le compte ${selectCredit.value} (nouveau solde : ${balanceCredit} Gallons).`);
                    }
                }
            }
        }
    }
});