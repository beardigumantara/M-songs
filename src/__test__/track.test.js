import { render, screen } from "@testing-library/react";
import TrackMusic from "components/track";


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