function resquestAPI(link){
    //let  dataToSend = [];

    //function apiGet() {
    document.addEventListener('DOMContentLoaded',function(){
        let httpRequest = new XMLHttpRequest();
        //let receptacle = [];
        //Function execution as server changes state
        httpRequest.onreadystatechange = function() {
            //Tests server answer if ready === 4
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                //Confirm that everything is ok
                console.log("- Etape 3 CHECK\n- Etape 4 OK.");
                //Now check if HTTP request is OK
                if (httpRequest.status === 200) {
                    //Answer ready and raw contant we got
                    console.log("Requète HTTP prête !");
                    console.log(httpRequest.responseText);
                    // Var to recreate JSON object in JS
                    //let result = JSON.parse(httpRequest.responseText);
                    //receptacle = httpRequest.responseText;
                    const xhr = new XMLHttpRequest();
                    xhr.open('POST', 'apis/blog.json', true);
                    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                    const body =  JSON.parse(httpRequest.responseText);
                    xhr.send(body);
            
                } else {
                    console.log(`Erreur : ${httpRequest.status}`); //Gives HTTP error code is fails.
                }
            }
            else if (httpRequest.readyState === 0) {            //Other tests to find where does the problem comes
                console.log("- Etape 0.");
            } else if (httpRequest.readyState === 1) {
                console.log("- Etape 0 CHECK\n- Etape 1.");
            } else if (httpRequest.readyState === 2) {
                console.log("- Etape 1 CHECK\n- Etape 2.");
            } else if (httpRequest.readyState === 3) {
                console.log("- Etape 2 CHECK\n- Etape 3.");
            } else {                                            //Whatever appens it will tell if something went wrong
                console.log("Rien ne se passe...");
            }
        };
        httpRequest.open('GET', link, true);
        httpRequest.send();
    });
        //console.log("protuberance " + receptacle);
        //console.log("1result avant envoi" + result);
        //return result;
    //}

    //dataToSend = document.addEventListener('DOMContentLoaded', apiGet());

    //console.log("2result avant envoi" + dataToSend);
    //return dataToSend;
}