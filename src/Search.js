import {useContext, useEffect, useState} from "react";
import {contexteLogin, serveur} from "./constantes";
import Podcast from './Podcast'

export function Search() {

    const context = useContext(contexteLogin);

    const [podcasts, setPodcasts] = useState([]);

    const [term, setTerm] = useState([]);

    function handleChangeTerm(event) {
        setTerm(event.target.value);
    }

    async function searchPodcast() {
        // chercher les podcasts
        let urlPodcats = `${serveur}podcasts/search/${term}`;
        let resultatPodcasts = await fetch(urlPodcats);
        if (resultatPodcasts.ok) {
            let data = await resultatPodcasts.json();
            setPodcasts(data)
            console.log("Search: searchPodcast: " + podcasts)
        } else {
            console.log("une erreur s'est produite lors de l'appel à podcasts/search/{term}");
        }
    }

    useEffect(() => {
        console.log("Search.useEffect terminé");
        console.log("DEBUG: Search.js: searchPodcast() : context.accessToken: " + context.accessToken);
    }, [podcasts]);

    return(
        <div>

            <div className="columns is-multiline is-gapless">
                <div className="column is-4"/>
                <div className="column is-2">
                    <div className="field">
                        <div className="control">
                            <input className="input"
                                   type="text"
                                   value={term}
                                   onChange={handleChangeTerm}
                                   placeholder="Entrez termes de recherche"/>
                        </div>
                    </div>
                </div>
                <div className="column is-2">
                    <button className="button is-info" onClick={searchPodcast}>Search</button>
                </div>
                <div className="column is-4"/>
            </div>

            <div className="columns is-multiline">
                {
                    podcasts.map((podcast) => {
                        return <Podcast podcast={podcast} key={podcast.podcastId}/>;
                    })
                }
            </div>

        </div>
    )
}
