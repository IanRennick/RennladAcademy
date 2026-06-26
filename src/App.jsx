import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import ProfilePage from './pages/profile/ProfilePage';
import QuizPage from './pages/quiz/QuizPage';
import LogInPage from './pages/auth/LogInPage';
import RequireAuth from './components/layout/RequireAuth';
import PersistLogIn from './components/layout/PersistLogIn';


function App() {


    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                {/* Public Routes */}
                <Route index element={<HomePage />}/>
                <Route path='/logIn' element={<LogInPage />} />

                {/* Protected Routes */}
                <Route element={<PersistLogIn />}>
                    <Route element={<RequireAuth />}>
                        <Route path='/quiz' element={<QuizPage />} />
                        <Route path='/profile' element={<ProfilePage />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
