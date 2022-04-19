import axios from 'axios';
import { useState, useEffect } from 'react';
import CreatePlaylist from '../../track/playlist';
import TrackMusic from '../../track/index';
// import { useSelector, RootStateOrAny } from 'react-redux';
import { Button, Input, Heading, Grid} from '@chakra-ui/react';
import { useAppSelector } from 'components/store/hooks';

interface Song {
    id: string,
    uri: string,
    album: {
      images: [{ url: string}, { url: string}],
      name: string,
    },
    name: string,
    artists: [{ name: string }],
    isSelected: isSelected,
  }

  interface User {
    token: {
      token: {
        access_token: string,
        user: {
          id: string,
        }
      }
    }
  }
  
  type isSelected = boolean;
  
  export interface SelectedSong {
    uri: string,
  }

const PlaylistPages = () => {
    const [accToken, setAccToken] = useState('');
    const [user, setUser] = useState<any>({} as User);
    const [songData, setSongData] = useState<Song[]>([]);
    const [selectedSong, setSelectedSong ] = useState<SelectedSong['uri'][]>([]);
    const [combinedSong, setCombinedSong] = useState<Song[]>([]);
    const [searchSong, setSearchSong] = useState('');
    const accessToken = useAppSelector((state : any) => state.token.token.accessToken);
    const userData = useAppSelector((state) => state.token.user);

    useEffect(() => {
        setAccToken(accessToken);
        setUser(userData);
    }, [accessToken, userData]);

    const getSong = async () => {
        await axios
            .get(
                `https://api.spotify.com/v1/search?q=${searchSong}&type=track&access_token=${accToken}`
            )
            .then((response) => setSongData(response.data.tracks.items))
            .catch((err) =>{
                console.log(err);
            });
    };
  
    const handleSelectedSong = (uri: string) => {
        const alreadySelected = selectedSong.find((s) => s === uri);
        if (alreadySelected) {
            setSelectedSong(selectedSong.filter((s) => s !== uri));
        } else {
            setSelectedSong([...selectedSong, uri]);
        }
        console.log(selectedSong);
    };
  
    useEffect(() => {
        const combinedSongWithSelectedSong = songData.map((song: Song) => ({
            ...song,
            isSelected: selectedSong.find((s)  => s === song['uri']) ? true : false,
        }));
        setCombinedSong(combinedSongWithSelectedSong);
        console.log(combinedSongWithSelectedSong);
    }, [selectedSong, songData]);
  
    const renderSong = combinedSong.map((music) => 
        <TrackMusic 
            key={music.id}
            images={music.album.images[1]?.url}
            title={music.name}
            artist={music.artists[0].name}
            album={music.album.name}
            onSelectSong={handleSelectedSong}
            uri={music.uri}
            isSelected={music.isSelected}
        />
  
    );

    return (
        <div className="main">
            <header>
                <div className="navbar">
                    <div className="logo">
                        <Heading as='h1' size='lg' isTruncated ml='15px' mt='20px' mb='20px'>M-Songs</Heading>
                    </div>
                </div>
            </header>
            <main>
                <div className='playlist-contemt'>
                    <CreatePlaylist
                        accessToken={accToken}
                        userId={user.id}
                        uris={selectedSong}
                    />
                </div>
                <div className="search-bar">
                    <Input 
                        width='300px'
                        mr='15px' 
                        ml='15px'
                        size='sm' 
                        type="search" 
                        onChange={
                            (e) =>setSearchSong(e.target.value)
                        }
                    />
                    <Button colorScheme='teal' size='sm' type="button" onClick={getSong}>search</Button>
                </div>
                <div className="music-desc">
                    <div className="container">
                        <div className="music">
                            <Grid templateColumns='repeat(3, 1fr)' gap={6} mt='50px' mb='50px' mr='10px' ml='10px'>
                                {renderSong}
                            </Grid>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PlaylistPages;