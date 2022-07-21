import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, END_POINTS } from 'api';
import { useAuth } from 'app';
import { useCallback, useEffect, useState } from 'react';
import { APIOptsType } from 'src/types/api';
import { APIFunction } from 'types';
import useAccessToken from './useAccessToken';
import useIsMounted from './useIsMounted';

type GetPaths = keyof ReturnType<typeof END_POINTS.get>;

type GetType = {
    path: GetPaths;
    headers?: { [key: string]: string };
    options?: RequestInit;
    token?: string;
};

export default <TResponse>(path?: GetPaths) => {
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
    });

    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useIsMounted();
    const [data, setData] = useState<{
        results: TResponse;
        [key: string]: any;
    }>();
    const [fetchAgain, setFetchAgain] = useState(true);
    const { user } = useAuth(state => state);
    const { accessToken } = useAccessToken()



    const get = useCallback(
        async ({
            path,
            options = {},
            headers = { 'Content-Type': 'application/json' },
            token = accessToken,
        }: GetType) => {
            if (token) headers.Authorization = `Bearer ${token}`;
            try {
                // console.log(END_POINTS.get(user, pagination)[path]);
                isMounted.current && setIsLoading(true);
                const API_OPTIONS = { headers, ...options };
                const response = await fetch(
                    `${BASE_URL}/${END_POINTS.get(user, pagination)[path]}`,
                    API_OPTIONS,
                );

                const json = await response.json();

                return {
                    ...json,
                    data: json?.data,
                    status: response.status,
                    error: json?.error,
                };
            } catch (error: any) {
                return { error };
            } finally {
                isMounted.current && setIsLoading(false);
            }
        },
        [isMounted, pagination],
    );

    const fetchData = useCallback(async () => {
        if (!path) return;
        try {
            const result = await get({ path });
            const updatedData = {
                ...result,
                results: result?.data as TResponse,
            };
            isMounted.current && setData(updatedData);
            isMounted.current && setFetchAgain(false);
        } catch (error) {
            console.log(error);
        }
    }, [path, get, isMounted]);

    const increaseLimit = useCallback(() => {
        isMounted.current &&
            setPagination(prev => ({ ...prev, limit: prev.limit + 10 }));
        isMounted.current && setFetchAgain(true);
    }, []);

    const refetch = useCallback(
        (params?: { paginate: boolean }) => {
            if (params?.paginate) return increaseLimit();
            isMounted.current && setFetchAgain(true);
        },
        [isMounted, increaseLimit],
    );

    useEffect(() => {
        fetchAgain && fetchData();
    }, [fetchData, fetchAgain]);

    return { isLoading, get, data, refetch, increaseLimit };
};
