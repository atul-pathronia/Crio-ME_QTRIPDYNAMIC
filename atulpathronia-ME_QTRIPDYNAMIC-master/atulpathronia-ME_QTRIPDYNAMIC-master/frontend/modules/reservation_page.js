import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

  try {
    const res = await fetch(config.backendEndpoint + "/reservations")
    const reservation = await res.json()
    return reservation  
  } catch (error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
    
  if (reservations.length > 0) {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  } else {
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none"; }

    reservations.map((key, idx) => {

      let ele = document.createElement("tr");
      const options = {day: 'numeric', year: 'numeric', month: 'long' };
      let dateString = new Date(key.time).toLocaleDateString("en-IN",options)
      let timeString = new Date(key.time).toLocaleTimeString("en-IN")
    
      ele.innerHTML = `
            <th scope="row" >${key.id}</th>
            <td>${key.name}</td>
            <td>${key.adventureName}</td>
            <td>${key.person}</td>
            <td>${new Date(key.date).toLocaleDateString("en-IN")}</td>
             <td>${key.price}</td>
             <td>${dateString}, ${timeString}</td>
             <td><div class="reservation-visit-button" id=${
               key.id
             }><a href="../detail/?adventure=${
        key.adventure
      }">Visit Adventure</a></div></td>
  
            `;
  
            document.getElementById("reservation-table").appendChild(ele);
  

})}

export { fetchReservations, addReservationToTable }
