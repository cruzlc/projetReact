import { useContext, useEffect, useState } from 'react'
import { contexteLogin, serveur } from './constantes'
import Podcast from './Podcast'

export function Subscriptions() {

  const context = useContext(contexteLogin);
  const [podcastsAbonnees, setPodcastsAbonnees] = useState([]);

  useEffect(() => {
    async function componentDidMount() {
      let token = context.accessToken;
      console.log("DEBUG: Subscriptions.js: useEffect(): ComponentDidMount: token: " + token);
      let bearerToken = 'bearer ' + token;
      let response = await fetch(`${serveur}subscriptions`, {
        method: "GET",
        headers: {
          'Authorization': bearerToken
        }
      });
      if (response.ok) {
        let data = await response.json();
        setPodcastsAbonnees(data)
      } else {
        console.error(response.statusText);
      }
    }
    componentDidMount();
    console.log("DEBUG: Subscriptions.js: useEffect() : context.accessToken: " + context.accessToken);
  }, []);

  return(
    <div className="columns is-multiline">
      {
        podcastsAbonnees.map((podcast) => {
          return <Podcast podcast={podcast} key={podcast.podcastId}/>;
        })
      }
    </div>
  )

}
