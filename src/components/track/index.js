const TrackMusic = ({images, title, artist, album, onSelectSong, uri, isSelected}) => {
    return <div className="track-desc">
    <img
      src={images}
      alt="album"
    />
    <h3>{title}</h3>
    <p>{artist}</p>
    <p>{album}</p>
    <button onClick={() => onSelectSong(uri)}>
      {isSelected ? 'Deselect' : 'Select'}
      </button>
  </div>
}

export default TrackMusic;