function sortNumbers(){
    let input = document.getElementById("textInput");
    let text = input.value;
    
    text = text.trim().replace(/\s+/g, " ")
    let array = text.split(" ");
    array.map((x) => parseInt(x));
    array.sort((a, b) => a - b)
    
    let table = document.getElementById("table")
    for(let i = 0 ; i <= array.length/5 ; i++){
        table.insertRow(0);
    }
    
    for(let i = 0 ; i < array.length ; i++){
        let index = Math.floor(i/5);
        let row = table.rows[index]
        let cell = row.insertCell(-1);
        cell.innerHTML = array[i];
    }
}