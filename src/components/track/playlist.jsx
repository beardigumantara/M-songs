/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Input, Textarea, Heading, FormLabel, Button } from '@chakra-ui/react';


const CreatePlaylist = ({accessToken, userId, uris}) => {
    const [form, setForm] = useState({
        title: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({...form, [name]: value});
    };

    const handleCreatePlaylist = async (e) => {
        e.preventDefault();

        if (form.title.length > 10) {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Authorization' : 'Bearer ' + accessToken,
                        'Content-Type' : 'application/json',
                    }
                };

                const optionsCreatePlaylist = {
                    ...requestOptions,
                    body : JSON.stringify({
                        name: form.title,
                        description: form.description,
                        public: false,
                        collaborative: false
                    }),
                };

                const responseCreatePlaylist = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, optionsCreatePlaylist)
                    .then((data) => data.json());

                const optionsAddSong = {
                    ...requestOptions,
                    body: JSON.stringify({
                        uris
                    }),
                };

                await fetch(`https://api.spotify.com/v1/playlists/${responseCreatePlaylist.id}/tracks`, optionsAddSong)
                    .then((data) => {
                        console.log(responseCreatePlaylist);
                        data.json();});

                setForm({title: '', description: ''});
                alert('Playlist created successfully');
            } catch(err) {
                alert(err);
            }
        } else {
            alert('Title must be larger than 10 characters');
        }
    };

    return <form onSubmit={handleCreatePlaylist}>
        <Heading as='h2' size='lg' ml='10px' mt='100px' mb='50px'>Create Playlist</Heading>
        <FormLabel htmlFor="title"></FormLabel>
        <Heading as='h3' size='md' ml='15px' mb='15px'>Title</Heading>
        <Input 
            width='95%'
            variant='flushed'
            focusBorderColor='gray.100'
            placeholder='Must have at least 10 characters'
            mr='15px'
            mb='15px' 
            ml='15px'
            size='lg' 
            type="text" 
            name="title" 
            id="title"
            value={form.title}
            onChange={handleChange}
        />
        <br />
        <FormLabel htmlFor="description" ml='15px' mt='20px'></FormLabel>
        <Heading as='h3' size='md' ml='15px' mt='20px' mb='10px'>Description</Heading>
        <Textarea
            width='95%'
            variant='flushed'
            placeholder='Enter your Description here'
            focusBorderColor='gray.100' 
            size='lg'
            m='15px'
            name="description" 
            id="description" 
            value={form.description}
            onChange={handleChange}
        />
        <br />
        <Button colorScheme='cyan' size='md' mt='15px' ml='15px' mb='20px' type="submit">Create</Button>
    </form>;
};

export default CreatePlaylist;