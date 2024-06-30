import classes from './ProfileForm.module.css';
import React, {useRef,useContext} from 'react';
import AuthContext from '../../store/auth-context';

//NOTE WE CAN ALSO CHECK REQUEST SENT OR NOT THROUGH INSPECT IN BROWSER


const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
 const submitHandler = (event)=>{
  event.preventDefault();

   const newPassword = newPasswordInputRef.current.value;

   fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCsmq92tnnIqmTW8V5Zas257RF0G2lRtXw",
   {
    method: 'POST',
    body: JSON.stringify({
      idToken:authCtx.token,
      password:newPassword,
      returnSecureToken: false
    }),
    headers:{
      'Content-Type':'application/json'
    }
   })
 }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        {/* note here minLength=7 does our work of error handling but we dont do like this as it can be changed in inspect mode */}

        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef} />     
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
