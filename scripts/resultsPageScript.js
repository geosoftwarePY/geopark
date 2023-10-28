const userAnswers = JSON.parse(sessionStorage.getItem("userAnswers"));
const resImgs = Array.from(document.getElementsByClassName("results-img"))
const wulkanyInfo = document.querySelector(".wulkany-info")
const swietokrzyskiInfo = document.querySelector(".swietokrzyski-info")
const lukMuzakowaInfo = document.querySelector(".luk-muzakowa-info")
const infoArr = [wulkanyInfo, swietokrzyskiInfo, lukMuzakowaInfo]
const gobackBtn = document.querySelector(".goback-btn-js")

const resultObject = {
    parks: ["Krajowy Geopark Kraina Wygasłych Wulkanów", "Światowy Geopark UNESCO Geopark Świętokrzyski", "Światowy Geopark UNESCO Łuk Mużakowa"],
    hrefs: ["https://www.gorykaczawskie.pl/", "https://geopark.pl/", "https://www.luk-muzakowa.pl/"],
    pics: ["kamieniolom_bazaltu.jpg", "kadzielnia.jpeg", "park_glazow_narzutowych.JPG"],
}
        
// const getMostFrequent = arr =>
//   Object.entries(
//     arr.reduce((a, v) => {
//       a[v] = a[v] ? a[v] + 1 : 1;
//       return a;
//     }, {})
//   ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

const getMostFrequent = (arr) =>{
  
  let wulkany=0;
  let swietokrzyski=0;
  let muzakow=0;

  for(let i=0; i<arr.length; i++){

    if(arr[i] === "Krajowy Geopark Kraina Wygasłych Wulkanów"){
      wulkany++;
    } else if(arr[i] === "Światowy Geopark UNESCO Geopark Świętokrzyski"){
      swietokrzyski++;
    } else {
      muzakow++;
    }
  }

  let valArr = [wulkany, swietokrzyski, muzakow]
  let maxVal = Math.max(...valArr)

  if(swietokrzyski===wulkany && swietokrzyski===maxVal && wulkany===maxVal){
    console.log("cond 1")
    return "Krajowy Geopark Kraina Wygasłych Wulkanów"

  } else if(muzakow===wulkany && muzakow===maxVal && wulkany===maxVal){
    console.log("cond 2")
    return "Krajowy Geopark Kraina Wygasłych Wulkanów"

  } else if(swietokrzyski===muzakow && muzakow===maxVal && swietokrzyski===maxVal){
    console.log("cond 3")
    return "Światowy Geopark UNESCO Geopark Świętokrzyski"

  } else{
    console.log("cond 4")
    return arr.sort((a,b) =>
      arr.filter(v => v===a).length
    - arr.filter(v => v===b).length
    ).pop();
  }
}

window.onload = (event) => {

  if(userAnswers===undefined){
    window.location.href = "./index.html"
  }
  
  const parkName = getMostFrequent(userAnswers)

  for(let i=0; i<resultObject.parks.length;i++){
      if(resultObject.parks[i] === parkName){
          infoArr[i].style.display = "block"
          resImgs[i].src = `static/img/${resultObject.pics[i]}`
          break;
      }
  }

  gobackBtn.addEventListener("click", ()=>{
    window.location.href = "./index.html"
  })

}



