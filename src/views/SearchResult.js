import React, { useCallback, useRef, useState } from "react";
import { Card } from "../components/Card/Card";
import { useSearchInfiniteLoad } from "../hooks/useSearchInfiniteLoad";

import { QUERY_SEARCH } from "../query/query";

export const SearchResult = ({ variables }) => {
    const [page, setPage] = useState(1);

    const { loading, data, hasMore } = useSearchInfiniteLoad(page, setPage, variables, QUERY_SEARCH);

    const observer = useRef();

    const lastDataElementRef = useCallback(
        (node) => {
            if (loading) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPageNumber) => prevPageNumber + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    return (
        <div className="container">
            <h2>Search result</h2>
            <div className="card-container">
                {data.map((d, key) => {
                    if (data.length === key + 1) {
                        return (
                            <div key={key} ref={lastDataElementRef}>
                                <Card data={d} />
                            </div>
                        );
                    } else {
                        return <Card key={key} data={d} />;
                    }
                })}
            </div>
            <div>{loading && "Loading..."}</div>
        </div>
    );
};
