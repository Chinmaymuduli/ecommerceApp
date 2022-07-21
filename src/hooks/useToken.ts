import AsyncStorage from "@react-native-async-storage/async-storage"
import { post } from "api"
import { APIFunction } from "types"
import useAccessToken from "./useAccessToken"

const GetToken = async (successFunction: APIFunction) => {
    const { setAccessToken } = useAccessToken()
    const GET_REFRESH_TOKEN = await AsyncStorage.getItem('tokenId')
    const getResponse = post({
        path: "auth/get-access-token",
        body: JSON.stringify({
            refresh_token: GET_REFRESH_TOKEN
        })
    })
    if ((await getResponse).status === 200) {
        setAccessToken(getResponse.ACCESS_TOKEN)
        // successFunction()
    }
    if ((await getResponse).status === 401) {
        console.log("logout")
    }
}

export default GetToken;