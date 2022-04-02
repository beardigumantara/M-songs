const TrackMusic = ({images, title, artist, album, onSelectSong, uri, isSelected}) => {
    return <div className="track-desc">
    <img
      src={images}
      alt="album"
    />
    <h3>Title : {title}</h3>
    <p>Artists : {artist}</p>
    <p>Albums : {album}</p>
    <button onClick={() => onSelectSong(uri)}>
      {isSelected ? 'Deselect' : 'Select'}
      </button>
  </div>
}

export default TrackMusic;