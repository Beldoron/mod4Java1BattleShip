


console.log("Fuba");


let tableArr = []
let scores = []

fetch('http://localhost:8080/api/games')
.then(result => result.json())
.then(result => {
    console.log(result)
    tableArr = result

    tryIt(tableArr)
});

fetch('http://localhost:8080/api/leader_board')
.then(result => result.json())
.then(result => {
    console.log(result)
    scores = result

    tryTwo(scores)


});


function tryIt (element){

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