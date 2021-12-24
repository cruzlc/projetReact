import React, { useContext, useState } from 'react'
import {useNavigate} from "react-router-dom"
import { contexteLogin, serveur } from './constantes'

export function Login() {

  const context = useContext(contexteLogin);

  const navigate = useNavigate();
  const [userPassword, setUserPassword] = useState('e1234567');
  const [userEmail, setUserEmail] = useState('e1234567@site.com');
  const [msgLoginFailed, setMsgLoginFailed] = useState(false);

  //const [msgLoginFailed, setMsgLoginFailed] = useState(false)

  function handleChangeUserName(event) {
    setUserEmail(event.target.value);
  }

  function handleChangeUserPassword(event) {
    setUserPassword(event.target.value);
  }

  function navigateToHome(event) {
    event.preventDefault();
    navigate("/")
  }

  function MessageErreur() {
    return <div className="notification is-danger">
      <button className="delete"></button>
      Primar lorem ipsum dolor sit amet, consectetur
      adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut,
      porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum
    </div>;
  }

  async function getToken() {

    console.log("DEBUG: Login.js: getToken(): a été appellé ")

    let bodyContent = {email: userEmail, password: userPassword};

    let response = await fetch(`${serveur}auth/token`, {
      method: "POST",
      body: JSON.stringify(bodyContent),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      let data = await response.json();
      console.log("DEBUG: Login.js: getToken(): data.token: " + data.token)
      context.setAccessToken(data.token)
      if(context.accessToken != null){
        console.log("DEBUG: Login.js: getToken(): context.accessToken.token: " + context.accessToken)
      }
      else{
        console.log("DEBUG: Login.js: getToken(): context.accessToken: est null!")
      }
      setMsgLoginFailed(false)
      navigate("/subscriptions")
    } else {
      console.error(response.statusText);
      setMsgLoginFailed(true)
    }
  } // Fin fonction getToken()

  React.useEffect(() => {
  if(context.accessToken != null)
    console.log("DEBUG: Login.js: useEffect(): context.accessToken: " + context.accessToken);
  else
    console.log("DEBUG: Login.js: useEffect(): context.accessToken: est null!");
  }, [context.accessToken]);

  return (
    <div className="section">
      <div className="field">
        <label className="label">Matricule</label>
        <p className="control has-icons-left has-icons-right">
          <input className="input" placeholder="Email"
                 type={"email"}
                 value={userEmail}
                 onChange={handleChangeUserName}/>
          <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
        </p>
      </div>
      <div className="field">
        <label className="label">Mot de passe</label>
        <p className="control has-icons-left">
          <input className="input" placeholder="Email"
                 type={"password"}
                 value={userPassword}
                 onChange={handleChangeUserPassword}/>
          <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                    </span>
        </p>
      </div>
      <div className="field">
        <p className="control">
          <button onClick={() => getToken()} className="button is-success">
            Connexion
          </button>
          <button onClick={navigateToHome} className="button is-danger">
            Annuler
          </button>
        </p>
      </div>
      {
        msgLoginFailed &&
        <MessageErreur/>
      }
    </div>
  );
}
