import axios from "axios"

export let endpoints = {
    "categories": "/categories/",
    "courses": "/courses/",
    "lessons": (courseId) => `/courses/${courseId}/lessons/`,
    "lesson-detail": (lessonId) => `/lessons/${lessonId}/`,
    "oauth2-info": "/oauth2-info/",
    "login": "/o/token/",
    "current-user": "/users/current-user/",
    "register": "/users/",
    "comments": (lessonId) => `/lessons/${lessonId}/comments/`,
    "add-comment": (lessonId) => `/lessons/${lessonId}/add-comment/`,
    "rating": (lessonId) => `/lessons/${lessonId}/rating/`
}

export default axios.create({
    baseURL: "http://localhost:8000/"
})