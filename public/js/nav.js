import { auth, logoutUser } from "./firebase.js";

let ul = document.querySelector(".links-container");
auth.onAuthStateChanged((user)=>{
    if(user){
        ul.innerHTML +=`
        <li class="link-item"><a href="/admin" class="link">Dashboard</a></li>
        <li class="link-item"><a href="#" id="logoutLink" class="link">Logout</a></li>
        ` 
        document.getElementById("logoutLink").addEventListener("click", logoutUser);

    }else{
        ul.innerHTML+= `
        <li class="link-item"><a href="/admin" class="link">Login</a></li>
        `
    }
})