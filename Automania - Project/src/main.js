/*let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
}

let btnRentNow = document.querySelector('btn');

btnRentNow.addEventListener('click', () => {
    open(Test.html)
});

document.getElementById("vehicles").addEventListener("click", function(){
    window.location.href = "file:///C:/Users/Victor2900/Documents/Faculta/IP/Project/App%20View.html#vehicles";
  });*/

var x=document.getElementById('login');
var y=document.getElementById('register');
var z=document.getElementById('btn');
function register()
{
    x.style.left='-400px';
    y.style.left='50px';
    z.style.left='110px';
}
function login()
{
    x.style.left='50px';
    y.style.left='450px';
    z.style.left='0px';
}

var modal = document.getElementById('login-form');
window.onclick = function(event) 
{
    if (event.target == modal) 
    {
      modal.style.display = "none";
    }
}

//transfer data

/*const form = document.getElementById("form-container");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = document.getElementById("location").value;
    const pickupDate = document.getElementById("pickupDate").value;
    const returnDate = document.getElementById("returnDate").value;
    // store the data in localStorage
    localStorage.setItem("location", location);
    localStorage.setItem("pickupDate", pickupDate);
    localStorage.setItem("returnDate", returnDate);
    // redirect to the next page
    window.location.href = "Golf.html";
});

const location = localStorage.getItem("location");
    const pickupDate = localStorage.getItem("pickupDate");
    const returnDate = localStorage.getItem("returnDate");
    document.getElementById("location").innerHTML = location;
    document.getElementById("pickupDate").innerHTML = pickupDate;
    document.getElementById("returnDate").innerHTML = returnDate;
*/