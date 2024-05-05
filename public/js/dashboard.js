import { db, auth } from "./firebase.js";
let ui = new firebaseui.auth.AuthUI(auth);
let login = document.querySelector(".login");
const blogSection = document.querySelector(".blogs-section");

auth.onAuthStateChanged((user) => {
    if(user){
        login.style.display = "none";
        getUserWrittenBlogs();
    }else{
        setupLoginButton();
    }
});

const setupLoginButton = ()=>{
    ui.start("#loginUI",{
        callbacks:{
            signInSuccessWithAuthResult: function(authResult, redirectURL){
                // login.style.display = "none";
                getUserWrittenBlogs();
                return false;
            }
        },
        signInFlow: "popup",
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    });
}

// fetch user written blogs

const getUserWrittenBlogs = () =>{
    db.collection("blogs").where("author", "==", auth.currentUser.email.split("@")[0])
    .get()
    .then((blogs)=>{
        blogs.forEach((blog)=>{
            createBlog(blog);
        })
    })
    .catch((error)=>{
        console.log("Error getting blogs");
    })
}

const createBlog = (blog) => {
    const data = blog.data();
    const blogCard = document.createElement('div');
    blogCard.classList.add('blog-card');
    blogCard.innerHTML = `
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${blog.id}" class="btn dark">Read</a>
        <a href="/${blog.id}/editor" class="btn grey">Edit</a>
        <a href="#" class="btn danger delete-btn">Delete</a>
    `;
    const deleteButton = blogCard.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
        deleteBlog(blog.id);
    });
    blogSection.appendChild(blogCard);
}

const deleteBlog = (id) => {
    db.collection("blogs").doc(id).delete().then(() => {
        location.reload();
    })
    .catch((error) => {
        console.log("Error deleting the blog");
    });
}