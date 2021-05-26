import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import { QUERY_HOME } from "../../query/query";
import { Card } from "./../../components/Card/Card";

import "./Home.css";

export const Home = () => {
    const [manhwa, setManhwa] = useState([]);
    const [popular, setPopular] = useState([]);
    const [top, setTop] = useState([]);
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        axios
            .post("", {
                query: QUERY_HOME,
                variables: {
                    nextYear: new Date().getFullYear(),
                    seasonYear: new Date().getFullYear(),
                    type: "MANGA",
                },
            })
            .then((res) => {
                console.log(res.data.data);
                setManhwa(res.data.data.manhwa.media);
                setPopular(res.data.data.popular.media);
                setTop(res.data.data.top.media);
                setTrending(res.data.data.trending.media);
            });
    }, []);

    return (
        <div className="container">
            <Link className="title-link" to="/trending">
                <h2>Trending Now</h2> <span>View all</span>
            </Link>
            <Card arrayData={trending} />

            <Link className="title-link" to="/popular">
                <h2>All time popular</h2> <span>View all</span>
            </Link>
            <Card arrayData={popular} />

            <Link className="title-link" to="/top-manhwa">
                <h2>Popular manhwa</h2> <span>View all</span>
            </Link>
            <Card arrayData={manhwa} />

            <Link className="title-link" to="top-100">
                <h2>Top 100</h2> <span>View all</span>
            </Link>
            <Card arrayData={top} />
        </div>
    );
};
