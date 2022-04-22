import { render, screen } from "@testing-library/react";
import TrackMusic from "components/track";
import CreatePlaylist from '../components/track/playlist';
import userEvent from '@testing-library/user-event';

//add testing to test case toBeInTheDocument()
test('render track component', () => {
    render(<TrackMusic />)

    const image = screen.getByTestId('images');
    const title = screen.getByTestId('title');
    const album = screen.getByTestId('album');
    const artist = screen.getByTestId('artist');

    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(album).toBeInTheDocument();
    expect(artist).toBeInTheDocument();
})


//add testing case for userEvent
test('click create button', () => {
    render(<CreatePlaylist />)
  
    userEvent.click(screen.getByText('Create'));
    expect(screen.getByRole('button')).toHaveTextContent('Create');
  })