import React, { useEffect, useRef, useState } from "react";
import axios from "./../../axios";
import { QUERY_SINGLE } from "../../query/query";

import ReactModal from "react-modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import "./Modal.css";

ReactModal.setAppElement("#root");

export const Modal = ({ open, setOpen, id }) => {
    const [score, setScore] = useState(0);
    const [progress, setProgress] = useState(0);
    const [volumes, setVolumes] = useState(0);
    const [data, setData] = useState({});
    const [startDate, setStartDate] = useState();
    const [finishDate, setFinishDate] = useState();

    useEffect(() => {
        if (id) {
            axios.post("", { query: QUERY_SINGLE, variables: { mediaId: id } }).then((res) => setData(res.data.data.Media));
        }
    }, [id]);
    const dropdownStyle = {
        option: (styles, { isSelected }) => ({
            ...styles,
            backgroundColor: isSelected ? "#f5f7fa" : "#FFFFFF",
            marginBottom: "5px",
            transition: ".3s",
            "&:hover": {
                backgroundColor: "#f5f7fa",
                color: "rgb(61, 180, 242)",
            },
            color: isSelected ? "rgb(61, 180, 242)" : "rgb(113, 127, 143)",
            cursor: "pointer",
            margin: "0",
        }),
        menu: (styles) => ({
            ...styles,
            backgroundColor: "transparent",
            margin: "0",
        }),
        menuList: (styles) => ({
            ...styles,
            paddingTop: "0",
        }),
        singleValue: (styles) => ({
            ...styles,
            color: "rgb(173, 192, 210)",
        }),
        control: (styles) => ({
            ...styles,
            backgroundColor: "rgb(11, 22, 34)",
            border: "none",
        }),
    };

    const scoreRef = useRef();
    const progressRef = useRef();
    const volumeRef = useRef();

    return (
        <>
            {Object.keys(data).length > 0 && (
                <ReactModal isOpen={open} onRequestClose={() => setOpen(false)}>
                    <div
                        className="header"
                        style={{
                            backgroundImage: `url(${data.bannerImage})`,
                        }}
                    >
                        <div className="content">
                            <div className="cover">
                                <LazyLoadImage alt={data.title.userPreferred} src={data.coverImage.large} effect="opacity" />
                            </div>
                            <div className="title">{data.title.userPreferred}</div>
                            <div className="save-btn" onClick={() => setOpen(false)}>
                                Save
                            </div>
                        </div>
                    </div>
                    <div className="body">
                        <div className="input-wrap">
                            <div className="form status">
                                <div className="input-title">Status</div>
                                <Select
                                    placeholder="Status"
                                    options={[
                                        { label: "Reading", value: "Reading" },
                                        { label: "Plan to read", value: "PlanToRead" },
                                        { label: "Completed", value: "Completed" },
                                        { label: "Rereading", value: "Rereading" },
                                        { label: "Paused", value: "Paused" },
                                        { label: "Dropped", value: "Dropped" },
                                    ]}
                                    styles={dropdownStyle}
                                />
                            </div>
                            <div className="form score">
                                <div className="input-title">Score</div>
                                <div className="input-number-container">
                                    <button onClick={() => scoreRef.current.stepUp()} className="input-custom-step up">
                                        {<RiArrowUpSLine />}
                                    </button>
                                    <input ref={scoreRef} value={score} onChange={(e) => setScore(e.target.value)} type="number" min="0" max="10" />
                                    <button onClick={() => scoreRef.current.stepDown()} className="input-custom-step down">
                                        {<RiArrowDownSLine />}
                                    </button>
                                </div>
                            </div>
                            <div className="form progress">
                                <div className="input-title">Chapter Progress</div>
                                <div className="input-number-container">
                                    <button onClick={() => progressRef.current.stepUp()} className="input-custom-step up">
                                        {<RiArrowUpSLine />}
                                    </button>
                                    <input ref={progressRef} value={progress} onChange={(e) => setProgress(e.target.value)} type="number" min="0" />
                                    <button onClick={() => progressRef.current.stepDown()} className="input-custom-step down">
                                        {<RiArrowDownSLine />}
                                    </button>
                                </div>
                            </div>
                            <div className="form volumes">
                                <div className="input-title">Volume Progress</div>
                                <div className="input-number-container">
                                    <button onClick={() => volumeRef.current.stepUp()} className="input-custom-step up">
                                        {<RiArrowUpSLine />}
                                    </button>
                                    <input ref={volumeRef} value={volumes} onChange={(e) => setVolumes(e.target.value)} type="number" min="0" />
                                    <button onClick={() => volumeRef.current.stepDown()} className="input-custom-step down">
                                        {<RiArrowDownSLine />}
                                    </button>
                                </div>
                            </div>
                            <div className="form start">
                                <div className="input-title">Start Date</div>
                                <DatePicker isClearable selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="yyyy-MM-dd" />
                            </div>
                            <div className="form finish">
                                <div className="input-title">Finish Date</div>
                                <DatePicker isClearable selected={finishDate} onChange={(date) => setFinishDate(date)} dateFormat="yyyy-MM-dd" />
                            </div>
                        </div>
                    </div>
                </ReactModal>
            )}
        </>
    );
};
