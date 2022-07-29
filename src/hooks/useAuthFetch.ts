import { useCallback, useEffect, useState } from 'react'
import useIsMounted from './useIsMounted'
import { authFetch } from 'api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { APIOptsType } from 'src/types/api'
import { ApiAuthType } from 'types'


const useAuthFetch = <T>(props: ApiAuthType
    //     {
    //     method?: "POST" | "PUT" | "GET" | "DELETE"
    //     path?: string
    //     body?: {}
    // } | undefined
) => {
    const [isLoading, setIsLoading] = useState(false)
    const [authData, setAuthData] = useState<T>()
    const [error, setError] = useState<string>()
    const isMounted = useIsMounted()
    const FETCH_DATA = useCallback(
        async ({
            method,
            path,
            body,

        }: ApiAuthType

        ) => {
            try {
                isMounted.current && setIsLoading(true)
                const getAccessToken = await AsyncStorage.getItem('access_token')
                const response = await authFetch({ path, method, body, token: getAccessToken })
                console.log("response", response)
                isMounted.current && setAuthData(response.data)
            } catch (err) {
                const error = err as Error
                console.log(error)
                setError(error.message)
            } finally {
                isMounted.current && setIsLoading(false)
            }
        },
        [],
    )
    useEffect(() => {
        if (props?.path && props?.method) {
            FETCH_DATA({
                method: props.method,
                path: props.path,
                body: props.body,
            })
        }
    }, [])
    return { authData, isLoading, error, FETCH_DATA }

}

export default useAuthFetch




