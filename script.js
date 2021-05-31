function baslangic(){

const sehirInput=document.querySelector('.sehirInput');
const searchButton=document.querySelector('.searchButton');
const cardBody=document.querySelector('.cardBody');
const cardHeader=document.querySelector('.cardHeader');

searchButton.addEventListener('click',button)

function button(e)
{
    const sehir=sehirInput.value;
    const KEY=String('fcf6791a3199b5c76d56467f48d215da');
    const url= `http://api.openweathermap.org/data/2.5/weather?q=${sehir}&appid=${KEY}`

    fetch(url).then(response =>{response.json().then(json=>{
        let data=json;
        let veri = formatResponse(data);
        cardBody.innerHTML=veri;
    })})    
console.log(url)

}

function formatResponse(data)
{
    let kosul='';
    let durum=data.weather[0].main;
   
    if(data.weather.length>1)
    {
        for(let i=0;i<data.weather.length;i++)
        {
            kosul+=data.weather[i].main;
            if(i!=(data.weather.length-1))
            {
                kosul+=' ve ';
            }
        }
    }
    else
    {
        kosul+=data.weather[0].main;
    }
    switch(true)
    {
        case durum=='Clear':durum='Temiz';break;
        case durum=='Clouds':durum='Bulutlu';break;
        case durum=='Rain': durum='Yağışlı';break;
        case durum=='Snow': durum='Karlı';break;
        case durum=='Mist': durum='Sisli'; break;
        default:durum=durum;
    }
    console.log(durum)
    let cikis=
    `
        <h3><strong> ${data.name} için mevcut durum</strong></h3>
        <p><strong> Sıcaklık : ${Math.round((data.main.temp)-273.15)} C </strong></p>
        <p><strong> Nem :</strong> ${data.main.humidity}% </p>
        <p><strong> Basınç :</strong> ${data.main.pressure}mb</p>
        <p><strong> Rüzgar :</strong> ${data.wind.deg} derece ${(Math.floor(data.wind.speed))*2.237} MPH</p>
        <u>${durum}</u>
     `
     switch(true)
     {
         case durum=='Temiz':cardHeader.innerHTML='<img src="img/sun.png" alt="">';break;
         case durum=='Bulutlu':cardHeader.innerHTML='<img src="img/cloud.png" alt="">';break;
         case durum=='Yağışlı':cardHeader.innerHTML='<img src="img/rain.png" alt="">';break;
         case durum=='Karlı':cardHeader.innerHTML='<img src="img/snow.png" alt="">';break;
         case durum=='Sisli':cardHeader.innerHTML='<img src="img/mist.png" alt="">';break;
     }
    return(cikis);
}

}