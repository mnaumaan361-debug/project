import React from 'react'
import { createContext } from 'react'

export const AuthDataContext=createContext()
function AuthContext({children}) {
<<<<<<< HEAD
    let serverUrl = "https://onecart-backend-mwjo.onrender.com/"
=======
let serverUrl = "https://onecart-backend-mwjo.onrender.com/"
>>>>>>> fa7ae8e (Ignore dist)
    let value={
        serverUrl,
    }
  return (
    <div>
      <AuthDataContext.Provider value={value}>
        {children}
      </AuthDataContext.Provider>
    </div>
  )
}

export default AuthContext
