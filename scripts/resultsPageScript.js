const userAnswers = JSON.parse(sessionStorage.getItem("userAnswers"));
const resImgs = Array.from(document.getElementsByClassName("results-img"))
const wulkanyInfo = document.querySelector(".wulkany-info")
const swietokrzyskiInfo = document.querySelector(".swietokrzyski-info")
const lukMuzakowaInfo = document.querySelector(".luk-muzakowa-info")
const infoArr = [wulkanyInfo, swietokrzyskiInfo, lukMuzakowaInfo]
const gobackBtn = document.querySelector(".goback-btn-js")

let properIndex;
const resultObject = {
    parks: ["Krajowy Geopark Kraina Wygasłych Wulkanów", "Światowy Geopark UNESCO Geopark Świętokrzyski", "Światowy Geopark UNESCO Łuk Mużakowa"],
    hrefs: ["https://www.gorykaczawskie.pl/", "https://geopark.pl/", "https://www.luk-muzakowa.pl/"],
    pics: ["kamieniolom_bazaltu.jpg", "kadzielnia.jpeg", "park_glazow_narzutowych.JPG"],
}
        
const getMostFrequent = arr =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];


for(let i=0; i<resultObject.parks.length;i++){
    if(resultObject.parks[i] === getMostFrequent(userAnswers)){
        properIndex = i;
        infoArr[i].style.display = "block"
        resImgs[i].src = `static/img/${resultObject.pics[i]}`
        break;
    }
}

gobackBtn.addEventListener("click", ()=>{
  window.location.href = "./index.html"
})

