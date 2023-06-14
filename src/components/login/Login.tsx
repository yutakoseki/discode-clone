import React from 'react'
import "./Login.scss"
import { Button } from "@mui/material"

function Login() {
  return (
    <div className='login'>
        <div className="loginlogo">
            <img src="./discordIcon.png" alt="" />
        </div>
        <Button>ログイン</Button>
    </div>
  )
}

export default Login