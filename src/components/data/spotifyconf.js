const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"
const REDIRECT_URI = "http://localhost:3000"
const SCOPES = 'playlist-modify-public playlist-read-private playlist-modify-private';
const USERID = 'zg8yzyhbwlju129yafigcgt7d';
const urlGet = `${AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=${RESPONSE_TYPE}`

export {AUTH_ENDPOINT,RESPONSE_TYPE,REDIRECT_URI,urlGet,USERID}