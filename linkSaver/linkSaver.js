const saveInput = document.getElementById("saveBtn");
const saveTab = document.getElementById("saveTabBtn");
const clearInput = document.getElementById("clearBtn");
const clearAll = document.getElementById("deleteBtn");
const input = document.getElementById("input");
const list = document.getElementById("ulElement");
let myLeads = [];
let localLeads = [];
var i = 0;

function render(out) {
  let li = document.createElement("li");
  li.innerHTML = `<a href= '${out}' target= '_blank' >  ${out}  </a>`;
  list.appendChild(li);
}

function sveIpt() {
  if (input.value !== "") {
    myLeads.push(input.value);
    localLeads.push(input.value);
    localStorage.setItem("myLeads", JSON.stringify(localLeads));
    render(input.value);
    input.value = "";
  }
}

function sveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(localLeads));
    render(tabs[0].url);
  });
}

function clrIpt() {
  input.value = "";
  list.removeChild(list.lastChild);
  myLeads.pop();
  localLeads.pop();
}

function clrAll() {
  list.innerHTML = "";
  myLeads = [];
  i = 0;
  input.value = "";
  localStorage.clear();
  localLeads = [];
}

input.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    sveIpt();
  }
});

saveInput.addEventListener("click", sveIpt);
saveTab.addEventListener("click", sveTab);
clearInput.addEventListener("click", clrIpt);
clearAll.addEventListener("dblclick", clrAll);

if (localStorage.getItem("myLeads") !== null) {
  localLeads = JSON.parse(localStorage.getItem("myLeads"));
  for (let i = 0; i < localLeads.length; i++) {
    render(localLeads[i]);
  }
}
