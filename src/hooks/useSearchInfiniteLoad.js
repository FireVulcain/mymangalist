import { useEffect, useState } from "react";
import axios from "./../axios";

export const useSearchInfiniteLoad = (pageNumber, setPage, variables, QUERY) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setPage(1);
        setData([]);
        setLoading(true);
        axios
            .post("", {
                query: QUERY,
                variables: {
                    page: 1,
                    ...variables,
                },
            })
            .then((res) => {
                setData((prevData) => [...prevData, ...res.data.data.Page.media]);
                setHasMore(res.data.data.Page.pageInfo.hasNextPage);
                setLoading(false);
            });
    }, [variables]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setLoading(true);
        if (pageNumber > 1) {
            axios
                .post("", {
                    query: QUERY,
                    variables: {
                        page: pageNumber,
                        ...variables,
                    },
                })
                .then((res) => {
                    setData((prevData) => [...prevData, ...res.data.data.Page.media]);
                    setHasMore(res.data.data.Page.pageInfo.hasNextPage);
                    setLoading(false);
                });
        }
    }, [pageNumber]); // eslint-disable-line react-hooks/exhaustive-deps

    return { loading, data, hasMore };
};
