from flask import Flask, render_template, request, jsonify
import pickle
import pandas as pd
import json

app = Flask(__name__)

# loaded_data = pickle.load(open('keyword_dataset.pkl', 'rb'))
cosine_sim = pickle.load(open("cosine_sim.pkl", "rb"))

df = pd.read_csv("keyword_dataset.csv")


def get_title_from_index(index):
    return df[df.index == index]["title"].values[0]


def get_index_from_title(title):
    return df[df.title == title]["index"].values[0]


@app.route("/getCols")
def getCols():
    return [
        "homepage",
        "id",
        "keywords",
    ]


@app.route("/getAllTitles", methods=["GET"])
def getAllTitles():
    # print(cosine_sim)
    # return 0
    df = pd.read_csv("keyword_dataset.csv")["title"].tolist()
    jsonString = json.dumps(df)

    return jsonString
    # return pred_model.get_all_keywords_titles()


# def recommend(keyword_user_likes, x):
#     pass


@app.route("/getRecommendation", methods=["POST"])
def getRecommendation():
    keyword_user_likes = request.json["selected_option"]
    keyword_index = get_index_from_title(keyword_user_likes)
    similar_keywords = list(enumerate(cosine_sim[keyword_index]))
    sorted_similar_keywords = sorted(
        similar_keywords, key=lambda x: x[1], reverse=True
    )[
        1:
    ]  # sort keywords most likely by descresing order
    i = 0
    # print("Top " + str(x) + " similar keywords to "+keyword_user_likes+" are:\n")
    print("Top " + str(5) + " similar keywords to " + keyword_user_likes + " are:\n")
    # x = int(x)
    x = 5
    ans = []
    for element in sorted_similar_keywords:
        print(get_title_from_index(element[0]))
        ans.append(get_title_from_index(element[0]))
        i += 1
        if i > x:
            break
    # return jsonify(recommendations=recommendations)\
    ans2 = json.dumps(ans)
    return render_template(
        "frontend.html", prediction_text="Recommended keywords are:- {} ".format(ans2)
    )

    # pred_model.recommend(data.)
    # return 0


@app.route("/findanswers", methods=["POST"])
def getRecommendation2():
    keyword_user_likes = request.json["selected_option"]
    keyword_index = get_index_from_title(keywords)
    similar_keywords = list(enumerate(cosine_sim[keyword_index]))
    sorted_similar_keywords = sorted(
        similar_keywords, key=lambda x: x[1], reverse=True
    )[
        1:
    ]  # sort keywords most likely by descresing order
    i = 0
    # print("Top " + str(x) + " similar keywords to "+keyword'_user_likes+" are:\n")
    print("Top " + str(5) + " similar keywords to " + keyword_user_likes + " are:\n")
    # x = int(x)
    x = 5
    ans = []
    for element in sorted_similar_keywords:
        print(get_title_from_index(element[0]))
        ans.append(get_title_from_index(element[0]))
        i += 1
        if i > x:
            break
    # return jsonify(recommendations=recommendations)\
    # ans2 = json.dumps(ans)
    return jsonify(recommendations=ans)

    # pred_model.recommend(data.)
    # return 0


@app.route("/")
def hello():
    return render_template("frontend.html")


if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)
    # app.run()
