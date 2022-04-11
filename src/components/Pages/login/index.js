import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import url from '../../../helper/auth';
import { setToken } from '../../store/slice-token';


const LoginPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const accessToken = new URLSearchParams(window.location.hash).get("#access_token");

        if(accessToken !== null) {
            const setUserProfile = async () => {
                try {
                    const requestOptions = {
                        headers: {
                            'Authorization': 'Bearer ' + accessToken,
                            'Content-Type': 'application/json',
                        }
                    }
                    const response = await fetch(
                        `https://api.spotify.com/v1/me`, requestOptions
                    )
                    .then(data => data.json());
                    dispatch(setToken({
                        accessToken: accessToken,
                        user: response
                    }));
                    history.push("/create-playlist");  
                } catch (error) {
                    alert(error);
                }
            };
            setUserProfile();
        }
    }, [dispatch, history]);

    return (
        <>
            <a href={url}>Login</a>
        </>
    )
}

export default LoginPage;