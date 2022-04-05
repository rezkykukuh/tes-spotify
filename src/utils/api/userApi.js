import resource from "../resource"

export const getUserApi =  () => {
    return resource.get('/me')
}