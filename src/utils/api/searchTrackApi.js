import resource from "../resource"

export const searchTrackApi =  (params) => {
    return resource.get(`/search?q=${params.q}&type=${params.type}&market=${params.market}&limit=${params.limit}`)
}