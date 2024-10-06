# Import libraries
import numpy as np
import pandas as pd
from obspy import read
from keras.models import load_model
import os

model = load_model('./path_to_your_model/Model_prediction.h5')
data_directory = './space_apps_2024_seismic_detection/data/lunar/test/data/'
predictions = []

def preprocess_input_data(tr_data):
    tr_data = (tr_data - np.mean(tr_data)) / np.std(tr_data)
    return tr_data.reshape(-1, 1)


def extract_time_rel_from_filename(filename):
    parts = filename.split('_')
    for part in parts:
        if 'time_rel' in part:
            return float(part.split('time_rel')[1])
    return None


for filename in os.listdir(data_directory):
    if filename.endswith('.mseed'):
        mseed_file = os.path.join(data_directory, filename)

        st = read(mseed_file)

        tr = st[0].copy()
        tr_data = tr.data

        input_data = preprocess_input_data(tr_data)

        prediction = model.predict(np.array([input_data]))

        time_rel = extract_time_rel_from_filename(filename)

        predictions.append({
            'filename': filename,
            'time_rel(sec)': time_rel,
            'prediction': prediction[0][0]
        })

predictions_df = pd.DataFrame(predictions)

output_csv_file = './predictions_output.csv'
predictions_df.to_csv(output_csv_file, index=False)

print(f"Predictions saved to {output_csv_file}")
