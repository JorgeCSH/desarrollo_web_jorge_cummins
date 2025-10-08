from flask import Flask, request, render_template, redirect, url_for, session
#from database import db
import filetype
import os

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    mascotas = obtener_ultimas_5()
    return render_template('index.html', mascotas=mascotas)

@app.route('/listado')
def adoption_list():
    avisos = obtener_todos_avisos()
    return render_template('adoption-list.html', avisos=avisos)

@app.route('/publicar', methods=['GET', 'POST'])
def add_adoption():
    if request.method == 'POST':
        # Procesar formulario
        pass
    return render_template('add-adoption.html', regiones=REGIONES)
if __name__ == "__main__":
    app.run(debug=True)