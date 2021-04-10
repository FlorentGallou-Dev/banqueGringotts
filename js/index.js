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

//LINK to the FILE
var url = "apis/index.json";

/*------------------------------- FUNCTIONS -------------------------------*/

/*~~~~~~~~~~~~~~~ GET REQUEST ~~~~~~~~~~~~~~~*/

//VAR to send XHR GET request
var xhrRequestGet = new XMLHttpRequest();
//REQUEST to read the file that receive if security button has been clicked or not
xhrRequestGet.onreadystatechange = function() {
//Test Request and HTTP ready and ok
if (this.readyState == 4 && this.status == 200) {
        //Receive JSON file response parse as object
        var securityResponse = JSON.parse(this.responseText);
        //function that will do something with the response
        securityCheck(securityResponse);
    }
};
//Methode to ask request
xhrRequestGet.open("GET", url, true);
//Methode to send the request
xhrRequestGet.send();

//To display or hide security SECTION
function securityCheck(reponse) {
    //Test if the response is false - non visited
    if(!reponse[0].visit){
        securityOn();
    } else {
        securityOff();
    };
};

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

/*TARGET THE POST LIST CONTAINER*/
let accountsContainer = document.getElementById("accountsContainer");

/*PREPARE RAW HTML ELEMENT TO RECEIVE POST CONTENT IN BETWEEN*/
let cardHTMLStart = '<div class="card-body"><h5 class="card-title">';
let cardHTMLAfterTitle = '</h5><p class="card-text">';
let cardHTMLAfterText = '</p></div><ul class="list-group list-group-flush"><li class="list-group-item owner">';
let cardHTMLAfterLi = '</li><li class="list-group-item balance">';
let cardHTMLEnd = '</li></ul><div class="card-body text-center"><a href="" class="btn btn-gold see">Consulter</a></div></div>';

document.addEventListener('DOMContentLoaded',function(){
    //Var to use as request to send
    let httpRequest = new XMLHttpRequest();
    //Function execution as server changes state
    httpRequest.onreadystatechange = function() {
        //Tests server answer if ready === 4
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            //Now check if HTTP request is OK
            if (httpRequest.status === 200) {
                // Var to recreate JSON object in JS
                let datas = JSON.parse(httpRequest.responseText);
                //Var used to recreate HTML element
                let postFilling = "";
                    
                datas.forEach(function(val) {
                    //Var to get the object in each line
                    const keys = Object.keys(val);
                    //loop to use datas each index
                    keys.forEach(function(key) {
                        //to avoid id index fill HTML and values
                        if(key === "titre"){
                            postFilling += cardHTMLStart + val[key] + cardHTMLMiddle;
                        }
                        if(key === "contenu"){
                            postFilling += val[key] + cardHTMLEnd;
                        }
                    });
                });
                //Inject HTML element in my page
                postContainer.innerHTML += postFilling;
            } else {
                console.log(`Erreur : ${httpRequest.status}`); //Gives HTTP error code is fails.
            }
        } else {                                            //Whatever appens it will tell if something went wrong
            console.log("Rien ne se passe...");
        }
    };
    httpRequest.open('GET', 'https://oc-jswebsrv.herokuapp.com/api/articles', true);
    httpRequest.send();
});