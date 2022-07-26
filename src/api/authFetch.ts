import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "api";
import { useAccessToken } from "hooks";
import { APIOptsType } from "src/types/api";
import { APIFunction } from "types";

// const { accessToken } = useAccessToken()
export const GetToken = async (successFunction: APIFunction, params: APIOptsType) => {
    const { setAccessToken } = useAccessToken()
    console.log("inside fetch")
    const GET_REFRESH_TOKEN = await AsyncStorage.getItem('tokenId')
    // const getResponse = await post({
    //   path: "auth/get-access-token",
    //   body: JSON.stringify({
    //     refresh_token: GET_REFRESH_TOKEN
    //   })
    // })
    const getResponse = await fetch(`${BASE_URL}/auth/get-access-token`)
    const data = await getResponse.json()
    if (getResponse.status === 200) {
        return data.ACCESS_TOKEN
        if (data?.REFRESH_Token) {
            await AsyncStorage.setItem('tokenId', data?.REFRESH_Token)
        }
        successFunction(params)
    }
    if (getResponse.status === 401) {
        console.log("logout")
    }
}
const authFetch: APIFunction = ({
    path,
    body,
    method,
    token
}) => new Promise(async (resolve, reject) => {
    try {
        const API_OPTIONS = {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: body,
        };
        !API_OPTIONS.body && delete API_OPTIONS.body;
        const response = await fetch(`${BASE_URL}/${path}`, API_OPTIONS);
        // if (response.status === 401) {
        //     return GetToken(authFetch, {
        //         path,
        //         body,
        //         method: 'POST',
        //         options: {},
        //     })
        // }
        const json = await response.json();
        console.log({ json })

        resolve({
            ...json,
            data: json?.data,
            status: response.status,
            error: json?.error,
        });
    } catch (error: any) {
        reject(error)
    }
});

export default authFetch