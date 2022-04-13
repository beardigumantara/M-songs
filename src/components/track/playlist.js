import { useState } from "react";
import { Input, Textarea, Heading, FormLabel, FormControl, Button } from '@chakra-ui/react'

const CreatePlaylist = ({accessToken, userId, uris}) => {
	const [form, setForm] = useState({
		title: '',
		description: '',
	})

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({...form, [name]: value});
	}

	const handleCreatePlaylist = async (e) => {
		e.preventDefault();

		if (form.title.length > 5) {
			try {
				const requestOptions = {
					method: 'POST',
					headers: {
						'Authorization' : 'Bearer ' + accessToken,
						'Content-Type' : 'application/json',
					}
				}

				const optionsCreatePlaylist = {
					...requestOptions,
					body : JSON.stringify({
						name: form.title,
						description: form.description,
						public: false,
						collaborative: false
					}),
				}

				const responseCreatePlaylist = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, optionsCreatePlaylist)
				.then((data) => data.json());

				const optionsAddSong = {
					...requestOptions,
					body: JSON.stringify({
						uris
					}),
				}

				await fetch(`https://api.spotify.com/v1/playlists/${responseCreatePlaylist.id}/tracks`, optionsAddSong)
				.then((data) => {
					console.log(responseCreatePlaylist);
					data.json()});

				setForm({title: '', description: ''});
				alert('Playlist created successfully');
			} catch(err) {
				alert(err)
			}
		} else {
			alert('Title must be larger than 5 characters')
		}
	};

	return <FormControl onSubmit={handleCreatePlaylist}>
		<Heading as='h2' size='md' ml='15px' mt='20px' mb='20px'>Create Playlist</Heading>
		<FormLabel htmlFor="title" ml='15px'>Title</FormLabel>
		<Input 
            width='300px'
            mr='15px' 
            ml='15px'
            size='sm' 
			type="text" 
			name="title" 
			id="title"
			value={form.title}
			onChange={handleChange}
		/>
		<br />
		<FormLabel htmlFor="description" ml='15px'>Description</FormLabel>
		<Textarea
			width='300px'
			height='200px'
			m='15px'
			name="description" 
			id="description" 
			cols="30" 
			rows="10"
			value={form.description}
			onChange={handleChange}
		/>
		<br />
		<Button colorScheme='teal' size='md' ml='15px' mb='20px' type="submit">Create</Button>
	</FormControl>
}

export default CreatePlaylist;