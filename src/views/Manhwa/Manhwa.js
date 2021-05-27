import React, { useState, useRef, useCallback } from "react";
import { Card } from "../../components/Card/Card";
import { useInfiniteLoad } from "../../hooks/useInfiniteLoad";

export const Manhwa = () => {
    const [page, setPage] = useState(1);

    const { loading, data, hasMore } = useInfiniteLoad(page, {
        countryOfOrigin: "KR",
        sort: "SCORE_DESC",
        type: "MANGA",
    });

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
            <h2>Popular manhwa</h2>
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
