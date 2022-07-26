import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import useIsMounted from './useIsMounted'
import { authFetch } from 'api'


const useAuthFetch = <T>({
    method,
    path,
    body,
}: {
    method: "POST" | "PUT" | "GET" | "DELETE"
    path: string
    body?: {}
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<T>()
    const [error, setError] = useState<string>()
    const isMounted = useIsMounted()
    const GET_DATA = useCallback(
        async ({
            method,
            path,

            body,
        }: {
            method: "POST" | "PUT" | "GET" | "DELETE"
            path: string
            body?: {}
        }) => {
            console.log("inside getdata", path)
            try {
                isMounted.current && setIsLoading(true)
                const response = await authFetch({ path, method })
                console.log("response", response)
                isMounted.current && setData(response.data)
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
        console.log(path)
        if (path) {
            GET_DATA({
                method,
                path,
                body,
            })
        }
    }, [])
    return { data, isLoading, error, GET_DATA }

}

export default useAuthFetch




