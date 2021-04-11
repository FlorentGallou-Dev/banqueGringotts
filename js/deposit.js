/*------------------------------- VARS -------------------------------*/

//TARGET money zone
let amountDeposit = document.getElementById("amountDeposit");
let bouttonDeposit = document.getElementById("bouttonDeposit");

/*------------------------------- FUNCTIONS -------------------------------*/


/*------------------------------- EVENTS EXECUTIONS -------------------------------*/

bouttonDeposit.addEventListener("click", function(){

    //let valeurTemp = this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    let everyBalanceDiv = document.getElementsByClassName("valid-feedback");
    for(let div of everyBalanceDiv){
        if(window.getComputedStyle(div, null).display === "block"){
            //gets back blance to int from solde div
            let balance = div.innerHTML.match(/\d/g);
            balance = balance.join("");
            balance = parseInt(amountDeposit.value) + parseInt(balance);
            balance = balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            alert(`Vous venez de déposer ${amountDeposit.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Gallons ce qui monterait le solde de votre compte à ${balance} Gallons.`);
        }
    }
});