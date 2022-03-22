function sortNumbers(){
    let input = document.getElementById("textInput");
    let text = input.value;
    let array = text.split(" ");
    array.map((x) => parseInt(x));
    array.sort((a, b) => a - b)
    // array.forEach(function(entry) {
    //     console.log(entry);
    // });
    let table = document.getElementById("table")
    // for(let i = 0 ; i < array.length ; i++){
    //     console.log(array[i]);
    // }
    // console.log(array.length)
    for(let i = 0 ; i <= array.length/5 ; i++){
        table.insertRow(0);
    }
    // console.log(1/5)
    for(let i = 0 ; i < array.length ; i++){
        let index = Math.floor(i/5);
        let row = table.rows[index]
        let cell = row.insertCell(-1);
        // console.log("i: " + i)
        cell.innerHTML = array[i];
    }
}