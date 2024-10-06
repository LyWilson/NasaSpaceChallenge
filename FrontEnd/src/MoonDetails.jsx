import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker
import { format } from "date-fns";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faFileAlt } from '@fortawesome/free-solid-svg-icons'; // Import icons
import './Details.css'; // Custom styles for the calendar

const MoonDetails = () => {
    const [selectedDate, setSelectedDate] = useState(null); // Manage selected date state
    const [image, setImage] = useState("No_Data.png")
    const dataDirectory = "../public/moonPlot/";

    // Handle the date change
    const handleDateChange = (date) => {
        if (date) {
            // Format the date to 'yyyy-MM-dd'
            const formattedDate = format(date, "yyyy-MM-dd");
            console.log("Formatted Date:", formattedDate); // Display the formatted date
            sendDateToBackend(formattedDate);
        }
        setSelectedDate(date);
        sendDateToBackend(date);
    };

    const sendDateToBackend = (date) => {
        if (date) {
            
            // Simulate fetching from a pre-defined list (ideally, this should come from a server)
            const dataDirectory = "/moonPlot/";
            const files = ["2024-10-06_image1.png", "2024-10-06_image2.png"]; // Replace with actual logic

            const matchingFiles = files.filter(file => file.includes(date));
            console.log(matchingFiles)
            if (matchingFiles.length === 0) {
                console.log("No files found for the specified date:", date);
                setImage("No_Data.png"); // Reset image if no files found
                return;
            }

            console.log("Matching files:", matchingFiles);
            // Set the image to the first matching file name
            setImage(`${dataDirectory}${matchingFiles[0]}`);
        }
    };


    return (
        <div className="pageContainer">
            {/* Left Section with Description and Calendar */}
            <div className="leftContainer">
                {/* Description Section */}
                <div className="descriptionContainer">
                    <h1>
                        <FontAwesomeIcon icon={faGlobe} /> Moon
                    </h1>
                    <b> The Moon </b>
                    <p>
                        <FontAwesomeIcon icon={faFileAlt} /> 
                        The Moon is Earth's only natural satellite, 
                        formed around 4.5 billion years ago, likely 
                        due to a massive collision between Earth and 
                        a Mars-sized body, often called Theia. The Moon 
                        is roughly one-quarter the size of Earth and 
                        has a surface area comparable to the size of Africa. 
                        It orbits Earth at an average distance of about 384,400 km, 
                        and is tidally locked, meaning the same side always faces Earth.
                    </p>
                    <b> Orbital Speed</b>
                    <p>
                        The Moon moves around Earth at an average orbital 
                        speed of 1.022 km/s (or 3,683 km/h), completing one orbit 
                        in about 27.3 days. Its rotational period matches its orbital 
                        period, which is why we only see one side of the Moon from Earth.
                    </p>
                    <b> Particularities </b>
                    <p>
                        Moonquakes: Seismic activity on the Moon, known as moonquakes, was 
                        first detected by seismometers placed by the Apollo missions. These 
                        quakes are much weaker than earthquakes, but they can last for up to 
                        an hour due to the Moon’s lack of water and its rigid structure, which
                         allows seismic waves to travel longer distances without being absorbed. 
                    </p>
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
                <img src={dataDirectory + image} style={{width: "100%", height: "100%"}}></img>
            </div>
        </div>
    );
};

export default MoonDetails;
