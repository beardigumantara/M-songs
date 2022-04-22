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
    duration: string;
}

const TrackMusic = ({images, title, artist, album, onSelectSong, uri, isSelected, duration}: MusicType) => {
    return <div className="track-desc">
        <img
            src={images}
            alt="album"
            data-testid='images'
        />
        <h3 data-testid='title'>{title}</h3>
        <p data-testid='artist'>{artist}</p>
        <p data-testid='album'>{album}</p>
        <p data-testid="duration">Duration: {duration}</p>
        <Button colorScheme='cyan' size='md' onClick={() => onSelectSong(uri)} mt='15px'>
            {isSelected ? 'Deselect' : 'Select'}
        </Button>
    </div>;
};

export default TrackMusic;