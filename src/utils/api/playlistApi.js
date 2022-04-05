import resource from "../resource"
import resourceEmpty from "../resourceEmpty"

export const getPlaylistApi =  () => {
    return resource.get('/me/playlists')
}

export const getTrackPlaylistApi =  (url) => {
    return resourceEmpty.get(`${url}`)
}

export const postItemPlaylistApi =  (id, uris) => {
    return resource.post(`/playlists/${id}/tracks?uris=${uris}` )
}

export const postNewPlaylistApi =  (id, data) => {
    return resource.post(`https://api.spotify.com/v1/users/${id}/playlists`, data )
}