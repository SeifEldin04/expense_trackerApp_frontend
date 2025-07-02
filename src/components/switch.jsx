// import React, { useState } from 'react'
// import { IoMoonOutline } from 'react-icons/io5'
// import { LuSunMoon } from 'react-icons/lu'
// import useStore from '../store'

// const ThemeSwitch = () => {
//     const {theme, setTheme} = useStore((state) => state)
//     const [isDarkMode, setIsDarkMode] = useState(theme === 'dark')

//     const toggleTheme = () => {
//         const newTheme = isDarkMode ? 'light' : 'dark';
//         setTheme(newTheme);
//         setIsDarkMode(!isDarkMode);
//         localStorage.setItem('theme', newTheme);
//         document.documentElement.classList.toggle('dark', newTheme === 'dark');
//       };
      

//     return (
//         <button onClick={toggleTheme} className='outline-none'>
//             {isDarkMode ?
//                 (
//                     <LuSunMoon size={26} className='text-gray-500' />
//                 ) : (
//                     <IoMoonOutline size={26} />
//                 )}
//         </button>
//     )
// }

// export default ThemeSwitch




import React from 'react'
import { IoMoonOutline } from 'react-icons/io5'
import { LuSunMoon } from 'react-icons/lu'
import useStore from '../store'

const ThemeSwitch = () => {
    const { theme, setTheme } = useStore((state) => state)

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    return (
        <button onClick={toggleTheme} className='outline-none'>
            {theme === 'dark' ? (
                <LuSunMoon size={26} className='text-gray-500' />
            ) : (
                <IoMoonOutline size={26} />
            )}
        </button>
    )
}

export default ThemeSwitch
