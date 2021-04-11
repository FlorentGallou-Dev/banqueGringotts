/*------------------------------- VARS -------------------------------*/

/*TARGET THE POST TABLE CONTAINER*/
let statContainer = document.getElementById("statsContainer");

/*PREPARE RAW HTML ELEMENT TO RECEIVE TAB CONTENT IN BETWEEN*/
let tableStart = '<tr><td>';
let tableMiddle = '</td><td>';
let tableEnd = '</td></tr>';

/*------------------------------- FUNCTIONS -------------------------------*/

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
                console.log(datas);
                //Var used to recreate HTML element
                let tabFilling = "";
                    
                datas.forEach(function(val) {
                    //Var to get the object in each line
                    const keys = Object.keys(val);
                    //loop to use datas each index
                    keys.forEach(function(key) {
                        //fill HTML and values to create tables rows
                        if(key === "name"){
                            tabFilling += tableStart + val[key] + tableMiddle;
                        }
                        if(key === "code"){
                            tabFilling += val[key] + tableMiddle;
                        }
                        if(key === "rate"){
                            tabFilling += val[key] + tableEnd;
                        }
                    });
                });
                //Inject HTML element in my page
                statContainer.innerHTML += tabFilling;
            } else {
                console.log(`Erreur : ${httpRequest.status}`); //Gives HTTP error code is fails.
            }
        } else {                                            //Whatever appens it will tell if something went wrong
            console.log("Rien ne se passe...");
        }
    };
    httpRequest.open('GET', 'apis/currencies.json', true);
    httpRequest.send();
});

/*------------------------------- EVENTS EXECUTIONS -------------------------------*/