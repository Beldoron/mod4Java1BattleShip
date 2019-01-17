


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

    })
};

fetch('http://localhost:8080/api/games')
.then(result => result.json())
.then(result => {
    console.log(result)
    tableArr = result
    console.log("test ohne")
    reloadHide()
    tryIt(tableArr)

 if(tableArr.Active_User.userName != null){
       reloadHide();
       myAuthentication();
     }

});


// <button onclick="reloadHide()">sdf</button>


fetch('http://localhost:8080/api/leader_board')
.then(result => result.json())
.then(result => {
    console.log(result)
    scores = result

    tryTwo(scores)



});



    //    if(scores.Active_User.userName != null){
    //    reloadHide();
     //   }
//console.log(scores.Active_User.userName)

//console.log("BOOOOOOB")

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

//function myName(element) {
//document.getElementById("`${element.Active_User.userName}`").innerHTML = element;
//}

function myAuthentication() {
  var x = document.getElementById("myAuthentication");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
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

//function logref (){
//var y = document.getElementById("myAuthentication");

//}

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





function tryIt (element){

    const test = element.games.map(el => `
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
 };


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





    const t = element.map (el =>
    `<tr>
             <td>${el.user_Name} </td
     <tr>
     `).join("")
     document.querySelector("#myTableTwo").innerHTML = t

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
  })*/