import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faFileAlt } from "@fortawesome/free-solid-svg-icons"; // Import icons
import "./Details.css"; // Custom styles for the calendar

const MoonDetails = () => {
    const [selectedDate, setSelectedDate] = useState(null); // Manage selected date state
    const [image, setImage] = useState("No_Data.png")
    const dataDirectory = "moonPlot/";

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
            "xa.s12.00.mhz.1969-12-16HR00_evid00006",
            "xa.s12.00.mhz.1969-12-16HR00_evid00006",
            "xa.s12.00.mhz.1970-01-09HR00_evid00007",
            "xa.s12.00.mhz.1970-01-09HR00_evid00007",
            "xa.s12.00.mhz.1970-01-09HR00_evid00007",
            "xa.s12.00.mhz.1970-01-09HR00_evid00007",
            "xa.s12.00.mhz.1970-02-07HR00_evid00014",
            "xa.s12.00.mhz.1970-02-18HR00_evid00016",
            "xa.s12.00.mhz.1970-02-18HR00_evid00016",
            "xa.s12.00.mhz.1970-03-14HR00_evid00018",
            "xa.s12.00.mhz.1970-03-30HR00_evid00020",
            "xa.s12.00.mhz.1970-03-30HR00_evid00020",
            "xa.s12.00.mhz.1970-04-03HR00_evid00021",
            "xa.s12.00.mhz.1970-05-20HR00_evid00026",
            "xa.s12.00.mhz.1970-05-23HR00_evid00027",
            "xa.s12.00.mhz.1970-05-24HR00_evid00028",
            "xa.s12.00.mhz.1970-05-25HR00_evid00029",
            "xa.s12.00.mhz.1970-06-19HR00_evid00031",
            "xa.s12.00.mhz.1970-06-19HR00_evid00031",
            "xa.s12.00.mhz.1970-07-17HR00_evid00035",
            "xa.s12.00.mhz.1970-07-18HR00_evid00036",
            "xa.s12.00.mhz.1970-07-20HR00_evid00037",
            "xa.s12.00.mhz.1970-07-20HR00_evid00037",
            "xa.s12.00.mhz.1970-07-20HR00_evid00037",
            "xa.s12.00.mhz.1970-07-27HR00_evid00039",
            "xa.s12.00.mhz.1970-07-27HR00_evid00039",
            "xa.s12.00.mhz.1970-07-27HR00_evid00039",
            "xa.s12.00.mhz.1970-07-27HR00_evid00039",
            "xa.s12.00.mhz.1970-09-09HR00_evid00043",
            "xa.s12.00.mhz.1970-09-09HR00_evid00043",
            "xa.s12.00.mhz.1970-10-26HR00_evid00049",
            "xa.s12.00.mhz.1970-11-03HR00_evid00050",
            "xa.s12.00.mhz.1970-11-03HR00_evid00050",
            "xa.s12.00.mhz.1970-11-03HR00_evid00051",
            "xa.s12.00.mhz.1970-11-03HR00_evid00051",
            "xa.s12.00.mhz.1971-01-03HR00_evid00057",
            "xa.s12.00.mhz.1971-01-05HR00_evid00059",
            "xa.s12.00.mhz.1971-01-17HR00_evid00060",
            "xa.s12.00.mhz.1971-03-15HR00_evid00073",
            "xa.s12.00.mhz.1971-04-08HR01_evid00083",
            "xa.s12.00.mhz.1971-04-08HR01_evid00083",
            "xa.s12.00.mhz.1971-05-22HR00_evid00092",
            "xa.s12.00.mhz.1971-06-11HR00_evid00096",
            "xa.s12.00.mhz.1971-06-27HR00_evid00101",
            "xa.s12.00.mhz.1971-10-06HR00_evid00124",
            "xa.s12.00.mhz.1971-10-06HR00_evid00124",
            "xa.s12.00.mhz.1971-10-06HR00_evid00125",
            "xa.s12.00.mhz.1971-10-06HR00_evid00125",
            "xa.s12.00.mhz.1971-10-26HR00_evid00133",
            "xa.s12.00.mhz.1971-11-24HR00_evid00156",
            "xa.s12.00.mhz.1971-11-24HR00_evid00156",
            "xa.s12.00.mhz.1972-01-26HR00_evid00186",
            "xa.s12.00.mhz.1972-02-21HR00_evid00190",
            "xa.s12.00.mhz.1972-02-28HR00_evid00192",
            "xa.s12.00.mhz.1972-02-28HR00_evid00192",
            "xa.s12.00.mhz.1972-05-15HR00_evid00223",
            "xa.s12.00.mhz.1972-05-19HR00_evid00228",
            "xa.s12.00.mhz.1972-11-14HR00_evid00331",
            "xa.s12.00.mhz.1972-11-19HR00_evid00335",
            "xa.s12.00.mhz.1972-11-19HR00_evid00335",
            "xa.s12.00.mhz.1972-12-02HR00_evid00341",
            "xa.s12.00.mhz.1972-12-02HR00_evid00341",
            "xa.s12.00.mhz.1972-12-06HR00_evid00342",
            "xa.s12.00.mhz.1972-12-15HR00_evid00349",
            "xa.s12.00.mhz.1973-03-12HR00_evid00384",
            "xa.s12.00.mhz.1973-04-23HR00_evid00399",
            "xa.s12.00.mhz.1973-08-08HR00_evid00437",
            "xa.s12.00.mhz.1973-10-10HR00_evid00463",
            "xa.s12.00.mhz.1973-10-10HR00_evid00463",
            "xa.s12.00.mhz.1973-10-10HR00_evid00463",
            "xa.s12.00.mhz.1973-10-10HR00_evid00463",
            "xa.s12.00.mhz.1973-11-22HR00_evid00475",
            "xa.s12.00.mhz.1974-03-14HR00_evid00506",
            "xa.s12.00.mhz.1974-03-30HR00_evid00512",
            "xa.s12.00.mhz.1974-05-09HR00_evid00522",
            "xa.s12.00.mhz.1974-06-30HR00_evid00543",
            "xa.s12.00.mhz.1974-07-25HR05_evid00553",
            "xa.s12.00.mhz.1974-10-02HR00_evid00572",
            "xa.s12.00.mhz.1975-04-21HR00_evid00638",
            "xa.s12.00.mhz.1975-05-16HR00_evid00651",
            "xa.s12.00.mhz.1975-05-20HR00_evid00652",
            "xa.s12.00.mhz.1975-06-15HR00_evid00660",
            "xa.s12.00.mhz.1975-06-17HR00_evid00662",
            "xa.s12.00.mhz.1975-06-17HR00_evid00662",
            "xa.s12.00.mhz.1977-04-11HR00_evid00915",
            "xa.s12.00.mhz.1977-04-26HR00_evid00924",
            "xa.s12.00.mhz.1977-04-26HR00_evid00924",
            "xa.s12.00.mhz.1977-07-19HR00_evid00991",
            "xa.s12.00.mhz.1977-09-13HR00_evid01012",
            "xa.s15.00.mhz.1973-04-04HR00_evid00098",
            "xa.s15.00.mhz.1973-08-10HR00_evid00126",
            "xa.s15.00.mhz.1973-10-27HR00_evid00134",
            "xa.s15.00.mhz.1974-10-19HR00_evid00157",
            "xa.s15.00.mhz.1974-11-17HR00_evid00162",
            "xa.s15.00.mhz.1974-11-21HR00_evid00166",
            "xa.s15.00.mhz.1974-12-15HR00_evid00169",
            "xa.s15.00.mhz.1974-12-15HR00_evid00170",
            "xa.s15.00.mhz.1975-04-12HR00_evid00190",
            "xa.s15.00.mhz.1975-06-22HR00_evid00194",
            "xa.s16.00.mhz.1973-08-25HR00_evid00443",
            "xa.s16.00.mhz.1973-12-18HR00_evid00487",
            "xa.s16.00.mhz.1973-12-18HR00_evid00487",
            "xa.s16.00.mhz.1974-11-14HR00_evid00587",
            "xa.s16.00.mhz.1972-09-10HR00_evid00075",
            "xa.s16.00.mhz.1972-11-06HR00_evid00079",
            "xa.s16.00.mhz.1972-11-08HR00_evid00080",
            "xa.s16.00.mhz.1972-11-14HR00_evid00081",
            "xa.s16.00.mhz.1973-07-31HR00_evid00123",
            "xa.s16.00.mhz.1974-05-19HR00_evid00146",
            "xa.s16.00.mhz.1974-05-19HR00_evid00146",
            "xa.s16.00.mhz.1974-05-19HR00_evid00146",
            "xa.s16.00.mhz.1974-11-11HR00_evid00160",
            "xa.s16.00.mhz.1974-12-12HR02_evid00168",
            "xa.s16.00.mhz.1974-12-15HR00_evid00172",
            "xa.s16.00.mhz.1974-12-15HR00_evid00172",
            "xa.s16.00.mhz.1974-12-25HR00_evid00174",
            "xa.s16.00.mhz.1974-12-25HR00_evid00174",
            "xa.s16.00.mhz.1975-02-19HR00_evid00180",
            "xa.s16.00.mhz.1975-03-26HR00_evid00186",
            "xa.s16.00.mhz.1975-03-26HR00_evid00186",
            "xa.s16.00.mhz.1977-04-17HR00_evid00249",
            "xa.s16.00.mhz.1977-04-17HR00_evid00249",
            "xa.s16.00.mhz.1977-06-02HR00_evid00255",
            "xa.s15.00.mhz.1974-06-16HR00_evid00536",
            "xa.s15.00.mhz.1974-06-30HR00_evid00542",
            "xa.s15.00.mhz.1974-08-04HR00_evid00557",
            "xa.s15.00.mhz.1975-05-20HR00_evid00653",
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
        setImage("seismic_data_plot_" +`${matchingFiles[0]}` + ".png");
        console.log(image)
    };


    return (
        <div className="pageContainer">
            {/* Left Section with Description and Calendar */}
            <div className="leftContainer">
                {/* Description Section */}
                <div className="descriptionContainer">
                    <h1 style={{ marginBottom: "20px" }}>
                        <FontAwesomeIcon icon={faGlobe} /> Moon
                    </h1>
                    <p style={{ marginBottom: "20px" }}>
                        <FontAwesomeIcon icon={faFileAlt} />
                        The Moon is Earth&apos;s only natural satellite,
                        formed around 4.5 billion years ago, likely
                        due to a massive collision between Earth and
                        a Mars-sized body, often called Theia. The Moon
                        is roughly one-quarter the size of Earth and
                        has a surface area comparable to the size of Africa.
                    </p>
                    <b style={{ marginBottom: "10px", display: "block" }}>Particularities</b>
                    <p style={{ marginBottom: "20px" }}>
                        Seismic activity on the Moon, known as moonquakes, was
                        first detected by seismometers placed by the Apollo missions. These
                        quakes are much weaker than earthquakes, but they can last for up to
                        an hour due to the Moon’s lack of water and its rigid structure, which
                        allows seismic waves to travel longer distances without being absorbed.                     </p>
                    <p>
                        <b>Here are some Moon seismic activity dates detected by NASA:</b>
                    </p>
                    <ul style={{ marginTop: "10px" }}>
                        <li>1975-05-20</li>
                        <li>1970-11-03</li>
                        <li>1970-01-09</li>
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
                <img src={dataDirectory + image} style={{width: "100%", height: "100%"}}></img>
            </div>
        </div>
    );
};

export default MoonDetails;
