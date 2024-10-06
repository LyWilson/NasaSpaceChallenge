import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker
import { format } from "date-fns";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faFileAlt } from '@fortawesome/free-solid-svg-icons'; // Import icons
import './Details.css'; // Custom styles for the calendar
import MyGif from "./pictures/moon_gif.gif";

const MoonDetails = () => {
    const [selectedDate, setSelectedDate] = useState(null); // Manage selected date state

    // Handle the date change
    const handleDateChange = (date) => {
        setSelectedDate(date);
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
                    <p>
                        <FontAwesomeIcon icon={faFileAlt} /> 
                        The moon is a piece of rock that floats around the earth. 
                        It controls the sea by making higher and lower a certain time frame.
                    </p>
                </div>
                {/* Gif Section */}
                <div>
                    <img className="gif" src={MyGif} alt="Image of Moon Turning" />
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
            <div className="rightContainer"></div>
        </div>
    );
};

export default MoonDetails;
