const API_URL = "PUT_YOUR_SCRIPT_URL_HERE";

async function loadSheets(){
  const res = await fetch(API_URL + "?action=getSheets");
  const sheets = await res.json();
  const select = document.getElementById("sheetSelect");
  sheets.forEach(s=>{
    select.innerHTML += `<option>${s}</option>`;
  });
}

async function loadData(sheet){
  const res = await fetch(API_URL + "?action=getData&sheet="+sheet);
  const data = await res.json();

  let totalSales=0,totalAds=0,totalImp=0,totalUnit=0;
  let brandSales={};

  data.slice(1).forEach(row=>{
    totalSales+=Number(row[5]);
    totalAds+=Number(row[12]);
    totalImp+=Number(row[11]);
    totalUnit+=Number(row[9]);

    brandSales[row[4]]=(brandSales[row[4]]||0)+Number(row[5]);
  });

  document.getElementById("totalSales").innerText="฿"+totalSales.toLocaleString();
  document.getElementById("totalAds").innerText="฿"+totalAds.toLocaleString();
  document.getElementById("totalImp").innerText=totalImp.toLocaleString();
  document.getElementById("totalUnit").innerText=totalUnit.toLocaleString();

  const ranking = Object.entries(brandSales).sort((a,b)=>b[1]-a[1]);
  const list = document.getElementById("rankingList");
  list.innerHTML="";
  ranking.forEach(r=>{
    list.innerHTML+=`<li class="list-group-item">${r[0]} - ฿${r[1].toLocaleString()}</li>`;
  });

}

if(document.getElementById("sheetSelect")){
  loadSheets();
  document.getElementById("sheetSelect").addEventListener("change",e=>{
    loadData(e.target.value);
  });
}
