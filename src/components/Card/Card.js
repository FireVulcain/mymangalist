import React from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

import "./Card.css";

export const Card = ({ data }) => {
    const formatURL = (url) => {
        url = url.replace(/[^a-zA-Z0-9]/g, "");
        return url.trim();
    };

    return (
        <div className="card">
            <Link to={`${data.id}/${formatURL(data.title.userPreferred)}`} className="card-img-container">
                <LazyLoadImage
                    alt={data.title.userPreferred}
                    height={265}
                    src={data.coverImage.extraLarge || data.coverImage.large}
                    effect="opacity"
                    width={185}
                />
            </Link>
            <Link to={`${data.id}/${formatURL(data.title.userPreferred)}`} className="card-title-container">
                {data.title.userPreferred}
            </Link>
        </div>
    );
};
