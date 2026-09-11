async function getStatus() {
  const url = "https:/jomiq.github.io/status.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

async function main() {
  document.querySelectorAll(".debug-button").forEach(el => el.remove())
  const footer_status = document.querySelector("#footer-status");
  const alert_menu_item = document.querySelector("#alert-menu-item");
  const alert_pos = document.querySelector("#alert-pos");

  footer_status.ariaBusy = true;
  alert_menu_item.ariaBusy = true;
  let status = await getStatus();
  await new Promise(r => setTimeout(r, 2000));
  footer_status.ariaBusy = false;
  alert_menu_item.ariaBusy = false;

  if (status["profilesWithWebmessages"][0]["hasCriticalMessages"]) {

    const text = status["profilesWithWebmessages"][0]["webMessages"][0];
    const last_update = "1948-01-02"
    let fulltext = ""
    status["profilesWithWebmessages"][0]["webMessages"].forEach((t) => {
      fulltext = fulltext + `<p>${t}</p>`
    });

    const alert_link_template = document.querySelector("#alert-link-template");
    const alert_link_clone = document.importNode(alert_link_template.content, true);
    alert_link_clone.id = "";
    alert_menu_item.appendChild(alert_link_clone);

    const alert_template = document.querySelector("#alert-template")
    const alert_clone = document.importNode(alert_template.content, true);
    alert_clone.querySelector("#messages").innerHTML = fulltext;

    alert_pos.replaceWith(alert_clone);
    footer_status.innerHTML = `${text} - ${last_update}`;
  } else {
    document.removeChild(alert_pos);
    footer_status.innerHTML = status["defaultTextNoMessages"]
  }
  
}