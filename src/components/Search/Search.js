import React, { useState, useEffect, useRef } from "react";
import axios from "./../../axios";
import { QUERY_GENRES } from "./../../query/query";
import Select, { components } from "react-select";

import { debounce, generateYear, getPurgedObj } from "./../../helpers/helpers";

import "./Search.css";

export const Search = ({ setIsSearch, setVariables }) => {
    const [years, setYears] = useState([]);
    const [genres, setGenres] = useState([]);
    const [globalSearch, setGlobalSearch] = useState({
        search: "",
        type: "MANGA",
        genres: [],
        format: [],
        status: "",
        year: "",
        countryOfOrigin: "",
    });

    const searchInput = useRef();

    useEffect(() => {
        setYears(generateYear());

        axios.post("", { query: QUERY_GENRES }).then((res) => {
            const data = [];
            res.data.data.genres.map((genre) => {
                return data.push({ value: genre, label: genre });
            });
            setGenres(data);
        });
    }, []);

    const dropdownStyle = {
        option: (styles, { isSelected }) => ({
            ...styles,
            backgroundColor: isSelected ? "rgb(11, 22, 34)" : "rgb(21, 31, 46)",
            marginBottom: "5px",
            transition: ".3s",
            "&:hover": {
                backgroundColor: "rgb(11, 22, 34)",
                color: "rgb(61, 180, 242)",
            },
            color: "#FFF",
            cursor: "pointer",
        }),
        menuList: (styles) => ({
            ...styles,
            padding: "10px",
        }),
        singleValue: (styles) => ({
            ...styles,
            color: "rgb(173, 192, 210)",
        }),
    };

    const ValueContainer = ({ children, getValue, ...props }) => {
        var length = getValue().length;

        return (
            <components.ValueContainer {...props}>
                {length === 0 && (
                    <components.Placeholder {...props} isFocused={props.isFocused}>
                        {props.selectProps.placeholder}
                    </components.Placeholder>
                )}

                <div className="tag">{length > 0 && getValue()[0].label}</div>
                <div className="tag">{length > 1 && `+ ${length - 1}`}</div>
                {React.cloneElement(children[1])}
            </components.ValueContainer>
        );
    };

    const handleChange = (value, type) => {
        setGlobalSearch((prevState) => {
            if (type === "genres" || type === "format") {
                return {
                    ...prevState,
                    [type]: value.map((a) => a.value),
                };
            } else {
                return {
                    ...prevState,
                    [type]: value,
                };
            }
        });
    };

    useEffect(() => {
        setVariables(getPurgedObj(globalSearch));
        if (
            globalSearch?.genres?.length > 0 ||
            globalSearch?.format?.length > 0 ||
            globalSearch?.search !== "" ||
            globalSearch?.status !== "" ||
            globalSearch?.countryOfOrigin !== "" ||
            globalSearch?.year !== ""
        ) {
            setIsSearch(true);
        } else {
            setIsSearch(false);
        }
    }, [globalSearch]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="search-container">
            <div className="search filter-container">
                <p>Search</p>
                <span className="input-search-container">
                    <input
                        ref={searchInput}
                        type="text"
                        onChange={debounce((e) => {
                            handleChange(e.target.value, "search");
                        }, 500)}
                    />
                    {searchInput?.current?.value !== "" && (
                        <span
                            className="input-search-cleaner"
                            onClick={() => {
                                searchInput.current.value = "";
                                handleChange("", "search");
                            }}
                        >
                            x
                        </span>
                    )}
                </span>
            </div>
            <div className="genres filter-container">
                <p>Genres</p>
                <Select
                    placeholder="Any"
                    components={{ ValueContainer }}
                    hideSelectedOptions={false}
                    isMulti
                    options={genres}
                    className="filter-select"
                    styles={dropdownStyle}
                    onChange={(selectedOption) => handleChange(selectedOption, "genres")}
                />
            </div>
            <div className="format filter-container">
                <p>Format</p>
                <Select
                    placeholder="Any"
                    components={{ ValueContainer }}
                    hideSelectedOptions={false}
                    isMulti
                    options={[
                        { label: "Manga", value: "MANGA" },
                        { label: "Light Novel", value: "NOVEL" },
                        { label: "One Shot", value: "ONE_SHOT" },
                    ]}
                    className="filter-select"
                    styles={dropdownStyle}
                    onChange={(selectedOption) => handleChange(selectedOption, "format")}
                />
            </div>
            <div className="publishing-status filter-container">
                <p>Publishing Status</p>
                <Select
                    placeholder="Any"
                    styles={dropdownStyle}
                    options={[
                        { label: "Releasing", value: "RELEASING" },
                        { label: "Finished", value: "FINISHED" },
                        { label: "Not Yet Released", value: "NOT_YET_RELEASED" },
                        { label: "Cancelled", value: "CANCELLED" },
                    ]}
                    isClearable={true}
                    className="filter-select"
                    onChange={(selectedOption) => handleChange(selectedOption ? selectedOption.value : "", "status")}
                />
            </div>
            <div className="country-of-origin filter-container">
                <p>Country Of Origin</p>
                <Select
                    placeholder="Any"
                    options={[
                        { label: "Japan", value: "JP" },
                        { label: "South Korea", value: "KR" },
                        { label: "China", value: "CN" },
                        { label: "Taiwan", value: "TW" },
                    ]}
                    styles={dropdownStyle}
                    isClearable={true}
                    className="filter-select"
                    onChange={(selectedOption) => handleChange(selectedOption ? selectedOption.value : "", "countryOfOrigin")}
                />
            </div>
            <div className="year filter-container">
                <p>Year</p>
                <Select
                    placeholder="Any"
                    options={years}
                    className="filter-select"
                    styles={dropdownStyle}
                    isClearable={true}
                    onChange={(selectedOption) => handleChange(selectedOption ? selectedOption.value : "", "year")}
                />
            </div>
        </div>
    );
};
