import { render, screen } from '@testing-library/react';

import CreatePlaylist from '../components/track/playlist';

test('renders learn react link', () => {
    render(<CreatePlaylist />);
    expect(screen.getByText(/description/i)).toBeInTheDocument();
});
