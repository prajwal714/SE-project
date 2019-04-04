import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from flask import Flask, request, jsonify
import pickle
import json

app=Flask(__name__)


@app.route("/")
def index():
    return "Flask Server"

@app.route("/postdata",methods=['POST'])
def postdata():
    data=request.get_json()
    print(data)

    import pandas as pd
    from rake_nltk import Rake
    import numpy as np
    from sklearn.metrics.pairwise import cosine_similarity
    from sklearn.feature_extraction.text import CountVectorizer

    pd.set_option('display.max_columns', 100)
    df = pd.read_csv('https://query.data.world/s/uikepcpffyo2nhig52xxeevdialfl7')
    df.head()


    df = df[['Title','Genre','Director','Actors','Plot']]
    df.head()

    #df['Actors'] = df['Actors'].map(lambda x: x.split(',')[:3])
    #df['Genre'] = df['Genre'].map(lambda x: x.lower().split(','))
    #df['Director'] = df['Director'].map(lambda x: x.split(' '))

    #for index, row in df.iterrows():
        #row['Actors'] = [x.lower().replace(' ','') for x in row['Actors']]
        #row['Director'] = ''.join(row['Director']).lower()
        
    df['Key_words'] = ""    
    for index, row in df.iterrows():
        plot = row['Plot']
        r = Rake()
        r.extract_keywords_from_text(plot)
        key_words_dict_scores = r.get_word_degrees()
        row['Key_words'] = list(key_words_dict_scores.keys())
    df.drop(columns = ['Plot'], inplace = True)

    df.set_index('Title', inplace = True)

    df.head()

    df['bag_of_words'] = ''
    columns = df.columns
    for index, row in df.iterrows():
        words = ''
        for col in columns:
            if col != 'Director':
                words = words + ' '.join(row[col])+ ' '
            else:
                words = words + row[col]+ ' '
        row['bag_of_words'] = words
        
    df.drop(columns = [col for col in df.columns if col!= 'bag_of_words'], inplace = True)

    df.head()

    count = CountVectorizer()
    count_matrix = count.fit_transform(df['bag_of_words'])

    indices = pd.Series(df.index)
    indices[:5]

    cosine_sim = cosine_similarity(count_matrix, count_matrix)
    cosine_sim
    recommended_movies = []
    def recommendations(title, cosine_sim = cosine_sim):
            
            print("You are in the recommendations section")
            idx = indices[indices == title].index[0]
            score_series = pd.Series(cosine_sim[idx]).sort_values(ascending = False)
            top_10_indexes = list(score_series.iloc[1:11].index)
            for i in top_10_indexes:
                recommended_movies.append(list(df.index)[i])
            return recommended_movies 
            

    for key,value in data.items():
        
        recommendations(value)
    
    return json.dumps(recommended_movies)



if __name__=="__main__":
    app.run(host='127.0.0.1',port=5000)
