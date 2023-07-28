const LoadApi=async (name)=>{
const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
try{
  const res= await fetch(url);
const data= await res.json();
placedata(data.meals)
}
catch(error){
  console.log(Error)
}
console.log(url)
}

LoadApi('fish')
// rearch box to custom link
document.getElementById('searchBtn').addEventListener('click',()=>{
  const searchText = document.querySelector('#searchInput');
  const searchValue= searchText.value;
  searchText.setAttribute('placeholder', searchValue)
  LoadApi(searchValue)
  searchValue.innertext=''
})
//paccing card
const placedata=(cards)=>{
  const cardBox=document.getElementById('cardBox')
  cardBox.innerHTML=` `
  cards.forEach(food => {
    const div=document.createElement('div');
    div.classList.add('col')
    div.innerHTML= `
    <div height="220px" class="card d-flex flex-row align-items-center gap-3">
    <div class="cardImg">
        <img class="h-100 img-fluid" src="${food.strMealThumb}" alt="">
    </div>
    <div class="cardBody p-3 ">
        <h2 class="catHeadLine"> ${food.strMeal}</h2>
        <p class="card-tex">${food.strInstructions.slice(0,50)}</p>
        <a type="button" onclick="loadDitiels(${food.idMeal})" class="text-warning" data-bs-toggle="modal" data-bs-target="#staticBackdrop">View Detiels</a>
    </div>
</div>
    `
    //append the element in dom
    cardBox.appendChild(div)
  });
}
// didiels load
const loadDitiels=async(id)=>{
  const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
 fetch(url)
 .then(res=>res.json())
 .then(data=>placeDitiels(data.meals))
}

const placeDitiels= (foods)=>{
  foods.forEach(food=>{
console.log(food);
const title=document.getElementById('staticBackdropLabel');
title.innerText=`${food.strMeal}`
const modalBody=document.getElementById('modalBody');
modalBody.innerHTML=`
  <img class="h-25 w-100 img-fluid mb-3" src="${food.strMealThumb}" alt="">
<h4><b>Catagory</b> : <span class="text-secondary">${food.strCategory}</span></h4>
<h6>Area: <span class="text-secondary">${food.strArea}</span> </h6>
<p><b>Instruction : </b>  <span class="text-secondary">${food.strInstructions}</span> </p>
`
  })
}
document.getElementById('seeMoreBtn').addEventListener('click',()=>{
  const warningText=document.getElementById('warningText');
  warningText.style.display='block'
})