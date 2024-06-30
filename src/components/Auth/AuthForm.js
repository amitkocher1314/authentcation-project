import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const[isLoading,setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event)=>{
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
        
     setIsLoading(true)
    if (isLogin){

    }
    else{
      fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsmq92tnnIqmTW8V5Zas257RF0G2lRtXw",
       {
        method:'POST',
        body: JSON.stringify({
          email:enteredEmail,
          password:enteredPassword,
          returnSecureToken: true
        }),
        headers:{
         'Content-Type':'application/json'
        }
       }
      ).then(res =>{
        setIsLoading(false)
        if(res.ok){

        }
        else{
        return  res.json().then((data)=>{             //TO GET BACK DATA WE USE res.json AND SINCE ITS PROMISE SO THEN USE
          console.log(data)
           let errorMessage = "Authentication Failed!!!"
           if(data && data.error && data.error.message){            //TO UNDERSTAND THIS IF SEE IN CONSOLE ITS SHOWS ALL THOSE DATA DATA.ERROR 
            errorMessage = data.error.message;
           }
           alert(errorMessage);
        });
        }
      } );
    }

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required  ref={emailRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordRef}
          />
        </div>
        <div className={classes.actions}>

        {!isLoading && <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>}
        {isLoading && <p>Loading....</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
