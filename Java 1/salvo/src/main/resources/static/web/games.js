
console.log("Fuba");

let tableArr = []
let scores = []



function fetching () {
fetch('http://localhost:8080/api/games')
.then(result => result.json())
.then(result => {
    console.log(result)
    tableArr = result
    console.log("test")
    reloadHide()
    tryIt(tableArr)
    help(tableArr)
    theTest(tableArr)
    console.log("ONE")



    })
};

fetch('http://localhost:8080/api/games')
.then(result => result.json())
.then(result => {
    console.log(result)
    tableArr = result
    reloadHide()

    console.log("test ohne")
    tryIt(tableArr)
    console.log("test ohne")


    console.log(tableArr.Active_User.userName)
 if(tableArr.Active_User.userName != null){

       reloadHide();
       myAuthentication();
     }
    help(tableArr)

    theTest(tableArr)
    console.log("ONE")


});

/*

theTestTwo();
    console.log("TWO")
       theTestTwo();
       console.log("TWO")
    */

function help(el) {
    if(el.Active_User.userName != null) {
        document.querySelector("#active_name").innerHTML = el.Active_User.userName
        } else console.log("München")
}

fetch('http://localhost:8080/api/leader_board')
.then(result => result.json())
.then(result => {
    console.log(result)
    scores = result
    tryTwo(scores)
});


function login() {

  var pw = document.getElementById("password").value;
  var mail = document.getElementById("email").value;
  console.log(mail)
  console.log(pw)

  fetch('http://localhost:8080/api/login', {
       credentials:'include',
      headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      body: `email=${mail}&password=${pw}`
    }).then(res => {
        console.log(res);
        if(res.ok) {
            return;
        }
        throw Error("big error");
    }).then(json => {
        fetching()
        console.log(json);
        myAuthentication();
        myName(mail);
    }).catch(err => {
        console.log(err);
    })

}


function myAuthentication() {
  var x = document.getElementById("myAuthentication");
  var y = document.getElementById("createGame");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "block";
  } else {
    x.style.display = "none";
    y.style.display = "none";
  }
}

function reloadHide() {
  var x = document.getElementById("logs");
 
  if (x.style.display === "none") {
    
    x.style.display = "block";
  } else {
    
    x.style.display = "none";
  }
}



function reload() {
    location.reload();
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
        location.reload();
        return result.json()})
      .then(result => {
      console.log(result)

    })
}

function register () {
  var pw = document.getElementById("password").value;
  var mail = document.getElementById("email").value;
  fetch('http://localhost:8080/api/players', {
       credentials:'include',
      headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      body: `email=${mail}&password=${pw}`
    }).then(result =>  {
        console.log(result)
        login();
        return result.json()})

}

function newGame () {

    fetch('http://localhost:8080/api/games', {
         credentials:'include',
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST'
      }).then(result =>  {
          if (result.ok) {
              return result.json()
          } 
          throw Error("big error");
      }).then(res => {
          console.log(res)
          location.replace(`http://localhost:8080/web/game.html?gp=${res.gpid}`)
      }).catch(err => console.log(err))
}

function joinGame (gameId) {

    fetch(`http://localhost:8080/api/game/${gameId}/players`, {
         credentials:'include',
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST'
      }).then(result =>  {
          if (result.ok) {
              return result.json()
          } 
          throw Error("big error");
      }).then(res => {
          console.log(gameId)
          location.replace(`http://localhost:8080/web/game.html?gp=${res.gpid}`)
      }).catch(err => console.log(err))
}

//   function  date () {
//       let time = new Date(); 
//       time.getTime(); 
//       return time;
//   }

function rejoin(element) {
    window.location.assign(`http://localhost:8080/web/game.html?gp=${element}`);
    }




function theTest(element) {

    console.log(element.games.length)
    console.log(element.Active_User.playerId)
    let a = document.getElementsByClassName(element.Active_User.playerId)[0]
    console.log(element.games[2].gameplayer.length)



    if(element.Active_User){
        element.games.forEach((game, i) => {            
            if(game.gameplayer.some(gp => gp.player.id === element.Active_User.playerId)){

                function dude () {
                    for(i = 0 ; i < game.gameplayer.length; i++) {
                        if (game.gameplayer[i].player.email === element.Active_User.userName) {
                        let gp = game.gameplayer[i].player.gpid;   
                        return gp;
                        }
                    }
                }
       
                console.log("rejoin " + i)
                document.querySelector(`.game${i+1}`).classList.add("rejoin")
                console.log(document.querySelector(`.game${i+1}`))
                document.querySelector(`.game${i+1}`).innerHTML = `<button class="w3-button w3-container w3-cell w3-light-green w3-round-large" onclick="rejoin(${dude()})">rejoin</button>`
                

            } else if(game.gameplayer.length === 2){
                console.log("none" + i)
                document.querySelector(`.game${i+1}`).classList.add("none")
                console.log(document.querySelector(`.game${i+1}`))
            } else {
                console.log("join " + i)
                document.querySelector(`.game${i+1}`).classList.add("join")
                console.log(document.querySelector(`.game${i+1}`))
                document.querySelector(`.game${i+1}`).innerHTML = `<button class="w3-button w3-container w3-cell w3-light-green w3-round-large" onclick="joinGame(${game.id})">join</button>`
            }
            
            /* game.gameplayer.forEach((gp, n) => {

                if(gp.player.email === element.Active_User.userName){

                    console.log(game.id)
                    console.log("rejoin " + game.id)
                    console.log('Element ' + i + ' is ' + game.id)
                    console.log(document.getElementsByClassName(element.Active_User.playerId)[i])

                } else {
                    console.log("not logged in gp")

                    if(game.gameplayer.length === 2){
                        console.log("nope " + game.id)

                    }

                    if(game.gameplayer.length === 1){
                        console.log("join " + game.id)
                        console.log('Element ' + i + ' is ' + game.id)
                        console.log(document.getElementsByClassName(element.Active_User.playerId)[i])
                    }

                }
            }) */
        })
    }


/*    for (i = 0; i < element.games.length; i++) {
        for (n = 0; n < element.games[i].gameplayer.length; n++){

        console.log(`length ${element.games[i].gameplayer.length}`)

            if (element.games[i].gameplayer[n].player.email == element.Active_User.userName) {

                console.log("user match")
                console.log(element.games[i].gameplayer.length)

                if(element.games[i].gameplayer.length == 2) {
                document.getElementsByClassName(element.Active_User.playerId)[i].classList.add("rejoin")
                } else if (element.games[i].gameplayer.length == 1) {
                document.getElementsByClassName(element.Active_User.playerId)[i].classList.add("join")
                } else { document.getElementsByClassName(element.Active_User.playerId)[i].classList.add("nope")
                }
            }
        }
    };*/


}


/*
        if ((element.userName == document.getElementsByClassName(element.Active_User.userName)[i]) && (element.games[i].gameplayer.length >= 2)) {
            document.getElementsByClassName(element.Active_User.userName)[i].classList.add("rejoin")
        } else if ((element.userName == document.getElementsByClassName(element.Active_User.userName)[i]) && (element.games[i].gameplayer.length <= 1)){
            document.getElementsByClassName(element.Active_User.userName)[i].classList.add("join")
        } else {
        console.log("Problem")
        }
        document.getElementsByClassName("join")[n].innerHTML = '<button class="w3-button w3-container w3-cell w3-light-green w3-round-large" onclick="fuck()">join</button>'
*/


/*
function theTestTwo() {

console.log("dudetest")





}
*/



/*
function joiningButtons () {
    for(x = 0; element.games.length; x ++) {
    document.getElementsByClassName(element.Active_User.userName)[x].innerHTML = "test"


element.Active_User != null
el.games[i].gameplayer.length = 2

}

}
*/

/*
function joining (element) {
    if (element.Active_User != null && element.Active_User)

}
*/

function tryIt (element){
console.log("DerDA")
  console.log(element.games[0].gameplayer[1].player.email)
  //for(b = 0; 0 < 2; b++) {

    const test = element.games.map(el =>  `

              <tr>
                    <td>Game:</td>
                    <td>${el.id}</td>
                    <td>${el.crationDate}</td>
                    <td>Finished:</td>
                    <td>NO</td>
                    <td> Player: </td>
                    <td>${el.gameplayer.map(fuba => fuba.player.email).join(" | ") }</td>
                    <td class="game${el.id}"></td>
                </tr>
                `).join("")


    document.querySelector("#myTable").innerHTML = test
    console.log("man")
 };

/* <td class="${el.gameplayer.map(fuba => fuba.player.id).join(" and ") }"></td> */






// <td>${el.gameplayer[1].player.email}</td>


 function tryTwo (element) {

 const t = element.map (el =>


     `

     <tr>
              <td>${el.user_Name} </td>
              <td>${el.wins + el.tide + el.lost}</td>
              <td>${el.wins} </td>
              <td>${el.tide} </td>
              <td>${el.lost} </td>
      <tr>
      `).join("")
      document.querySelector("#myTableTwo").innerHTML = t


 }



     //    if(scores.Active_User.userName != null){
     //    reloadHide();
      //   }
 //console.log(scores.Active_User.userName)

 //console.log("BOOOOOOB")
/*
function tryTwo (element) {

    console.log(element[0].scores)
    console.log(element[0].scores[1].playersScores)
        let won = 0;
        let tied = 0;
        let lost = 0;

        let `${element[i].user_Name}`


    for (var i = 0; i < element.length; i++) {


        for (var n = 0; n < element[i].scores.length; n++) {
            if (element[i].scores[n].playersScores == 1) {
                won += 1;
            } else if ( element[i].scores[n].playersScores == 0.5) {
                tied += 1;
            } else{
                lost +=1;
            }



        }
        //let forEachPlayer = `${element[i].user_Name} won ` + won + " times"
        //console.log(forEachPlayer)

    }

  console.log(won)
  console.log(lost)
  console.log(tied)

//console.log(element)



//function myName(element) {
//document.getElementById("`${element.Active_User.userName}`").innerHTML = element;
//}


    const t = element.map (el =>
    `<tr>
             <td>${el.user_Name} </td
     <tr>
     `).join("")
     document.querySelector("#myTableTwo").innerHTML = t

}



*/


/*
for(x = 0; 0 < element.games.length; i++) {
    element.games[x].gameplayer[0].player.email

}

//el.gameplayer.map(fuba => fuba.player.email)


function resting (element) {

for(let i = 0; i < ele.games.length; i++){


}
*/





/*console.log("testOne")
console.log(tableArr);
console.log(tableArr.length)

var arr = [
    { key: 'foo', val: 'bar' },
    { key: 'hello', val: 'world' }
];

var result = arr.reduce(function(map, obj) {
    map[obj.key] = obj.val;
    return map;
}, {});

console.log(result);
// { foo: 'bar', hello: 'world' }*/


/*function bla () {
//create a Table Object
let table = document.createElement('table');

//iterate over every array(row) within tableArr
for (let row of tableArr) {

//Insert a new row element into the table element
  table.insertRow();

//Iterate over every index(cell) in each array(row)
  for (let cell of row) {

//While iterating over the index(cell)
//insert a cell into the table element
    let newCell = table.rows[table.rows.length - 1].insertCell();

//add text to the created cell element
    newCell.textContent = cell;
  }
}

//append the compiled table to the DOM
document.body.appendChild(table);
}*/




//function logref (){
//var y = document.getElementById("myAuthentication");

//}





/*

function makeTableHTML (array) {
    console.log(array)
    var table = document.createElement('table');
    for (var i = 0; i < array.length; i++) {
    console.log(array[i])
        var row = document.createElement('tr');
        for (var j = 0; j < array.length; j++) {
            console.log(array[i].id)
            var cell = document.createElement('td');
            cell.textContent = array[i].id;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    return table;
}

*/




/*
function makeTableHTML(x) {
    var result = document.createElement("<table border=1>");
   // var result = "<table border=1>";
    for(var i=0; i<x.length; i++) {
        result += "<tr>";
        for(var j=0; j<x[i].length; j++){
            result += "<td>"+x[i][j]+"</td>";
        }
        result += "</tr>";
    }
    result += "</table>";

    //return result;
    document.body.appendChild(table);
}
*/


/*fetch('http://localhost:8080/api/games')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  })*/// console.log(tableArr)
    /*

      console.log(mail)
      console.log(pw)

      fetch('http://localhost:8080/api/login', {
           credentials:'include',
          headers: {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
          },
          method: 'POST',
          body: `email=${mail}&password=${pw}`
        }).then(res => {
            console.log(res);

            if(res.ok) {

                return;
            }
            throw Error("big error");
        }).then(json => {
            fetching()
            console.log(json);
            document.getElementById("logs").style.display = "none";
            myAuthentication();
            myName(mail);

        }).catch(err => {
            console.log(err);
        })
    */
  // <button onclick="reloadHide()">sdf</button>

  /*
      for(n = 0; 0 < element.games.length; n++) {
          console.log(element.games[n].gameplayer.length + "DUDEEEEE")
          if (element.games[n].gameplayer.length == 1) {
              console.log(element.games[n].gameplayer.length)
              //for(n = 0; 0 < element.games[i].gameplayer.length; n++) {
              document.getElementsByClassName("join")[n].innerHTML = '<button class="w3-button w3-container w3-cell w3-light-green w3-round-large" onclick="fuck()">join</button>'
              console.log("jaiks")
              //}
          } else if (element.games[n].gameplayer.length == 2) {
              console.log("bob1")
              //for(b = 0; 0 < element.games[i].gameplayer.length; b++) {
              console.log("bob2.3")
              document.getElementsByClassName("rejoin")[n].innerHTML = '<button class="w3-button w3-container w3-cell w3-light-green w3-round-large" onclick="fuck()">rejoin</button>'
              //document.getElementsByClassName("join")[i].innerHTML = '<button class="w3-button w3-container w3-cell w3-light-green w3-round-large" onclick="duck()">join</button>'
              console.log("bob2222222222222222222222")
              //}
          } else console.log("hm");
       }
  */


/*

if(element.Active_User){

        for(i = 0; i < element.games.length; i++){

            for (n = 0; n < element.games[i].gameplayer.length; n++) {

               if(gp.player.email === element.Active_User.userName){

                    console.log(game.id)
                    console.log("rejoin " + game.id)
                    document.getElementsByClassName(element.Active_User.playerId)[i].classList.add("rejoin")


                } else {
                    console.log("not logged in gp")

                    if(game.gameplayer.length === 2){
                        console.log("nope " + game.id)

                    }



                    if(game.gameplayer.length === 1){
                        console.log("join " + game.id)
                        document.getElementsByClassName(element.Active_User.playerId)[i].classList.add("join")
                    }

                }
            }
         }
    }

    */