import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { contexteLogin, serveur } from './constantes'
import { EpisodesPodcast } from './EpisodesPodcast'
import Podcast from './Podcast'

export function InfosPodcast() {

  let params = useParams();
  let {podcastId} = params;
  let [infosEpisodes, setInfosEpisodes] = useState(null);
  let [estFavoris, setEstFavoris] = useState();
  const context = useContext(contexteLogin);


  async function ajouterFavoris() {

    console.log(`ajouter aux abonnement le Podcast dont le podcastId est: ${podcastId}.`);
    let bearerToken = 'bearer ' + context.accessToken;
    const response = await fetch(`${serveur}subscriptions?id=${podcastId}`, {
      method: 'POST',
      headers: {
        Authorization: bearerToken,
      },
    });
    if (response.ok) {
      console.log(`Podcast ${podcastId} a été ajouté aux favoris.`);
      setEstFavoris(true);
    } else { console.error(response.statusText); }

  } // fin ajouterFavoris

  async function supprimerFavoris() {

    console.log(`supprimer des abonnements le Podcast dont le podcastId est: ${podcastId}.`);
    let bearerToken = 'bearer ' + context.accessToken;
    let response = await fetch(`${serveur}subscriptions?id=${podcastId}`, {
      method: "DELETE",
      headers: {
        'Authorization': bearerToken
      }
    });
    if (response.ok) {
      console.log(`Podcast ${podcastId} a été supprimé des abonnements.`);
      setEstFavoris(false);
    } else {
      console.error(response.statusText);
    }
  } // fin de supprimerfavoris()

  useEffect(() => {

    async function componentDidMount() {
      // console.log("*********** DEBUG: InfosPodcast.js : UseEffect.js : podcastId :", podcastId)
      const response = await fetch(`${serveur}podcast/${podcastId}`);
      if (response.ok) {
        let data = await response.json();
        setInfosEpisodes(data);
      }

      const bearerToken = `bearer ${context.accessToken}`;
      const responseFav = await fetch(`${serveur}subscriptions?id=${podcastId}`, {
        method: 'GET',
        headers: {
          Authorization: bearerToken,
        }
      });
      if (responseFav.ok) {
        const dataFav = await responseFav.json();
        console.log("InfosPodcast.js : useEffect : componentDidMount: dataFav:" + dataFav.isSubscribed);
        setEstFavoris(dataFav.isSubscribed);
        console.log("InfosPodcast.js: useEffect : componentDidMount: estFavoris:" + estFavoris );
      } else { console.log(responseFav.statusText); }
      console.log("InfosPodcast.js: useEffect : componentDidMount: context.accessToken:  " + context.accessToken);

    } //  fin de componentDidMount()
    componentDidMount();
  }, [podcastId , context.accessToken, estFavoris]); //fin de userEffect

  return(

    (infosEpisodes != null) &&
    <div className="container">

        <div className="buttons is-centered">
          {
            (context.accessToken !== null && estFavoris === true) &&
            <button onClick={supprimerFavoris} className="button is-danger">
              Desabonné
            </button>
          }
          {
            (context.accessToken !== null && estFavoris === false) &&
            <button onClick={ajouterFavoris} className="button is-primary">
              Abonné
            </button>
          }
        </div>

       <div className="columns is-centered">
         {
           <Podcast podcast={infosEpisodes}/>
         }
       </div>

       <div className="columns is-centered">
          <div className="column">{infosEpisodes.description}</div>
       </div>

       {
        infosEpisodes.episodes.map((episode) => {
          return <EpisodesPodcast episode={episode} key={episode.episodeId}/>;
        })
       }
    </div>
  )

}// Fin InfoPodcasts
