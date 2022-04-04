import { useState } from "react";

const CreatePlaylist = ({accesToken, userId, uris}) => {
    const [form, setForm] = useState({
        title: '',
        descript: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm ({...form, [name] : value});
    }

    const handleCreatePlaylist = async (e) => {
        e.preventDefault();

        if (form.title.length > 5) {
            try {
                const requestOptions = {
                    method: 'POST',
                    Headers: {
                        'Authorization' : 'Bearer ' + accesToken,
                        'Content-Type' : 'application/json',
                    }
                }

                const optionsCreatePlaylist = {
                    ...requestOptions,
                    body : JSON.stringify({
                        name: form.title,
                        descript: form.descript,
                        public: false,
                        collaborative: false
                    }),
                }

                const responseCreatePlaylist = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, optionsCreatePlaylist)
                .then((data) => data.json());

                const optionsAddSong = {
                    ...requestOptions,
                    body : JSON.stringify({
                        uris
                    }),
                }

                await fetch(`https://api.spotify.com/v1/playlists/${responseCreatePlaylist.id}/tracks`, optionsAddSong)
                .then((data) => {
                    console.log(responseCreatePlaylist);
                    data.json()
                });
                
                setForm({title: '', descript: ''});
                alert('Playlist Created Successfully');
            } catch(err) {
                alert(err)
            }
        } else {
            alert('Title must be large than 5 characters')
        }
    }

    return <form onSubmit={handleCreatePlaylist}>
        <label htmlFor="title">Title</label>
        <br />
        <input 
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
        />
        <br />
        <label htmlFor="descript">Description</label>
        <br />
        <textarea 
            name="descript" 
            id="descript" 
            cols="30" 
            rows="10"
            value={form.descript}
            onChange={handleChange}
        >
        </textarea>
        <br />
        <button type="submit">Create</button>
    </form>
}

export default CreatePlaylist;