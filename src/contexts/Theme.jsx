import React, { createContext, useState } from 'react'

export const ThemeContext=createContext({}) 

export default function ThemeProvider({children}) {
  const [IsDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme=()=>{setIsDarkMode(!IsDarkMode)};

  const darkStyle={
    background:"black",
    color:"gold"
  }
  const lightStyle={
    background:"white",
    color:'black'
  }

  const currStyle=IsDarkMode?darkStyle:lightStyle;
  
    return (
    <ThemeContext.Provider value={{toggleTheme,currStyle,IsDarkMode}}>
        {children}
    </ThemeContext.Provider>

  )
}
