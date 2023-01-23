# Search Doggo Breed Project
### Hello, this is just a simple ReactJS project, where you can enter your name, then a random dog picture will appear in front of you.

#### How to play with this:
1. Clone Repo.
2. Go to the directory of the cloned repo in your local machine.
3. Run `npm install`.
4. Create an `.env` file in the in the project's `root`.
5. Go to https://app.abstractapi.com/users/login, login, and get your `API_KEY`.
6. In the `.env` file, write `VITE_EMAIL_VALIDATION_API_KEY=<API_KEY>`.
7. Run `npm run dev`, go to the link.
8. On the first input box, enter valid email.
9. On the second input box, enter a name.
10. A picture of a dog will appear where it's breed is the closest to your name. I.E. `dan -> Great Dane`, `cori -> Corgi`, etc.


#### Tools used:
1. [ViteJS](https://vitejs.dev/) - Next Generation Frontend Tooling for faster dev server restarts
2. [FuseJS](https://fusejs.io/) - Fuse.js is a powerful, lightweight fuzzy-search library, with zero dependencies.
3. [Axios](https://axios-http.com/docs/intro) - Promise based HTTP client for the browser and node.js
4. [Dog Api](https://dog.ceo/dog-api) - The internet's biggest collection of open source dog pictures.
5. [Abstract Api](https://app.abstractapi.com/users/login) - Email Validation Api