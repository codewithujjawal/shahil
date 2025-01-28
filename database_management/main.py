from pymongo import MongoClient
from bson import ObjectId
from flask import Flask, request, render_template, redirect, url_for
import datetime

app = Flask(__name__)
client = MongoClient("localhost", 27017)
db = client.shahil

@app.route("/")
def index():
    return render_template("index.html")

# Blog routes
@app.route("/blog", methods=["GET", "POST"])
def blog():
    data = list(db.blogs.find())
    return render_template("blog.html", data=data)

@app.route("/add_blog", methods=["GET", "POST"])
def add_blog():
    if request.method == "POST":
        title = request.form.get("title")
        description = request.form.get("description")
        content = request.form.get("content")
        tag = request.form.get("tag")
        data = {
            "title": title,
            "description": description,
            "content": content,
            "tags": tag,
            "views": 0,
            "date": datetime.datetime.now(tz=datetime.timezone.utc),
        }
        db.blogs.insert_one(data)
        return redirect(url_for('blog'))
    return render_template("data_manupulation_form/blog.html")

@app.route("/edit_blog/<string:id>", methods=["GET", "POST"])
def edit_blog(id):
    post = db.blogs.find_one({"_id": ObjectId(id)})
    
    if request.method == "POST":
        title = request.form.get("title")
        description = request.form.get("description")
        content = request.form.get("content")
        tag = request.form.get("tag")
        
        updated_data = {
            "title": title,
            "description": description,
            "content": content,
            "tags": tag,
            "date": datetime.datetime.now(tz=datetime.timezone.utc),
        }
        
        db.blogs.update_one({"_id": ObjectId(id)}, {"$set": updated_data})
        return redirect(url_for('blog'))
    
    return render_template("data_manupulation_form/blog.html", post=post)

@app.route("/delete_blog/<string:id>")
def delete_blog(id):
    db.blogs.delete_one({"_id": ObjectId(id)})
    return redirect(url_for('blog'))


# Video routes
@app.route("/video", methods=["GET", "POST"])
def video():
    data = list(db.videos.find())
    return render_template("video.html", data=data)

@app.route("/add_video", methods=["GET", "POST"])
def add_video():
    if request.method == "POST":
        title = request.form.get("title")
        url = request.form.get("url")
        print(f"{title} + {url}")
        data = {
            "title": title,
            "url": url,
            "date": datetime.datetime.now(tz=datetime.timezone.utc),
        }
        db.videos.insert_one(data)
        return redirect(url_for('video'))
    return render_template("data_manupulation_form/video.html")

@app.route("/edit_video/<string:id>", methods=["GET", "POST"])
def edit_video(id):
    post = db.videos.find_one({"_id": ObjectId(id)})
    
    if request.method == "POST":
        title = request.form.get("title")
        url = request.form.get("url")
        
        updated_data = {
            "title": title,
            "url": url,
            "date": datetime.datetime.now(tz=datetime.timezone.utc),
        }
        
        db.videos.update_one({"_id": ObjectId(id)}, {"$set": updated_data})
        return redirect(url_for('video'))
    
    return render_template("data_manupulation_form/video.html", post=post)

@app.route("/delete_video/<string:id>")
def delete_video(id):
    db.videos.delete_one({"_id": ObjectId(id)})
    return redirect(url_for('video'))


# Shop routes
@app.route("/shop", methods=["GET", "POST"])
def shop():
    data = list(db.shops.find())
    return render_template("shop.html", data=data)

@app.route("/add_shop", methods=["GET", "POST"])
def add_shop():
    if request.method == "POST":
        title = request.form.get("title")
        link = request.form.get("link")
        data = {
            "title": title,
            "link": link,
            "date": datetime.datetime.now(tz=datetime.timezone.utc),
        }
        db.shops.insert_one(data)
        return redirect(url_for('shop'))
    return render_template("data_manupulation_form/shop.html")

@app.route("/edit_shop/<string:id>", methods=["GET", "POST"])
def edit_shop(id):
    post = db.shops.find_one({"_id": ObjectId(id)})
    
    if request.method == "POST":
        title = request.form.get("title")
        link = request.form.get("link")
        
        updated_data = {
            "title": title,
            "link": link,
            "date": datetime.datetime.now(tz=datetime.timezone.utc),
        }
        
        db.shops.update_one({"_id": ObjectId(id)}, {"$set": updated_data})
        return redirect(url_for('shop'))
    
    return render_template("data_manupulation_form/shop.html", post=post)

@app.route("/delete_shop/<string:id>")
def delete_shop(id):
    db.shops.delete_one({"_id": ObjectId(id)})
    return redirect(url_for('shop'))


if __name__ == "__main__":
    app.run(debug=True)
