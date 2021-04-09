/*TARGET THE POST LIST CONTAINER*/
let postContainer = document.getElementById("postContainer");
/*LINK TO THE API*/
let linkToAPI = "https://oc-jswebsrv.herokuapp.com/api/articles";

/*PREPARE RAW HTML ELEMENT TO RECEIVE POST CONTENT IN BETWEEN*/
let cardHTMLStart = '<div class="card col-12 p-0 mb-3"><div class="card-header">';
let cardHTMLMiddle = '</div><div class="card-body"><blockquote class="blockquote mb-0"><p class="blogContent">';
let cardHTMLEnd = '</p></blockquote></div></div>';

//Var to contain prased data from the called with the link API
let datasFromApi = resquestAPI(linkToAPI);

console.log("2 - data dans fonction blog : " + datasFromApi);

/*function createElement(datas){
   
    //test my object
    console.log(datas);
    
    // Var that will be used to recreate each POST
    let postFilling = "";
    console.log(postFilling);
        
    datas.forEach(function(val) {
        //Var to get the object in each line
        const keys = Object.keys(val);
            
        keys.forEach(function(key) {
                                    
            if(key === "titre"){
            postFilling += cardHTMLStart + val[key] + cardHTMLMiddle;
        }
            
            if(key === "contenu"){
                postFilling += val[key] + cardHTMLEnd;
            }
            
        });
            
        console.log(postFilling);
    });
    postContainer.innerHTML += postFilling;
}

createElement(datasFromApi);*/