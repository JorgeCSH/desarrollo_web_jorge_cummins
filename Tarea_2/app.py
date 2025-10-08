from flask import Flask, request, render_template, redirect, url_for, session
from utils.validations import *
from database import db
from werkzeug.utils import secure_filename
import hashlib
import filetype
import os

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return render_template('index.html', active_page='index')

@app.route('/adoption-list')
def adoption_list():
    return render_template('adoption-list.html', active_page='adoption_list')

@app.route('/add-adoption')
def add_adoption():
    return render_template('add-adoption.html', active_page='add_adoption')

@app.route('/adoption-stats')
def adoption_stats():
    return render_template('adoption-stats.html', active_page='adoption_stats')
