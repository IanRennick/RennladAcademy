import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import QuizPage from './pages/quiz/QuizPage';
import LogInPage from './pages/auth/LogInPage';
import RequireAuth from './components/layout/RequireAuth';


function App() {


    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                {/* Public Routes */}
                <Route index element={<HomePage />}/>
                <Route path='/logIn' element={<LogInPage />} />

                {/* Protected Routes */}
                <Route element={<RequireAuth />}>
                    <Route path='/quiz' element={<QuizPage />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
