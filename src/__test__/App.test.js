import { render, screen } from '@testing-library/react';

import NewPlaylist from '../components/track/playlist';

test('renders learn react link', () => {
    render(<NewPlaylist />);
    expect(screen.getByText(/description/i)).toBeInTheDocument();
});
