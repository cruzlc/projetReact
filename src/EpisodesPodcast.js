export function EpisodesPodcast(props) {

  return (
      <div className="columns is-centered">
        <div className="column is-narrow">
          <figure className="image is-64x64">
            <img src={props.episode.artworkUrl} alt={props.episode.title} />
          </figure>
        </div>
        <div className="column">
          <p className="title is-6">{props.episode.title}</p>
          <p className="subtitle is-7">{props.episode.content}</p>
          <audio controls>
            <source type="audio/ogg" src={props.episode.audioUrl}/>
          </audio>
        </div>
      </div>
  )

}// Fin EpisodesPodcast
