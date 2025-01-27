from pymongo import MongoClient
from flask import Flask, request, render_template, redirect, url_for
import datetime

app = Flask(__name__)
client = MongoClient("localhost", 27017)
db = client.shahil

@app.route("/")
def login():
    return render_template("index.html")

@app.route("/blog", methods=["GET", "POST"])
def blog():
    return render_template("blog.html")

@app.route("/video", methods=["GET", "POST"])
def video():
    return render_template("video.html")

@app.route("/shop", methods=["GET", "POST"])
def shop():
    return render_template("shop.html")

@app.route("/add_data/blog/", methods=["GET", "POST"])
def add_data_blog():
    if request.method == "POST":
        title = request.form.get("title")
        description = request.form.get("description")
        content = request.form.get("content")
        tag = request.form.get("tag")
        data = {"title": title, "description": description, "content": content, "tags": tag, "views": 0, "date": datetime.datetime.now(tz=datetime.timezone.utc),
        }
        post = db.blogs.insert_one(data).inserted_id
        return redirect(url_for('blog'))
    return render_template("/add_data/blog.html")

@app.route("/add_data/video", methods=["GET", "POST"])
def add_data_video():
    if request.method == "POST":
        title = request.form.get("title")
        url = request.form.get("url")
        data = {"title": title, "url": url, "date": datetime.datetime.now(tz=datetime.timezone.utc),
        }
        post = db.videos.insert_one(data).inserted_id
        return redirect(url_for('video'))
    return render_template("/add_data/video.html")

@app.route("/add_data/shop", methods=["GET", "POST"])
def add_data_shop():
    if request.method == "POST":
        title = request.form.get("title")
        link = request.form.get("link")
        data = {"title": title, "link": link, "date": datetime.datetime.now(tz=datetime.timezone.utc),
        }
        post = db.shops.insert_one(data).inserted_id
        return redirect(url_for('shop'))
    return render_template("/add_data/shop.html")

if __name__ == "__main__":
    app.run(debug=True)