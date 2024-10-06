# Import necessary libraries
import pandas as pd
from obspy import read
from datetime import timedelta
import matplotlib.pyplot as plt
from scipy import signal
from matplotlib import cm
import os
from scipy.signal import wiener

# Load the event catalog
cat_directory = './space_apps_2024_seismic_detection/data/mars/test/catalogs/'
cat_file = os.path.join(cat_directory, 'mars_events_of_data.csv')
cat = pd.read_csv(cat_file)

# Define data and output directories
data_directory = './space_apps_2024_seismic_detection/data/mars/test/data/'
output_directory = './space_apps_2024_seismic_detection/data/mars/test/plot/'

# Create output directory if it doesn't exist
os.makedirs(output_directory, exist_ok=True)

# Process each MiniSEED file in the data directory
for file_name in os.listdir(data_directory):
    if file_name.endswith('.mseed'):  # Process only MiniSEED files
        print(f"Processing file: {file_name}")

        # Get the event ID from the filename
        event_id = file_name[:-6]  # Extract event ID from filename
        matching_rows = cat[cat['filename'] == event_id]

        # Skip if no matching event is found
        if matching_rows.empty:
            print(f"No matching event found for {file_name}. Skipping...")
            continue

        row = matching_rows.iloc[0]  # Get the first matching row
        arrival_time_rel = int(row['time_rel(sec)'])  # Get relative arrival time

        # Load the MiniSEED file
        mseed_file = os.path.join(data_directory, file_name)
        st = read(mseed_file)

        # Extract trace data and compute arrival time
        tr = st[0].copy()
        starttime = tr.stats.starttime.datetime
        arrival_time_delta = timedelta(seconds=arrival_time_rel)
        arrival = starttime + arrival_time_delta
        print("Computed Arrival Time: ", arrival)

        # Apply Wiener filter to the seismic data
        tr_data_filtered = wiener(tr.data)

        # Create a plot for the time series data
        fig, ax = plt.subplots(2, 1, figsize=(10, 10))

        # Plot the original seismic data
        ax[0].plot(tr.times(), tr.data, label='Seismic Data')
        ax[0].axvline(x=(arrival - starttime).total_seconds(), color='red', label='Detection')
        ax[0].legend(loc='upper left')
        ax[0].set_xlim([min(tr.times()), max(tr.times())])
        ax[0].set_ylabel('Velocity (m/s)')
        ax[0].set_xlabel('Time (s)')
        ax[0].set_title(f'{file_name} - Time Series Data', fontweight='bold')

        # Apply bandpass filter (0.5 Hz to 1.0 Hz)
        st_filt = st.copy()
        st_filt.filter('bandpass', freqmin=0.5, freqmax=1.0)
        tr_filt = st_filt[0].copy()

        # Create a spectrogram of the filtered data
        f, t, sxx = signal.spectrogram(tr_filt.data, tr_filt.stats.sampling_rate)

        # Plot the spectrogram
        ax2 = plt.subplot(2, 1, 2)
        vals = ax2.pcolormesh(t, f, sxx, cmap=cm.jet, vmax=5e-17)
        ax2.set_xlim([min(tr.times()), max(tr.times())])
        ax2.set_xlabel('Time (Day Hour:Minute)', fontweight='bold')
        ax2.set_ylabel('Frequency (Hz)', fontweight='bold')
        ax2.axvline(x=(arrival - starttime).total_seconds(), c='red')

        # Add color bar for the spectrogram
        cbar = plt.colorbar(vals, orientation='horizontal')
        cbar.set_label('Power ((m/s)^2/sqrt(Hz))', fontweight='bold')

        # Save the plot as a PNG file
        output_filename = os.path.join(output_directory, f'seismic_data_plot_{file_name[:-6]}.png')
        plt.savefig(output_filename, format='png', dpi=300)
        plt.close(fig)
