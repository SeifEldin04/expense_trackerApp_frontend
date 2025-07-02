// import './App.css';
// import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
// import Signin from './pages/auth/signIn';
// import Signup from './pages/auth/signUp';
// import Dashboard from './pages/dashboard';
// import Transactions from './pages/transactions';
// import Settings from './pages/settings';
// import Account from './pages/accountPage';
// import useStore from './store';
// import { setAuthToken } from './libs/apiCall'
// import Navbar from './components/navbar';
// import { useEffect } from 'react';
// import { Toaster } from 'sonner';

// const RootLayout = () => {
//   const user = useStore((state) => state?.user);
//   const localUser = localStorage.getItem('user');
//   const token = user?.token || (localUser && JSON.parse(localUser)?.token);

//   const { theme, setTheme } = useStore();
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') || 'light';
//     setTheme(savedTheme);
//     document.documentElement.classList.toggle('dark', savedTheme === 'dark');
//   }, []);


// //   useEffect(() => {
// //     const savedTheme = localStorage.getItem('theme') || 'light';
// //     setTheme(savedTheme); // ده بيعمل التعديل + toggle على <html>
// // }, []);


//   setAuthToken(token || '');

//   return !user ? (
//     <Navigate to="/signIn" replace />
//   ) : (
//     <>
//       <Navbar />
//       <div className='min-h-[calc(100vh-100px)]'>
//         <Outlet />
//       </div>
//     </>
//   );
// };

// function App() {

//   return <main>
//     <Toaster position='top-center' />

//     <div className='w-full min-h-screen bg-gray-100 dark:bg-slate-900 dark:text-white px-10 md:px-20 '>
//       <Routes>
//         <Route element={<RootLayout />}>
//           <Route path='/' element={<Navigate to="/overview" />} />
//           <Route path='/overview' element={<Dashboard />} />
//           <Route path='/transactions' element={< Transactions />} />
//           <Route path='/settings' element={<Settings />} />
//           <Route path='/accounts' element={<Account />} />
//         </Route>

//         <Route path='signIn' element={<Signin />} />
//         <Route path='signUp' element={<Signup />} />
//       </Routes>
//     </div>
//   </main>

// }

// export default App





















import './App.css';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Signin from './pages/auth/signin';
import Signup from './pages/auth/signup';
import Dashboard from './pages/dashboard';
import Transactions from './pages/transactions';
import Settings from './pages/settings';
import Account from './pages/accountPage';
import useStore from './store';
import { setAuthToken } from './libs/apiCall';
import Navbar from './components/navbar';
import { useEffect } from 'react';
import { Toaster } from 'sonner';

const RootLayout = () => {
    const { user, theme, setTheme } = useStore((state) => state);
    console.log('RootLayout user:', user); // Debug

    useEffect(() => {
        // تغيير عنوان الصفحة
        document.title = "Expense Tracker";
    }, []);


    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }, [setTheme]);

    // Safely parse localStorage user
    let token = user?.token;
    if (!token) {
        try {
            const localUser = localStorage.getItem('user');
            if (localUser) {
                const parsedUser = JSON.parse(localUser);
                token = parsedUser?.token;
            }
        } catch (error) {
            console.error('Error parsing localStorage user:', error);
            localStorage.removeItem('user'); // Clear corrupted data
        }
    }

    setAuthToken(token || '');

    return !user ? (
        <Navigate to="/signIn" replace />
    ) : (
        <>
            <Navbar />
            <div className="min-h-[calc(100vh-100px)]">
                <Outlet />
            </div>
        </>
    );
};

function App() {
    return (
        <main>
            <Toaster position="top-center" />
            <div className="w-full min-h-screen bg-gray-100 dark:bg-slate-900 dark:text-white px-10 md:px-20">
                <Routes>
                    <Route element={<RootLayout />}>
                        <Route path="/" element={<Navigate to="/overview" />} />
                        <Route path="/overview" element={<Dashboard />} />
                        <Route path="/transactions" element={<Transactions />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/accounts" element={<Account />} />
                    </Route>
                    <Route path="/signIn" element={<Signin />} />
                    <Route path="/signUp" element={<Signup />} />
                </Routes>
            </div>
        </main>
    );
}

export default App;