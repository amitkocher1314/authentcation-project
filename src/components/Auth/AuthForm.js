import { useState, useRef,useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';
import {useHistory} from "react-router-dom";

// SEE AUTHFORM .JS FILE

const AuthForm = () => {

  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const[isLoading,setIsLoading] = useState(false);     //SEE THIS
  const emailRef = useRef();                             //SEE THIS
  const passwordRef = useRef();

 const authCtx = useContext(AuthContext);

 

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event)=>{
    event.preventDefault();                                       //SEE THIS

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
        
     setIsLoading(true);
     let url;
    if (isLogin){
       url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsmq92tnnIqmTW8V5Zas257RF0G2lRtXw"
    }
    else{
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsmq92tnnIqmTW8V5Zas257RF0G2lRtXw"
    }
      fetch(url,
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
          return res.json();
        }
        else{
        return  res.json().then((data)=>{             //TO GET BACK DATA WE USE res.json AND SINCE ITS PROMISE SO THEN USE
          console.log(data)
           let errorMessage = "Authentication Failed!!!"
           if(data && data.error && data.error.message){            //TO UNDERSTAND THIS IF SEE IN CONSOLE ITS SHOWS ALL THOSE DATA DATA.ERROR 
            errorMessage = data.error.message;
           }
            throw new Error(errorMessage)           // throw new Error(errorMessage): This line creates a new Error object with the message errorMessage and throws it. This effectively stops the current flow and moves to the nearest catch block, where the error can be handled.
        });
        }
      } ).then((data) =>{
        authCtx.login(data.idToken);
        history.replace('/')
          
        console.log(data)
      })
        .catch((err)=>{
          alert(err.message)
        });
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
