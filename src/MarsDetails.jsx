//import
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import "./Details.css";

const MarsDetails = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [image, setImage] = useState("No_Data.png")
    const dataDirectory = "../marsPlot/";

    const handleDateChange = (date) => {
        if (date) {
            const formattedDate = format(date, "yyyy-MM-dd");
            console.log("Formatted Date:", formattedDate);
            getImagesByDate(formattedDate);
        }
        setSelectedDate(date);
    };

    const getImagesByDate = (date) => {
        const files = [
            "XB.ELYSE.02.BHV.2019-07-26HR12_evid0033",
            "XB.ELYSE.02.BHV.2019-07-26HR12_evid0034",
            "XB.ELYSE.02.BHV.2021-05-02HR01_evid0017",
            "XB.ELYSE.02.BHV.2022-05-04HR23_evid0001",
        ];

        const matchingFiles = files.filter(file => file.includes(date));
        console.log("Matching files:", matchingFiles[0]);

        if (matchingFiles.length === 0) {
            console.log("No files found for the specified date:", date);
            setImage("No_Data.png");
            return;
        }

        setImage("seismic_data_plot_" +`${matchingFiles[0]}` + ".png");
        console.log(image)
    };

    return (
        <div className="pageContainer">
            {}
            <div className="leftContainer">
                {}
                <div className="descriptionContainer">
                    <h1>
                        <FontAwesomeIcon icon={faGlobe}/> Mars
                    </h1>
                    <p>
                        <FontAwesomeIcon icon={faFileAlt}/>
                        Mars is the fourth planet from the Sun and the second smallest in the solar system, after
                        Mercury. With a diameter of about half that of Earth, Mars is often referred to as
                        the &apos;&apos;Red Planet&apos;&apos; due to its reddish appearance, which comes from iron
                        oxide (rust) that covers its surface. It has been a focus of human curiosity for centuries,
                        partly due to its surface features, which resemble those on Earth, and its potential for hosting
                        past or present life.
                    </p>
                    <br/>
                    <b> Orbital Speed</b>
                    <p>
                        Mars orbits the Sun at an average speed of 24.077 km/s (about 86,871 km/h), and it takes about
                        687 Earth days to complete one revolution around the Sun. A day on Mars (known as a sol) is just
                        a little longer than an Earth day, lasting 24.6 hours.
                    </p>
                    <br/>
                    <b> Particularities </b>
                    <p>
                        Seismic Activity (Marsquakes): Seismic activity on Mars, known as marsquakes, was detected for
                        the first time by NASA’s InSight mission. These quakes are believed to be caused by tectonic
                        forces, volcanic activity, or the cooling and shrinking of the planet’s interior. While much
                        weaker than earthquakes, marsquakes provide valuable data about the planet’s interior structure
                        and composition.
                    </p>
                </div>

                {}
                <div className="calendarContainer">
                    <h3 className="label">Select a Date and Time</h3>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        showTimeSelect
                        dateFormat="yyyy/MM/dd HH:mm"
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="Time"
                        placeholderText="Click to select a date"
                        className="customDatePicker"
                    />
                    {selectedDate && (
                        <div className="selectedDateContainer">
                            <h4>Selected Date:</h4>
                            <p>{format(selectedDate, "yyyy/MM/dd HH:mm")}</p>
                        </div>
                    )}
                </div>
            </div>
            {}
            <div className="rightContainer">
                <img src={dataDirectory + image} style={{width: "100%", height: "100%"}}></img>
            </div>
        </div>
    );
};

export default MarsDetails;
