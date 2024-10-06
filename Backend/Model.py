# Import libraries
import pickle
import numpy as np
import pandas as pd
from obspy import read
import time
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.preprocessing import StandardScaler
from tensorflow import keras
from tensorflow.keras import layers
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.svm import SVC
import os

# Step 1: Load the catalog data
cat_directory = './space_apps_2024_seismic_detection/data/lunar/training/catalogs/'
cat_file = cat_directory + 'apollo12_catalog_GradeA_final.csv'
cat = pd.read_csv(cat_file)


# Function to list CSV files in a directory
def list_csv_files(directory):
    try:
        csv_file_names = [os.path.splitext(f)[0] for f in os.listdir(directory)
                          if f.endswith('.csv') and os.path.isfile(os.path.join(directory, f))]
        return csv_file_names
    except Exception as e:
        print(f"An error occurred: {e}")
        return []


# Step 2: Read and plot each CSV file corresponding to detections
data_directory = './space_apps_2024_seismic_detection/data/lunar/training/data/S12_GradeA/'
files = list_csv_files(data_directory)

for tf in files:
    csv_file = f'{data_directory}{tf}.csv'

    # Get the corresponding event time
    try:
        index = cat.iloc[cat.index[cat['filename'] == tf].tolist()[0]]
    except IndexError:
        print(f"Filename '{tf}' not found in 'cat' DataFrame.")
        continue  # Skip this iteration if the index is not found

    it = index['time_rel(sec)']

    # Read the seismic data
    data_cat = pd.read_csv(csv_file)
    csv_times_dt = np.array(data_cat['time_rel(sec)'].tolist())
    csv_data = np.array(data_cat['velocity(m/s)'].tolist())

    # Plot the trace
    plt.figure(figsize=(10, 5))
    plt.plot(csv_times_dt, csv_data, label='Velocity')
    plt.xlim((np.min(csv_times_dt), np.max(csv_times_dt)))
    plt.ylabel('Velocity (m/s)')
    plt.title(f'{tf}', fontweight='bold')

    # Plot the arrival time
    arrival_line = plt.axvline(x=it, c='red', label='Rel. Arrival')
    plt.legend(handles=[arrival_line])
    plt.xlabel('Time (month-day hour)')
    plt.tight_layout()

    # Save the plot as a PNG file
    plt.savefig(f'seismic_data_plot_{tf}.png', format='png', dpi=300)  # Save plot
    plt.close()  # Close the figure to free memory
    time.sleep(5)

# Step 3: Combine all data for machine learning
target_data = pd.read_csv(cat_file)
combined_data = pd.DataFrame()

for tf in files:
    file = f'{data_directory}{tf}.csv'
    df = pd.read_csv(file)
    target_row = target_data.loc[target_data['filename'] == tf]

    if not target_row.empty:
        for i in df['time_abs(%Y-%m-%dT%H:%M:%S.%f)'].values[:]:
            df['event'] = 1 if target_row['time_abs(%Y-%m-%dT%H:%M:%S.%f)'].values[0][:-10] == i[:-10] else 0
        combined_data = pd.concat([combined_data, df])

# Set the index to the time column and sort
combined_data['time'] = pd.to_datetime(combined_data['time_abs(%Y-%m-%dT%H:%M:%S.%f)'])
combined_data.set_index('time', inplace=True)
combined_data.sort_index(inplace=True)

# Step 4: Data splitting for model training
X = combined_data.drop(columns=['event'])  # Features
y = combined_data['event']  # Target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 5: Using Random Forest
rf_classifier = RandomForestClassifier(n_estimators=100, random_state=42)
rf_classifier.fit(X_train, y_train)  # Train the model
y_pred = rf_classifier.predict(X_test)  # Make predictions

# Print Random Forest results
print("Random Forest Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print("\nRandom Forest Classification Report:")
print(classification_report(y_test, y_pred))

# Step 6: Using Gradient Boosting (XGBoost)
xgb_classifier = XGBClassifier(use_label_encoder=False, eval_metric='logloss')
xgb_classifier.fit(X_train, y_train)  # Train the model
y_pred = xgb_classifier.predict(X_test)  # Make predictions

# Print XGBoost results
print("XGBoost Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print("\nXGBoost Classification Report:")
print(classification_report(y_test, y_pred))

# Step 7: Using Support Vector Machine
svm_classifier = SVC(kernel='linear', random_state=42)
svm_classifier.fit(X_train, y_train)  # Train the model
y_pred = svm_classifier.predict(X_test)  # Make predictions

# Print SVM results
print("SVM Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print("\nSVM Classification Report:")
print(classification_report(y_test, y_pred))

# Step 8: Scale the data and create a neural network model
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)  # Fit and transform the training data
X_test = scaler.transform(X_test)  # Transform the test data

# Define the neural network model
model = keras.Sequential([
    layers.Input(shape=(X_train.shape[1],)),  # Input layer
    layers.Dense(16, activation='relu'),  # Hidden layer with 16 neurons
    layers.Dense(8, activation='relu'),  # Hidden layer with 8 neurons
    layers.Dense(1, activation='sigmoid')  # Output layer
])

# Compile and train the model
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=100, batch_size=5, verbose=1)

# Save the model as an .h5 file
model.save('Model_prediction.h5')  # Save the trained model

# Make predictions with the neural network
y_pred = (model.predict(X_test) > 0.5).astype("int32")  # Apply threshold

# Print Neural Network results
print("Neural Network Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print("\nNeural Network Classification Report:")
print(classification_report(y_test, y_pred))
