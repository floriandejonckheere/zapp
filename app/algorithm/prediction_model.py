import requests
import json
import pandas as pd
import pytz
import numpy as np
import os
import warnings

from datetime import datetime, timedelta
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn import metrics

#PREDICTION DONE BY CALLING Predict_labels()

#TODO: save trained model, so retraining doesn't have to take place every time

tz = pytz.timezone('Europe/Berlin')
current_time = datetime.now(tz)

user = os.environ.get('API_USER')
psw = os.environ.get('API_KEY')
ip = '193.166.139.12'

baseURL = f'http://{ip}/api'
URLtoken = f'{baseURL}/users/token'

userData= {'username':f'{user}', 'password':f'{psw}'}
r_token = requests.post(URLtoken, data = userData)
token = r_token.json()['access_token']

is_model = False
scaler = StandardScaler()

def get_start_time():

    formatted_time = current_time.strftime('%Y-%m-%d %H:%M:%S%z')
    formatted_time = formatted_time[:-2] + ':' + formatted_time[-2:]
    #print(formatted_time)
    return formatted_time

def get_end_time():

    one_hour_later = current_time + timedelta(hours=1)
    formatted_time = one_hour_later.strftime('%Y-%m-%d %H:%M:%S%z')

    formatted_time = formatted_time[:-2] + ':' + formatted_time[-2:]
    #print(formatted_time)
    return formatted_time

def data_parse(dataset, program):
    data = {'starttime': dataset[program]['starttime']}

    for key, value in dataset.items():
        data[key] = value['value']
        
    df = pd.DataFrame(data)
    return df

def get_data(data_name, start, end):
    download = 'no'
    startTime = start
    endTime = end
    
    URLprediction = f'{baseURL}/predictions/get/'
    params = {'download':f'{download}',
          'starttime':f'{startTime}',
            'endtime': f'{endTime}',
            'program':[data_name]}
    
    r_pred = requests.get(URLprediction, params=params, headers = {'Authorization':f'Bearer {token}'})
    d_pred = r_pred.json()
    
    value = d_pred[data_name]['value'][0]
    return value

def get_weather_data():
    download = 'no'
    startTime = '2024-05-09 00:00:00+02:00' #row 52141 on production excel '2023-07-01 00:00:00+02:00'
    endTime = '2024-05-23 00:00:00+02:00' #row 69710 on production excel - '2023-08-01 00:00:00+02:00'
    URLprediction = f'{baseURL}/predictions/get/'
    params = {'download':f'{download}',
              'starttime':f'{startTime}',
                'endtime': f'{endTime}',
                'program':["Diffuse_Radiation_60.44751,22.2982",
                       "Direct_Normal_Irradiance_60.44751,22.2982",
                       "Direct_Radiation_60.44751,22.2982",
                       "Temperature_60.44751,22.2982",
                       "Cloud_Cover_60.44751,22.2982",
                       "Spot_price",
    ]}

    r_pred = requests.get(URLprediction, params=params, headers = {'Authorization':f'Bearer {token}'})
    d_pred = r_pred.json()
    return d_pred


def get_power(device, sensor_type): #Devices: Residential_LandisGyrE360, Residential_Load, Residential_LandisGyrE360
                                    #Sensors: Active_power, Energy_import, Energy_export, load_h, AC_power, DC_power
    download = 'no'
    device_name = device
    startTime = '2024-05-09 00:00:00+02:00'
    endTime = '2024-05-23 00:00:00+02:00'
    sensor = sensor_type
    URLprediction = f'{baseURL}/measurements/get/'
    params = {'download':f'{download}',
                'device_name':f'{device_name}',
                'starttime':f'{startTime}',
                'endtime': f'{endTime}',
                'sensor':f'{sensor}'}

    r_inverter = requests.get(URLprediction, params=params, headers = {'Authorization':f'Bearer {token}'})
    d_inverter = r_inverter.json()

    inverter = data_parse(d_inverter, sensor)
    #print(len(inverter))
    return inverter

def predict_labels():
     
    if is_model == False:
        model = train_and_evaluate_model()

    #else: #Save trained model, so it doesnt need to be retrained every time
    #    model = trained_model 
    
    start = get_start_time()
    end = get_end_time()

    value1 = get_data('Diffuse_Radiation_60.44751,22.2982', start, end)
    value2 = get_data('Direct_Normal_Irradiance_60.44751,22.2982', start, end)
    value3 = get_data('Direct_Radiation_60.44751,22.2982', start, end)
    value4 = get_data('Temperature_60.44751,22.2982', start, end)
    #value5 = get_data('Spot_price_60.44751,22.2982', start, end)
    value6 = get_data('Cloud_Cover_60.44751,22.2982', start, end)

    new_data = pd.DataFrame({
        'Diffuse_Radiation_60.44751,22.2982': [value1],
        'Direct_Normal_Irradiance_60.44751,22.2982': [value2],
        'Direct_Radiation_60.44751,22.2982': [value3],
        'Temperature_60.44751,22.2982': [value4],
        #'Spot_price': [value5],
        'Cloud_Cover_60.44751,22.2982': [value6]
    })

    new_data_scaled = scaler.transform(new_data)

    predicted_load = model.predict(new_data_scaled)
    #print("AC_Power: ", predicted_load[0][0], "\nSpot Price: ", predicted_load[0][1], "\nLoad: ", predicted_load[0][2])
    return predicted_load[0]


def train_and_evaluate_model():

    data = data_parse(get_weather_data(), "Diffuse_Radiation_60.44751,22.2982")
    data_all = data.merge(get_power('Residential_LandisGyrE360', 'Active_power'), on='starttime')
    #data_all = data_all.merge(get_power('Residential_LandisGyrE360', 'Energy_import'), on='starttime')
    #data_all = data_all.merge(get_power('Residential_LandisGyrE360', 'Energy_export'), on='starttime')
    data_all = data_all.merge(get_power('Residential_Load', 'load_h'), on='starttime')
    data_all = data_all.merge(get_power('Residential_Kostal_PIKO', 'AC_Power'), on='starttime')
    data_all = data_all.merge(get_power('Residential_Kostal_PIKO', 'DC_Power'), on='starttime')
    data_all = data_all.dropna()

    features = ['Diffuse_Radiation_60.44751,22.2982',
            'Direct_Normal_Irradiance_60.44751,22.2982',
            'Direct_Radiation_60.44751,22.2982',
            'Temperature_60.44751,22.2982',
            'Cloud_Cover_60.44751,22.2982']

    labels = ['AC_Power', 'Spot_price', 'load_h']
    #labels = ['AC_Power']
    #labels = ['DC_power']
    #labels = ['Spot_price']
    #labels = ['load_h']

    X = data_all[features]
    y = data_all[labels]
    #y = y.values.ravel() #Remove if multiple labels
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)

    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, y_pred)

    #print(f"Mean Absolute Error: {mae}")
    #print(f"Mean Squared Error: {mse}")
    #print(f"Root Mean Squared Error: {rmse}")
    #print(f"R^2 Score: {r2}")
    
    #kf = KFold(n_splits=5, shuffle=True, random_state=42)
    #scores = cross_val_score(model, X, y, cv=kf, scoring='neg_mean_squared_error')
    #mse_scores = -scores
    #print("Mean Squared Error for each fold:", mse_scores)
    #print("Average Mean Squared Error:", np.mean(mse_scores))
    #is_model = True
    
    return model
