import { db } from "./firebase.js";

const blogSection = document.querySelector('.blogs-section');
const currentBlogId = decodeURI(location.pathname.split("/").pop());

db.collection("blogs").get().then((querySnapshot) => {
    querySnapshot.forEach((blog) => {
        const blogId = blog.id;
        // Check if the blog ID is not equal to the current blog ID
        if (blogId !== currentBlogId) {
            createBlog(blog);
        }
    });
});

const createBlog = (blog) => {
    const data = blog.data();
    blogSection.innerHTML += `
        <div class="blog-card">
            <img src="${data.bannerImage}" class="blog-image" alt="">
            <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
            <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
            <a href="/${blog.id}" class="btn dark">Read</a>
        </div>
    `;
};