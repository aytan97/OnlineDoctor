import SignupPage from '../../../shared/layout/SignupToggle'
import React from 'react'
import { IToggle } from '../../../shared/models'
import { Helmet } from 'react-helmet-async'
import logoicon from '../../../shared/media/images/logoicon.png'
const SignUp: React.FC<IToggle> = ({ toggleSwitch, role }) => {


  return (
    <>  <Helmet>
      <title>Sign in</title>
      <link rel="icon" href={logoicon} />
    </Helmet>
      <div className='form-container sign-up-container'>
        <div className='form-group custom-form'>
          <SignupPage toggleSwitch={toggleSwitch} role={role} />
        </div>
      </div >
    </>
  )
}

export default SignUp
