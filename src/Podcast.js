import {Link} from "react-router-dom";

function Podcast(props) {
    return (
        <div className="column is-2">
            <Link to={`/infospodcast/${props.podcast.podcastId}`}>
                <div className="card large">
                    <div className="card-image">
                        <figure className="image is-square">
                            <img src={props.podcast.artworkUrl} alt={props.podcast.name} />
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content has-text-centered">
                                <p className="title is-6">{props.podcast.name}</p>
                                <p className="subtitle is-7 mb-1">{props.podcast.artist}</p>
                                <div className="subtitle is-7 mb-1">
                                    {
                                        props.podcast.genres.length === 2 ?
                                        <div className="content">{props.podcast.genres[0] + ", " + props.podcast.genres[1]}</div> :
                                        <div className="content">{props.podcast.genres[0]}</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Podcast
