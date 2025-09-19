import {createBrowserRouter} from 'react-router-dom'
import Home from './pages/home'
import CreateQuiz from './pages/create_quiz'
import AttendQuiz from './pages/attend_quiz'
import Error from './pages/error'
import QuizQuestions from './components/quiz_question'
import Score from './components/score'


export const router = createBrowserRouter([
    {
        path:'/',
        element:<Home/>,
        errorElement:<Error/>
    },
    {
        path:'/create-quiz',
        element:<CreateQuiz/>,
        errorElement:<Error/>,
    },

    {
        path:'/attend-quiz',
        element:<AttendQuiz/>,
        errorElement:<Error/>,
    },
    {
        path:'/attend-quiz/:id',
        element:<QuizQuestions/>,
        errorElement:<Error/>,
    },
    {
        path:'/attend-quiz/:id/score',
        element:<Score/>,
        errorElement:<Error/>,
    },
    // {
    //     path:'/create-quiz/preview',
    //     element:<PreviewQuestion/>,
    //     errorElement:<Error/>,
    // },

  
])