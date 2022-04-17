/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/react';

interface MusicType {
    images: string,
    title:string,
    artist:string,
    album:string,
    onSelectSong: (uri: string) => void,
    uri:string,
    isSelected: boolean
}

const TrackMusic = ({images, title, artist, album, onSelectSong, uri, isSelected}: MusicType) => {
    return <div className="track-desc">
        <img
            src={images}
            alt="album"
        />
        <h3>{title}</h3>
        <p>{artist}</p>
        <p>{album}</p>
        <Button colorScheme='teal' size='sm' onClick={() => onSelectSong(uri)}>
            {isSelected ? 'Deselect' : 'Select'}
        </Button>
    </div>;
};

export default TrackMusic;