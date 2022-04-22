import { server } from "__mock_data__/server";
import { waitFor } from "@testing-library/react";

beforeAll(() => server.listen())
afterEach(() => server.restoreHandlers())
afterAll(() => server.close())

test('render track components', async () => {
    const data = await fetch('https://api.spotify.com/v1/search?q=Haruno&type=track')
    .then(data => data.json)
    .catch(err => console.log(err))
    await waitFor(() => {
        expect(data.items).toHaveLength(data.items.length)
    })
})