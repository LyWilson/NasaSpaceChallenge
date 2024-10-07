import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faFileAlt } from "@fortawesome/free-solid-svg-icons"; // Import icons
import "./Details.css"; // Custom styles for the calendar

const MarsDetails = () => {
    const [selectedDate, setSelectedDate] = useState(null); // Manage selected date state
    const [image, setImage] = useState("No_Data.png");
    const dataDirectory = "marsPlot/";

    // Handle the date change
    const handleDateChange = (date) => {
        if (date) {
            // Format the date to 'yyyy-MM-dd'
            const formattedDate = format(date, "yyyy-MM-dd");
            console.log("Formatted Date:", formattedDate); // Display the formatted date
            getImagesByDate(formattedDate);
        }
        setSelectedDate(date);
    };

    const getImagesByDate = (date) => {
        // Simulate fetching from a pre-defined list (ideally, this should come from a server)
        const files = [
            "XB.ELYSE.02.BHV.2019-07-26HR12_evid0033",
            "XB.ELYSE.02.BHV.2019-07-26HR12_evid0034",
            "XB.ELYSE.02.BHV.2021-05-02HR01_evid0017",
            "XB.ELYSE.02.BHV.2022-05-04HR23_evid0001",
        ]; // Replace with actual logic to fetch file names from your directory

        // Filter files based on the formatted date
        const matchingFiles = files.filter(file => file.includes(date));
        console.log("Matching files:", matchingFiles[0]);

        if (matchingFiles.length === 0) {
            console.log("No files found for the specified date:", date);
            setImage("No_Data.png"); // Reset image if no files found
            return;
        }

        // Set the image to the first matching file name
        setImage("seismic_data_plot_" + `${matchingFiles[0]}` + ".png");
        console.log(image);
    };

    return (
        <div className="pageContainer">
            {/* Left Section with Description and Calendar */}
            <div className="leftContainer">
                {/* Description Section */}
                <div className="descriptionContainer">
                    <h1 style={{ marginBottom: "20px" }}>
                        <FontAwesomeIcon icon={faGlobe} /> Mars
                    </h1>
                    <p style={{ marginBottom: "20px" }}>
                        <FontAwesomeIcon icon={faFileAlt} />
                        Mars is the fourth planet from the Sun and the second smallest in the solar system, after Mercury. With a diameter of about half that of Earth, Mars is often referred to as the &apos;&apos;Red Planet&apos;&apos; due to its reddish appearance, which comes from iron oxide (rust) that covers its surface. It has been a focus of human curiosity for centuries, partly due to its surface features, which resemble those on Earth, and its potential for hosting past or present life.
                    </p>
                    <b style={{ marginBottom: "10px", display: "block" }}>Particularities</b>
                    <p style={{ marginBottom: "20px" }}>
                        Seismic Activity (Marsquakes): Seismic activity on Mars, known as marsquakes, was detected for the first time by NASA’s InSight mission. These quakes are believed to be caused by tectonic forces, volcanic activity, or the cooling and shrinking of the planet’s interior. While much weaker than earthquakes, marsquakes provide valuable data about the planet’s interior structure and composition.
                    </p>
                    <p>
                        <b>Here are some seismic activity dates detected by NASA:</b>
                    </p>
                    <ul style={{ marginTop: "10px" }}>
                        <li>2019-07-26</li>
                        <li>2021-05-02</li>
                        <li>2022-05-04</li>
                    </ul>
                </div>

                {/* Calendar Section */}
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
            {/* Empty Right Section */}
            <div className="rightContainer">
                <img src={dataDirectory + image} style={{ width: "100%", height: "100%" }} alt="Mars Seismic Data" />
            </div>
        </div>
    );
};

export default MarsDetails;
