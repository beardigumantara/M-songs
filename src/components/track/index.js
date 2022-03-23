const TrackMusic = ({images, title, artist, album}) => {
    return <div className="track-desc">
    <img
      src={images}
      alt=""
    />
    <h3>Title : {title}</h3>
    <p>Artists : {artist}</p>
    <p>Albums : {album}</p>
  </div>
}

export default TrackMusic;