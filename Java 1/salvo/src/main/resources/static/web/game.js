

console.log("fuba")

let data = []
let id = null;
let url = 'http://localhost:8080/api/game_view/';


const urlParams = window.location.href.split("=")
const final = url + urlParams[1];
//console.log(final);
//console.log(urlParams[1]);
document.getElementById("tableOne").id = `table${urlParams[1]}`
createTable(`table${urlParams[1]}`);

createTableTwo("tableTwo");
//console.log(`table${urlParams[1]}`);
console.log("idchanged");

fetch(final)
.then(result => result.json())
.then(result => {
    console.log(result)
    data = result
    console.log(data.ships[0].ship_location)
    insertShips(data.ships);
    insertSalvosOpponents(data.salvoesOpponents);
    insertSalvos(data.salvoes);
    parseNames(data)


})
fetching();

function fetching () {
fetch('http://localhost:8080/api/games')
.then(result => result.json())
.then(result => {
    console.log(result)
    userInfo = result
    myLogin(userInfo);

});
}

function logout() {

  fetch('http://localhost:8080/api/logout', {
       credentials:'include',
      headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      body: ""
    }).then(result =>  {
        console.log(result)
        window.location.assign("http://localhost:8080/web/games.html");

        return})
}

function back() {
window.location.assign("http://localhost:8080/web/games.html");
}







function myLogin(element){
document.getElementById('myLogin').innerHTML = element.Active_User.userName;
}

function reload() {
location.reload();
}


function parseNames(data) {

console.log(data);
//var obj = JSON.parse(data);
console.log(data.gameplayers[0].player.User_name)
console.log(data.gameplayers[1].player.User_name)

document.getElementById("you").innerHTML = data.gameplayers[0].player.User_name ;  // + data.gameplayers.player.User_name  ;
document.getElementById("theother").innerHTML = data.gameplayers[1].player.User_name ;

}

function createTable(tableId) {

            let rows = [" ", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
            let columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
            let table = document.getElementById(tableId);
            let tablehead = document.createElement("thead");
            let tablebody = document.createElement("tbody");

            let rowF = " ";
            let shipCol = "";



            if (table == document.getElementById(`table${urlParams[1]}`)) {
            console.log("tableCreated")

                for (let i = 0; i < rows.length; i++) {

                    rowF += `
                                <th>${rows[i]}</th>
                            `
                }

                table.appendChild(tablehead).innerHTML = rowF;

                for (let c = 0; c < columns.length; c++) {

                    shipCol += `<tr >
                            <td>${columns[c]}</td>
                            <td class="${columns[c]}1" ></td>
                            <td class="${columns[c]}2"></td>
                            <td class="${columns[c]}3"></td>
                            <td class="${columns[c]}4"></td>
                            <td class="${columns[c]}5"></td>
                            <td class="${columns[c]}6"></td>
                            <td class="${columns[c]}7"></td>
                            <td class="${columns[c]}8"></td>
                            <td class="${columns[c]}9"></td>
                            <td class="${columns[c]}10"></td>
                        </tr>`
                }
                table.appendChild(tablebody).innerHTML = shipCol;

            }
}

console.log(urlParams[1]);




function insertShips(ships) {

    console.log(ships[0].ship_location.length + " test0")
    console.log(ships[1].ship_location[0]) //A1
    console.log(ships[1].ship_location[1]) //A2
    console.log(ships[1].ship_location[2]) //A3
    console.log(ships.length + " test 1")



    for (let i = 0; i < ships.length; i++) { //2
         for (let n = 0; n < ships[i].ship_location.length; n++) { //3
                 document.getElementsByClassName(ships[i].ship_location[n])[0].classList.add("blue")
         }
    }
}

function createTableTwo(tableId) {

            let rows = [" ", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
            let columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
            let table = document.getElementById(tableId);
            let tablehead = document.createElement("thead");
            let tablebody = document.createElement("tbody");

            let rowF = " ";
            let shipCol = "";



            if (table == document.getElementById("tableTwo")) {
            console.log("tableCreated")

                for (let i = 0; i < rows.length; i++) {

                    rowF += `
                                <th>${rows[i]}</th>
                            `
                }

                table.appendChild(tablehead).innerHTML = rowF;

                for (let c = 0; c < columns.length; c++) {

                    shipCol += `<tr >
                            <td>${columns[c]}</td>
                            <td class="S${columns[c]}1" ></td>
                            <td class="S${columns[c]}2"></td>
                            <td class="S${columns[c]}3"></td>
                            <td class="S${columns[c]}4"></td>
                            <td class="S${columns[c]}5"></td>
                            <td class="S${columns[c]}6"></td>
                            <td class="S${columns[c]}7"></td>
                            <td class="S${columns[c]}8"></td>
                            <td class="S${columns[c]}9"></td>
                            <td class="S${columns[c]}10"></td>
                        </tr>`
                }
                table.appendChild(tablebody).innerHTML = shipCol;

            }
}

console.log(urlParams[1]);




function insertSalvosOpponents(salvoesOpponents) {

    for (let i = 0; i < salvoesOpponents.length; i++) {
                 document.getElementsByClassName(salvoesOpponents[i].salvo_location)[0].classList.add("red")

    }
}

function insertSalvos(salvoes) {

    for (let i = 0; i < salvoes.length; i++) {
                 document.getElementsByClassName("S" + salvoes[i].salvo_location)[0].classList.add("green")

    }
}




/*
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('myParam');


function initial() {
            let url = new URLSearchParams(window.location.search);
            var id = url.get('gp');
            this.gamePlayerId = id;
            setInterval(() => {
                fetch(`../api/game_view/${id}`)
                    .then(response => response.json())
                    .then(json => {
                        this.gameData = json;
                        this.turnsData = json.turnsHistory;
this.state = json.gameState.gamesState;

*/

/*
function buildTable (element){
    let head = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let body = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]


   const tab =  for (i=0; i < head.length; i++ ){
                    `<td>head[i]</td>`
                }

     document.querySelector("#myTableTwo").innerHTML = tab
 };


buildTable();

*/
/*

function test (element){



    const test = element.map(el => `
                <tr>
                    <td>${el.[i]} </td>
                </tr>
                `).join("")

    document.querySelector("#myTable").innerHTML = test
 };

 test()

}
*/

/*
function testTwo (element) {

    let head = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let body = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

    for (i=0; i < head.length; i++){
            append.head[i]



    }
*/






/*
    const test = element.map(el => `
                <tr>
                    <td> the game </td>
                    <td>${el.crationDate}</td>
                    <td> is played by </td>
                    <td>${el.gameplayer.map(fuba =>
                            fuba.player.email
                            )}</td>

                </tr>
                `).join("")

    document.querySelector("#myTable").innerHTML = test


function buildPlayerTable(tableId) {
                let table = document.getElementById(tableId);
                let tHead = document.createElement("thead");
                let tBody = document.createElement("tbody");
                let tem1 = '';
                let tem2 = '';
                let header = ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ""];
                let body = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", ""]

                for (let i = 0; i < header.length - 1; i++) {
                    tem1 += `<td>${header[i]}</td>`
                    if (i > 0) {
                        tem2 += `<tr><td>${body[i]}</td>`
                        for (let j = 1; j < body.length - 1; j++) {
                            let cell = `${body[i]+header[j]}`
                            // tem2 += `<td class="${cell}"><div class="ds"/></td>`
                        }
                        tem2 += `<td>${body[i]}</td></tr>`
                    }
                }
                tem2 += `<tr>`;
                for (let k = 0; k < header.length; k++) {
                    tem2 += `<td>${header[k]}</td>`
                }
                tem2 += `</tr>`
                tem1 += `<td/>`
                tHead.innerHTML = tem1;
                tBody.innerHTML = tem2;
                table.append(tHead, tBody);
}

*/



