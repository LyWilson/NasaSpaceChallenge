import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker
import { format } from "date-fns";
import './Details.css'; // Custom styles for the calendar

const MarsDetails = () => {
    const [selectedDate, setSelectedDate] = useState(null); // Manage selected date state

    // Handle the date change
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="marsPageContainer">
            {/* Left Section with Description */}
            <div className="descriptionContainer">
                <h1>Mars</h1>
                <p>
                    Mars is the 5th planet in our solar system. It is pretty similar to Earth, the world we live in.
                    In recent research, there have been signs that Mars once had a system similar to Earth's.
                </p>
            </div>

            {/* Right Section with Calendar */}
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
    );
};

export default MarsDetails;
