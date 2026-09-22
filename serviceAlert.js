/**
 * Service Alert functions
 * 
 */



const getProfilesWithWebmessages = async (url) => {
    const footer_status = document.querySelector("#footer-status");
    footer_status.innerHTML = ""
    footer_status.ariaBusy = true
    return await fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            return data;
        })
        .catch((error) => displayError(error));
};

const createMessage = (message) => {
    html = 
        `<details class=\"alert-message\" ${message["criticalStatus"] ? "open" : ""}>
        <summary role=\"button\" ${message["criticalStatus"] ? "class=\"critical\"" : ""}>
        ${ message["criticalStatus"] ? "<i class=\"icon-warning-light\"></i>" : ""}
        ${message["title"] ? message["title"] : "Meddelande"}
        </summary>`
    if (message["title"]) {
        html += 
            `<h2>${message["title"]}</h2>`;
    } 
    if (message["text"])
        html += `${message["text"].replaceAll("<br />", "")}`
    //if (message["dateDelayUtc"])
    html += "<hr /></details>"
    return html
};

const displayAlerts = async (data) => {
    const footer_status = document.querySelector("#footer-status");
    
    var alert_pos = document.querySelector("#alert-pos");
    if(! alert_pos)
        alert_pos =  document.querySelector("#alert")
    if (data.length > 0) {
        const alert_template = document.querySelector("#alert-template");
        var alert_clone = document.importNode(alert_template.content, true);
        alert_pos.replaceWith(alert_clone);
        var alert = document.querySelector("#alert");
        data.forEach(message => {
            alert.querySelector("#messages").innerHTML += createMessage(message)            
        });
        alert.querySelector("#messages details").open = true
        alert.querySelector("#messages").innerHTML += "<footer><a href=\"/status\" role=\"button\">Se aktuell driftinformation och karta här!</a><hr/>"
        footer_status.innerHTML = "<i class=\"icon-warning-light\"></i>";
    } else {
        footer_status.innerHTML = "✓";
        var d = document.createElement('div');
        d.id = "alert-pos"
        alert_pos.replaceWith(d)
    }
    footer_status.ariaBusy = false;
};

const displayError = async (error) => {
    const footer_status = document.querySelector("#footer-status");
    footer_status.innerHTML = "⨯"
    footer_status.dataset.tooltip = String(error);
    footer_status.ariaBusy = false
};

const servicealert_main = async (url="https://servicealert-248446506125.europe-west1.run.app") => {
    getProfilesWithWebmessages(url).then( (data) => {
        displayAlerts(data)
    }).catch((error) => 
    displayError())
}

const servicealert_test = async () => {
    servicealert_main("/testdata.json")
}

const servicealert_error = async () => {
    servicealert_main("http://google.com")
}