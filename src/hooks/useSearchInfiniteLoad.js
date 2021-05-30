import { useEffect, useState } from "react";
import axios from "./../axios";

export const useSearchInfiniteLoad = (pageNumber, variables, QUERY) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setData([]);
    }, [variables]);

    useEffect(() => {
        setLoading(true);
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
    }, [variables, pageNumber]); // eslint-disable-line react-hooks/exhaustive-deps

    return { loading, data, hasMore };
};
