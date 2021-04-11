/*------------------------------- VARS -------------------------------*/

//TARGET money zone
let amountWithdraw = document.getElementById("amountWithdraw");
let bouttonWithdraw = document.getElementById("bouttonWithdraw");

/*------------------------------- FUNCTIONS -------------------------------*/


/*------------------------------- EVENTS EXECUTIONS -------------------------------*/

bouttonWithdraw.addEventListener("click", function(){

    //let valeurTemp = this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    let everyBalanceDiv = document.getElementsByClassName("valid-feedback");
    for(let div of everyBalanceDiv){
        if(window.getComputedStyle(div, null).display === "block"){
            //gets back blance to int from solde div
            let balance = div.innerHTML.match(/\d/g);
            balance = balance.join("");
            if(parseInt(balance) < amountWithdraw.value){
                alert(`Le solde de votre compte ne permet pas ce retrait.`);
            } else {
                balance = parseInt(balance) - parseInt(amountWithdraw.value);
                balance = balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                alert(`Vous venez de retirer ${amountWithdraw.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Gallons ce qui monterait le solde de votre compte à ${balance} Gallons.`);
            }
        }
    }
});