import axios from 'axios';
import { useState, useEffect } from 'react';
import NewPlaylist from '../../track/playlist';
import TrackMusic from '../../track/index';
// import { useSelector, RootStateOrAny } from 'react-redux';
import { Button, Input, Heading, Grid} from '@chakra-ui/react';
import { useAppSelector } from 'components/store/hooks';
import {Search2Icon} from '@chakra-ui/icons'

interface Song {
    id: string,
    uri: string,
    album: {
      images: [{ url: string}, { url: string}],
      name: string,
    },
    name: string,
    duration_ms: number,
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

    const renderSong = combinedSong.map((music) => {
        const changeDuration = () => {
          let ms: number = music.duration_ms;
          const menit = Math.floor((ms / 1000 / 60) << 0);
          const detik = Math.floor((ms / 1000) % 60);
          return changeDigit(menit) + ":" + changeDigit(detik);
        };
        const changeDigit = (num: number) => {
          return num.toString().padStart(2, "0");
        };

        return(
            <TrackMusic 
                key={music.id}
                images={music.album.images[1]?.url}
                title={music.name}
                artist={music.artists[0].name}
                album={music.album.name}
                duration={changeDuration()}
                onSelectSong={handleSelectedSong}
                uri={music.uri}
                isSelected={music.isSelected}
            />
        );
    });

    return (
        <div className="main">
            <header>
                <div className="navbar">
                    <div className="logo">
                        <Heading as='h1' size='lg' ml='15px' mt='15px' mb='20px'><span>M</span>-Tify<span>.</span></Heading>
                    </div>
                    <div className="search-bar">
                        <Input 
                            width='300px'
                            mr='15px' 
                            mt='10px'
                            size='md' 
                            type="search"
                            borderRadius="20"
                            focusBorderColor='gray.400'
                            placeholder='Search Song...'
                            onChange={
                                (e) =>setSearchSong(e.target.value)
                            }
                        />
                        <Button 
                            colorScheme='black'
                            leftIcon={<Search2Icon ml='2' color='white'/>}
                            width="12" 
                            size='md' 
                            type="button"
                            borderRadius='25px'
                            mb='5px'
                            onClick={getSong}   
                        >
                        </Button>
                    </div>
                </div>
            </header>
            <main>
                <div className='playlist-contemt'>
                    <NewPlaylist
                        accessToken={accToken}
                        userId={user.id}
                        uris={selectedSong}
                    />
                </div>
                <div className="music-desc">
                    <div className="container">
                        <div className="music">
                            <Grid templateColumns='repeat(5, 1fr)' gap={10} mt='50px' mb='50px' mr='10px' ml='10px'>
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