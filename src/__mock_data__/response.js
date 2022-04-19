import { rest } from 'msw'
export const handlers = [
  // Handles a POST /login request
  rest.get(
    `https://api.spotify.com/v1/search?q=haruno&type=track`,
    (req, res, ctx) => {
        return res(
            ctx.status(200),
        );
    }
  )
]