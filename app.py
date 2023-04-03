from flask import Flask, render_template, request, redirect
import mysql.connector 

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="app_estudar"
)

cursor = db.cursor()

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')


@app.route("/read")
def read():
    day = request.args.get('day')
    sql = f"""
        SELECT *
          FROM blocks
         WHERE day = '{day}'
    """ 
    cursor.execute(sql)
    blocks = cursor.fetchall()
    return blocks

@app.route("/insert", methods=["POST"])
def insert():
    title = request.form.get('title')
    studyTime = request.form.get('studyTime')
    content = request.form.get('content')
    day = request.form.get('day')
    sql = f"""
        INSERT INTO blocks ( title, study_time, content, day )
        VALUES ('{title}', {studyTime}, '{content}', '{day}');
    """
    cursor.execute(sql)
    db.commit()
    return redirect('/')

@app.route("/update", methods=['POST'])
def update():
    title = request.form.get('title')
    studyTime = request.form.get('studyTime')
    content = request.form.get('content')
    id = request.form.get('id')
    sql = f"""
        UPDATE blocks 
           SET title = '{title}', study_time = {studyTime}, content = '{content}'
         WHERE block_id = {id}
    """
    cursor.execute(sql)
    db.commit()
    return redirect('/')

@app.route("/delete", methods=['POST'])
def delete():
    id = request.form.get('id') 
    sql = f"""
        DELETE FROM blocks WHERE block_id = {id}
    """
    cursor.execute(sql)
    db.commit()
    return redirect('/')

if __name__ == "__main__":
    app.run(debug=True)