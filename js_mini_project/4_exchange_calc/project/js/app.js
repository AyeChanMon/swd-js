
let input = document.getElementById("input");
let from = document.getElementById("from");
let to = document.getElementById("to");
let result = document.getElementById("result");
let historyList = document.getElementById("historyList");
function createOption(x, y,z){
    let o = document.createElement("option");
    let t = document.createTextNode(y);
    o.setAttribute("value",removeComma(z));
    o.appendChild(t);
    x.appendChild(o);
}

function removeComma(x){
    return Number(x.replace(",",""));
}
for(let x in data.rates){
    createOption(from, x, data.rates[x]);
    createOption(to, x, data.rates[x]);
}

document.getElementById("calc").addEventListener("submit",function(e){
    e.preventDefault();
    //get state
    let x = input.value;
    let y = from.value;
    let z = to.value;
    console.log(x , y, z);

    //process
    let fromText = x+" "+from.options[from.selectedIndex].innerText;
    console.log(fromText);
    let toText = to.options[to.selectedIndex].innerText;
    console.log(toText);
    let first = x*y;
    console.log(first);
    let second = first/z;
    console.log(second); 
    let resultvalue = second.toFixed(2);
    console.log(resultvalue); 
    let date = new Date().toLocaleString();
    console.log(date);
    let arr = [date, fromText,toText,resultvalue]
    createTr(arr);
    store();
    result.innerHTML = resultvalue;
    input.value = "";
    input.focus();
    from.value="";
    to.value="1";
});

function createTr(x){
    let rowSpacer = document.getElementById("rowSpacer");
    if(rowSpacer){
        rowSpacer.remove();
    }
    let tr = document.createElement("tr");
    x.map(function(el){
        let td = document.createElement("td");
        let text = document.createTextNode(el);
        td.appendChild(text);
        tr.appendChild(td);
    });
    historyList.appendChild(tr);
}

function store(){
    localStorage.setItem("record",historyList.innerHTML);
}

(function(){
    if(localStorage.getItem("record")){
        historyList.innerHTML=localStorage.getItem("record");
    }else{
        historyList.innerHTML = `<tr><td colspan="4" id="rowSpacer">There is no Record</td></tr>`
    }
})();

function changeMode(){
    console.log("changeMode");
    document.body.classList.toggle("night-mode");
    document.getElementById("modeIcon").classList.toggle("fa-sun")
}