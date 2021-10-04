import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from '../pages/Home'
import Footer from "./Footer";
import Lesson from "../pages/Lesson";
import LessonDetail from "../pages/LessonDetail";
import Login from "../pages/Login";
import Register from "../pages/Resgister";

export default function Body() {
    return (
 
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/courses/:courseId/lessons/" component={Lesson} />
                <Route exact path="/lessons/:lessonId/" component={LessonDetail} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
            </Switch>
            <Footer />
        </BrowserRouter>
            
    )
}