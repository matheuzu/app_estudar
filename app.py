from flask import Flask, render_template
import mysql.connector 

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="app_estudar"
)

cursor = db.cursor()

cursor.execute("SELECT * FROM blocks")

blocks = cursor.fetchall()

print(blocks)

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html', blocks=blocks)

if __name__ == "__main__":
    app.run(debug=True)