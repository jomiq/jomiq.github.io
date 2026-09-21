/**
 * Service Alert functions
 * 
 */



const getProfilesWithWebmessages = async () => {
    return await fetch("/status.json")
        .then((resp) => resp.json())
        .then((data) => {
            return data["profilesWithWebmessages"][0];
        })
        .catch((error) => console.error('Error:', error));
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
    html += "</details><hr />"
    return html
        
};

const displayAlerts = async (data) => {
    const footer_status = document.querySelector("#footer-status");
    const alert_pos = document.querySelector("#alert-pos");
    if (data.length > 0) {
        const alert_template = document.querySelector("#alert-template");
        var alert_clone = document.importNode(alert_template.content, true);
        alert_pos.replaceWith(alert_clone);
        var alert = document.querySelector("#alert");
        data.forEach(message => {
            alert.querySelector("#messages").innerHTML += createMessage(message)            
        });
        alert.querySelector("#messages").innerHTML += "<a href=\"/status\">Se aktuell driftinformation och karta här!</a>"
        footer_status.innerHTML = "<i class=\"icon-warning-light\"></i>";
    } else {
        footer_status.innerHTML = "✓";
    }
    footer_status.ariaBusy = false;
};

const displayError = async (error) => {
    footer_status.innerHTML = "⨯"
    footer_status.dataset.tooltip = String(error);
    footer_status.ariaBusy = false
};

const testdata = [
    {
        "id": 221260,
        "profileId": 5437,
        "profileName": "Jokkmokks Energi AB",
        "dateCreatedUtc": "2026-09-01T12:14:37Z",
        "smsGroupId": 3150343,
        "affectedAddressesCoordinates": [
            {
                "lat": 66.60115015682184,
                "lng": 19.85794019605276
            },
            {
                "lat": 66.601117462385,
                "lng": 19.858354171320446
            },
            {
                "lat": 66.60112328638749,
                "lng": 19.85727513526276
            },
            {
                "lat": 66.60115175639575,
                "lng": 19.858196015274313
            },
            {
                "lat": 66.6037074918825,
                "lng": 19.852251692462378
            },
            {
                "lat": 66.60114508914265,
                "lng": 19.857666278269594
            },
            {
                "lat": 66.60114555408663,
                "lng": 19.857797164638434
            },
            {
                "lat": 66.60115691572948,
                "lng": 19.85830542799015
            }
        ],
        "geoObjects": "[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.852284,66.603736]}},{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.857203,66.601105]}},{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.857431,66.6011]}},{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.857665,66.601098]}},{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.857906,66.601085]}},{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.858115,66.601073]}},{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.858318,66.601076]}},{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.858466,66.601085]}}]",
        "title": "Oplanerat fjärrvärmeavbrott",
        "text": "<p>Oplanerat fjärrvärmeavbrott på grund av <strong>explosion</strong> mellan Nyborgsgatan och Industrivägen.</p><br /><p>Vi kommer att ta tag i problemet omedelbart, Tack för er förståelse.</p>",
        "criticalStatus": true,
        "completed": false,
        "dateDelayUtc": "2026-09-01T12:10:00Z",
        "dateExpireUtc": "2026-09-03T17:00:00Z",
        "typeId": 1
    },
    {
        "id": 221260,
        "profileId": 5437,
        "profileName": "Jokkmokks Energi AB",
        "dateCreatedUtc": "2026-09-01T12:14:37Z",
        "smsGroupId": 3150343,
        "affectedAddressesCoordinates": [
            {
                "lat": 66.60115015682184,
                "lng": 19.85794019605276
            },
            {
                "lat": 66.601117462385,
                "lng": 19.858354171320446
            },
            {
                "lat": 66.60112328638749,
                "lng": 19.85727513526276
            },
            {
                "lat": 66.60115175639575,
                "lng": 19.858196015274313
            },
            {
                "lat": 66.6037074918825,
                "lng": 19.852251692462378
            },
            {
                "lat": 66.60114508914265,
                "lng": 19.857666278269594
            },
            {
                "lat": 66.60114555408663,
                "lng": 19.857797164638434
            },
            {
                "lat": 66.60115691572948,
                "lng": 19.85830542799015
            }
        ],
        "geoObjects": "[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.852284,66.603736]}},{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.857203,66.601105]}},{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.857431,66.6011]}},{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.857665,66.601098]}},{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.857906,66.601085]}},{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.858115,66.601073]}},{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.858318,66.601076]}},{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.858466,66.601085]}}]",
        "title": "Planerat fjärrvärmeavbrott",
        "text": "<p><strong>Torsdag 3 september Kl. 09:00-16:00</strong></p><br /><p>Planerat fjärrvärmeavbrott på grund av underhåll på kulverten på Nyborgsgatan och delar av Industrivägen samt närliggande fastigheter.</p><br /><p>På grund av underhållsarbete på kulverten kan ni tyvärr bli utan värme och varmvatten under ovan nämnd tid. Vi arbetar för att avbrottet ska bli så kort som möjligt.</p><p>Med vänlig hälsning</p><p>Jokkmokks Energi AB</p>",
        "criticalStatus": false,
        "completed": false,
        "dateDelayUtc": "2026-09-01T12:10:00Z",
        "dateExpireUtc": "2026-09-03T17:00:00Z",
        "typeId": 1
    },{
        "id": 221260,
        "profileId": 5437,
        "profileName": "Jokkmokks Energi AB",
        "dateCreatedUtc": "2026-09-01T12:14:37Z",
        "smsGroupId": 3150343,
        "affectedAddressesCoordinates": [
            {
                "lat": 66.60115015682184,
                "lng": 19.85794019605276
            },
            {
                "lat": 66.601117462385,
                "lng": 19.858354171320446
            },
            {
                "lat": 66.60112328638749,
                "lng": 19.85727513526276
            },
            {
                "lat": 66.60115175639575,
                "lng": 19.858196015274313
            },
            {
                "lat": 66.6037074918825,
                "lng": 19.852251692462378
            },
            {
                "lat": 66.60114508914265,
                "lng": 19.857666278269594
            },
            {
                "lat": 66.60114555408663,
                "lng": 19.857797164638434
            },
            {
                "lat": 66.60115691572948,
                "lng": 19.85830542799015
            }
        ],
        "geoObjects": "[{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.852284,66.603736]}},{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.857203,66.601105]}},{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.857431,66.6011]}},{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.857665,66.601098]}},{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.857906,66.601085]}},{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.858115,66.601073]}},{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.858318,66.601076]}},{\"type\":\"Feature\",\"properties\":{},\"geometry\":{\"type\":\"Point\",\"coordinates\":[19.858466,66.601085]}}]",
        "title": "Allmänfarlig verksamhet",
        "text": "<p><strong>Torsdag 1 april Kl. 09:00-16:00</strong> planerar vi att elda gamla strumpor, hästkadaver och asbest i samtliga pannor. Detta för att bli av med gamla strumpor, hästkadaver och asbest.</p><br /><p>Vi förstår om detta orsakar olägenhet för allmänheten men bryr oss ärligt talat inte. Medborgare uppmanas att stanna inne eller hålla andan. </p><br /><p>Vid frågor kontakta Kundtjänst på 0971-173 38</p><br /><p>Tack för er förståelse.</p><br />",
        "criticalStatus": false,
        "completed": false,
        "dateDelayUtc": "2026-09-01T12:10:00Z",
        "dateExpireUtc": "2026-09-03T17:00:00Z",
        "typeId": 1
    }
]

const testAlerts = async function () {
    await displayAlerts(testdata)
}