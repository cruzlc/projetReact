import {useContext, useEffect, useState} from "react";
import {contexteLogin, serveur} from "./constantes";
import Podcast from './Podcast'

export function ListePodcasts() {

    const context = useContext(contexteLogin);

    const [podcasts, setPodcasts] = useState([]);

    useEffect(() => {

        async function componentDidMount() {

            // obtenir les 50 podcasts plus populaires
            let urlPodcasts = `${serveur}podcasts/top`;
            let resultatPodcasts = await fetch(urlPodcasts);
            if (resultatPodcasts.ok) {
                let data = await resultatPodcasts.json();
                setPodcasts(data)
                console.log("ListePodcasts: componentDidMount: " + podcasts)
            } else {
                console.log("une erreur s'est produite lors de l'appel à /podcats/top");
            }
        }

        componentDidMount().then(() => console.log("componentDidMount de ListePodcasts terminé!"));
        console.log("ListePodcasts.useEffect terminé");
        console.log("DEBUG: ListePodcasts.js: useEffect() : context.accessToken: " + context.accessToken);

    }, []);

    return(
      <div className="columns is-multiline">
          {
              podcasts.map((podcast) => {
                  return <Podcast podcast={podcast} key={podcast.podcastId}/>;
              })
          }
      </div>
  )
}
