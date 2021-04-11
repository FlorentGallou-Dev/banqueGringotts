/*------------------------------- VARS -------------------------------*/

/*TARGET THE POST LIST CONTAINER*/
let postContainer = document.getElementById("postContainer");

/*PREPARE RAW HTML ELEMENT TO RECEIVE POST CONTENT IN BETWEEN*/
let cardHTMLStart = '<div class="card col-12 p-0 mb-3"><div class="card-header">';
let cardHTMLMiddle = '</div><div class="card-body"><blockquote class="blockquote mb-0"><p class="blogContent">';
let cardHTMLEnd = '</p></blockquote></div></div>';

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

/*------------------------------- EVENTS EXECUTIONS -------------------------------*/