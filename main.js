async function getStatus() {
  const url = "/status.json";
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

    
  } else {
    document.removeChild(alert_pos);
    footer_status.innerHTML = status["defaultTextNoMessages"]
  }
  
}