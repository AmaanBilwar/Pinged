from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from pymongo import MongoClient


# Load environment variables
load_dotenv()

client = MongoClient(os.getenv('MONGO_URI'))
db = client['pinged']
users_collection = db['users']


app = Flask(__name__)
CORS(app, 
     resources={r"/*": {
         "origins": "http://localhost:3000",
         "supports_credentials": True
     }})

@app.route('/')
def index():
    return "Hello, World!"




if __name__ == '__main__':
    app.run(debug=True, port=8000)
