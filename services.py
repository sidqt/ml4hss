from flask import Flask, Response, jsonify
import json
import urllib
from urllib.request import urlopen
import csv
import pandas as pd
import numpy as np
from sklearn import preprocessing
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, mean_squared_error, r2_score

accuracy_score_naive = 0
accuracy_score_svm = 0 
accuracy_score_logreg = 0
precision_score_yes_naive = 0
precision_score_no_naive = 0
precision_score_yes_svm = 0
precision_score_no_svm = 0
precision_score_yes_logreg = 0
precision_score_no_logreg = 0
mse_min = 0
r2_score_min = 0
mse_max = 0
r2_score_max = 0


# Encode a column to a range between normalized_low and normalized_high.
def encode_numeric_range(df, name, normalized_low=0, normalized_high=1,
                         data_low=None, data_high=None):
    if data_low is None:
        data_low = min(df[name])
        data_high = max(df[name])

    df[name] = ((df[name] - data_low) / (data_high - data_low)) \
               * (normalized_high - normalized_low) + normalized_low

app = Flask(__name__)

@app.route('/')
def test():
    return 'Everything is running! Navigate to Main Page @ static/tut.html'

@app.route('/classification/rain_no_rain/rain_data/original')
def rain_no_rain_viz():
    print("start")
    data_df= pd.read_csv('static/data/weather.csv', delimiter =",")
    data_df['Date'] = pd.date_range(start='1/1/2018', periods=366)
    data_df["Prediction"] = data_df["RainTomorrow"]
    columns=["Date","MinTemp", "MaxTemp", "Rainfall" ,"Humidity9am" ,"Humidity3pm" ,"RainToday", "RainTomorrow", "Prediction"]
    data_df_final = pd.DataFrame(data_df, columns=columns)
    data_df_final[:365].to_csv('static/data/weather_updated.csv')
    with open('static/data/weather_updated.csv', 'r') as file:
        return file.read()

@app.route('/classification/rain_no_rain/rain_data/normalized')
def rain_no_rain_viz_normalized():
    print("start")
    data_df= pd.read_csv('static/data/weather.csv', delimiter =",")
    data_df['Date'] = pd.date_range(start='1/1/2018', periods=366)
    data_df["Prediction"] = data_df["RainTomorrow"]
    columns=["Date","MinTemp", "MaxTemp", "Rainfall" ,"Humidity9am" ,"Humidity3pm" ,"RainToday", "RainTomorrow", "Prediction"]
    data_df_final = pd.DataFrame(data_df, columns=columns)
    encode_numeric_range(data_df_final, "MinTemp")
    encode_numeric_range(data_df_final, "MaxTemp")
    encode_numeric_range(data_df_final, "Rainfall")
    encode_numeric_range(data_df_final, "Humidity9am")
    encode_numeric_range(data_df_final, "Humidity3pm")
    data_df_final[:365].to_csv('static/data/weather_updated_normalized.csv')
    with open('static/data/weather_updated_normalized.csv', 'r') as file:
        return file.read()

@app.route('/classification/rain_no_rain/rain_data/prediction/naive')
def rain_no_rain_viz_prediction_naive():
    print("start")
    data_df= pd.read_csv('static/data/weather.csv', delimiter =",")
    data_df['Date'] = pd.date_range(start='1/1/2018', periods=366)
    data_df["Prediction"] = data_df["RainTomorrow"]
    columns=["Date","MinTemp", "MaxTemp", "Rainfall" ,"Humidity9am" ,"Humidity3pm" ,"RainToday", "RainTomorrow", "Prediction"]
    data_df_final = pd.DataFrame(data_df, columns=columns)
    encode_numeric_range(data_df_final, "MinTemp")
    encode_numeric_range(data_df_final, "MaxTemp")
    encode_numeric_range(data_df_final, "Rainfall")
    encode_numeric_range(data_df_final, "Humidity9am")
    encode_numeric_range(data_df_final, "Humidity3pm")
    
    x_cols=["MinTemp", "MaxTemp", "Rainfall" ,"Humidity9am" ,"Humidity3pm" ,"RainToday"]
    y_col = ["RainTomorrow"]
    
    x_df = pd.DataFrame(data_df_final, columns = x_cols)
    y_df = pd.DataFrame(data_df_final, columns = y_col)
    
    le = preprocessing.LabelEncoder()
    x_df['RainToday'] = le.fit_transform(x_df['RainToday'])
    
    clf = GaussianNB()
    clf.fit(x_df, y_df)

    pred = clf.predict(x_df)

    data_df['Prediction'] = pred

    global accuracy_score_naive
    global precision_score_yes_naive
    global precision_score_no_naive

    accuracy_score_naive = accuracy_score(y_df, pred)
    precision_score_yes_naive = precision_score(y_df, pred, pos_label='Yes')
    precision_score_no_naive = precision_score(y_df, pred, pos_label='No')
    
    data_df[:365].to_csv('static/data/weather_updated_prediction_naive.csv')
    with open('static/data/weather_updated_prediction_naive.csv', 'r') as file:
        return file.read()

@app.route('/classification/rain_no_rain/rain_data/prediction/svm')
def rain_no_rain_viz_prediction_svm():
    print("start")
    data_df= pd.read_csv('static/data/weather.csv', delimiter =",")
    data_df['Date'] = pd.date_range(start='1/1/2018', periods=366)
    data_df["Prediction"] = data_df["RainTomorrow"]
    columns=["Date","MinTemp", "MaxTemp", "Rainfall" ,"Humidity9am" ,"Humidity3pm" ,"RainToday", "RainTomorrow", "Prediction"]
    data_df_final = pd.DataFrame(data_df, columns=columns)
    encode_numeric_range(data_df_final, "MinTemp")
    encode_numeric_range(data_df_final, "MaxTemp")
    encode_numeric_range(data_df_final, "Rainfall")
    encode_numeric_range(data_df_final, "Humidity9am")
    encode_numeric_range(data_df_final, "Humidity3pm")

    x_cols=["MinTemp", "MaxTemp", "Rainfall" ,"Humidity9am" ,"Humidity3pm" ,"RainToday"]
    y_col = ["RainTomorrow"]

    x_df = pd.DataFrame(data_df_final, columns = x_cols)
    y_df = pd.DataFrame(data_df_final, columns = y_col)

    le = preprocessing.LabelEncoder()
    x_df['RainToday'] = le.fit_transform(x_df['RainToday'])

    clf = SVC()
    clf.fit(x_df, y_df)

    pred = clf.predict(x_df)

    data_df['Prediction'] = pred

    global accuracy_score_svm
    global precision_score_yes_svm
    global precision_score_no_svm

    accuracy_score_svm = accuracy_score(y_df, pred)
    precision_score_yes_svm = precision_score(y_df, pred, pos_label='Yes')
    precision_score_no_svm = precision_score(y_df, pred, pos_label='No')
    
    data_df[:365].to_csv('static/data/weather_updated_prediction_svm.csv')
    with open('static/data/weather_updated_prediction_svm.csv', 'r') as file:
        return file.read()

@app.route('/classification/rain_no_rain/rain_data/prediction/logreg')
def rain_no_rain_viz_prediction_logreg():
    print("start")
    data_df= pd.read_csv('static/data/weather.csv', delimiter =",")
    data_df['Date'] = pd.date_range(start='1/1/2018', periods=366)
    data_df["Prediction"] = data_df["RainTomorrow"]
    columns=["Date","MinTemp", "MaxTemp", "Rainfall" ,"Humidity9am" ,"Humidity3pm" ,"RainToday", "RainTomorrow", "Prediction"]
    data_df_final = pd.DataFrame(data_df, columns=columns)
    encode_numeric_range(data_df_final, "MinTemp")
    encode_numeric_range(data_df_final, "MaxTemp")
    encode_numeric_range(data_df_final, "Rainfall")
    encode_numeric_range(data_df_final, "Humidity9am")
    encode_numeric_range(data_df_final, "Humidity3pm")

    x_cols=["MinTemp", "MaxTemp", "Rainfall" ,"Humidity9am" ,"Humidity3pm" ,"RainToday"]
    y_col = ["RainTomorrow"]

    x_df = pd.DataFrame(data_df_final, columns = x_cols)
    y_df = pd.DataFrame(data_df_final, columns = y_col)

    le = preprocessing.LabelEncoder()
    x_df['RainToday'] = le.fit_transform(x_df['RainToday'])

    clf = LogisticRegression()
    clf.fit(x_df, y_df)

    pred = clf.predict(x_df)

    data_df['Prediction'] = pred

    global accuracy_score_logreg
    global precision_score_yes_logreg
    global precision_score_no_logreg

    accuracy_score_logreg = accuracy_score(y_df, pred)
    precision_score_yes_logreg = precision_score(y_df, pred, pos_label='Yes')
    precision_score_no_logreg = precision_score(y_df, pred, pos_label='No')
    
    data_df[:365].to_csv('static/data/weather_updated_prediction_logreg.csv')
    with open('static/data/weather_updated_prediction_logreg.csv', 'r') as file:
        return file.read()

@app.route('/classification/rain_no_rain/rain_data/prediction/metrics/naive')
def rain_no_rain_viz_prediction_metrics_naive():
    
    metrics = {}
    metrics["accuracy"] = accuracy_score_naive
    metrics["precision_yes"] = precision_score_yes_naive
    metrics["precision_no"] = precision_score_no_naive

    print(accuracy_score_naive, precision_score_yes_naive, precision_score_no_naive)

    return jsonify(metrics)

@app.route('/classification/rain_no_rain/rain_data/prediction/metrics/svm')
def rain_no_rain_viz_prediction_metrics_svm():
    
    metrics = {}
    metrics["accuracy"] = accuracy_score_svm
    metrics["precision_yes"] = precision_score_yes_svm
    metrics["precision_no"] = precision_score_no_svm

    print(accuracy_score_svm, precision_score_yes_svm, precision_score_no_svm)

    return jsonify(metrics)

@app.route('/classification/rain_no_rain/rain_data/prediction/metrics/logreg')
def rain_no_rain_viz_prediction_metrics_logreg():
    
    metrics = {}
    metrics["accuracy"] = accuracy_score_logreg
    metrics["precision_yes"] = precision_score_yes_logreg
    metrics["precision_no"] = precision_score_no_logreg

    print(accuracy_score_logreg, precision_score_yes_logreg, precision_score_no_logreg)

    return jsonify(metrics)

@app.route('/regression/temperature/temp_data/original')
def temp_viz_original():
    print("start")
    temp_df = pd.read_csv('static/data/weather.csv', delimiter =",")
    temp_df['Date'] = pd.date_range(start='1/1/2018', periods=366)
    temp_df["Prediction_min"] = temp_df["MinTemp"]
    temp_df["Prediction_max"] = temp_df["MaxTemp"]
    columns_temp=["Date","MinTemp", "MaxTemp","Humidity9am" ,"Humidity3pm" ,"RainToday", "RainTomorrow", "Prediction_min", "Prediction_max"]
    temp_df_final = pd.DataFrame(temp_df, columns=columns_temp)
    temp_df_final[:365].to_csv('static/data/temperature_updated.csv')
    with open('static/data/temperature_updated.csv', 'r') as file:
        return file.read()

@app.route('/regression/temperature/temp_data/normalized')
def temp_viz_normalized():
    print("start")
    temp_df = pd.read_csv('static/data/weather.csv', delimiter =",")
    temp_df['Date'] = pd.date_range(start='1/1/2018', periods=366)
    temp_df["Prediction_min"] = temp_df["MinTemp"]
    temp_df["Prediction_max"] = temp_df["MaxTemp"]
    columns_temp=["Date","MinTemp", "MaxTemp","Humidity9am" ,"Humidity3pm" ,"RainToday", "RainTomorrow", "Prediction_min", "Prediction_max"]
    temp_df_final = pd.DataFrame(temp_df, columns=columns_temp)
    encode_numeric_range(temp_df_final, "MinTemp")
    encode_numeric_range(temp_df_final, "MaxTemp")
    encode_numeric_range(temp_df_final, "Humidity9am")
    encode_numeric_range(temp_df_final, "Humidity3pm")
    encode_numeric_range(temp_df_final, "Prediction_min")
    encode_numeric_range(temp_df_final, "Prediction_max")
    temp_df_final[:365].to_csv('static/data/temperature_normalized.csv')
    with open('static/data/temperature_normalized.csv', 'r') as file:
        return file.read()

@app.route('/regression/temperature/temp_data/prediction')
def temp_viz_prediction():
    print("start")
    temp_df = pd.read_csv('static/data/weather.csv', delimiter =",")
    temp_df['Date'] = pd.date_range(start='1/1/2018', periods=366)
    temp_df["Prediction_min"] = temp_df["MinTemp"]
    temp_df["Prediction_max"] = temp_df["MaxTemp"]
    
    columns_temp=["Date","MinTemp", "MaxTemp","Humidity9am" ,"Humidity3pm" ,"RainToday", "RainTomorrow", "Prediction_min", "Prediction_max"]
    temp_df_final = pd.DataFrame(temp_df, columns=columns_temp)
    
    encode_numeric_range(temp_df_final, "MinTemp")
    encode_numeric_range(temp_df_final, "MaxTemp")
    encode_numeric_range(temp_df_final, "Humidity9am")
    encode_numeric_range(temp_df_final, "Humidity3pm")
    encode_numeric_range(temp_df_final, "Prediction_min")
    encode_numeric_range(temp_df_final, "Prediction_max")

    le = preprocessing.LabelEncoder()
    temp_df_final['RainToday'] = le.fit_transform(temp_df_final['RainToday'])
    temp_df_final['RainTomorrow'] = le.fit_transform(temp_df_final['RainTomorrow'])

    x_df_min_cols=["MaxTemp","Humidity9am" ,"Humidity3pm" ,"RainToday", "RainTomorrow"]
    x_df_max_cols=["MinTemp","Humidity9am" ,"Humidity3pm" ,"RainToday", "RainTomorrow"]
    x_min_df = pd.DataFrame(temp_df_final, columns=x_df_min_cols)
    x_max_df = pd.DataFrame(temp_df_final, columns = x_df_max_cols)

    y_col_min = ["MinTemp"]
    y_col_max = ["MaxTemp"]
    y_min_df = pd.DataFrame(temp_df, columns=y_col_min)
    y_max_df = pd.DataFrame(temp_df, columns=y_col_max)

    min_clf = LinearRegression()
    min_clf.fit(x_min_df, y_min_df)
    pred_min = min_clf.predict(x_min_df)

    max_clf = LinearRegression()
    max_clf.fit(x_max_df, y_max_df)
    pred_max = max_clf.predict(x_max_df)
    
    temp_df["Prediction_min"] = pred_min
    temp_df["Prediction_max"] = pred_max

    global mse_min
    global mse_max
    global r2_score_min
    global r2_score_max

    mse_min = mean_squared_error(y_min_df, pred_min)
    mse_max = mean_squared_error(y_max_df, pred_max)
    r2_score_min = r2_score(y_min_df, pred_min)
    r2_score_max = r2_score(y_max_df, pred_max)

    temp_df[:365].to_csv('static/data/temperature_prediction.csv')
    with open('static/data/temperature_prediction.csv', 'r') as file:
        return file.read()

@app.route('/regression/temperature/temp_data/prediction/metrics')
def temp_viz_prediction_metrics():

    metrics = {}

    metrics["mse_min"] = mse_min
    metrics["mse_max"] = mse_max
    metrics["r2_min"] = r2_score_min
    metrics["r2_max"] = r2_score_max

    return jsonify(metrics)


if __name__ == '__main__':
    app.run()


