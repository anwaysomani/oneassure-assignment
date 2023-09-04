from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import bson.json_util as json_util
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

# Configure the MongoDB URI
app.config['MONGO_URI'] = 'mongodb+srv://assignmentaccess:oPjeRkS9x9yGKaxc@assignment.v8ead4w.mongodb.net/assignment'

# initialize mongo connection
def init_conn():
  return PyMongo(app)

# get distinct keys
def get_distinct_values(conn_db, field_name):
    collection = conn_db.db.dataset
    return collection.distinct(field_name)

# get filtered data set
def get_filtered_data(collection, filters):
    return collection.find_one(filters)

# details
@app.route('/details', methods=['POST'])
def filterdata():
  req = request.json

  connected_db = init_conn()
  coll = connected_db.db.dataset
  final_arr = []
  children, adult = 0, 0
  req['age'].sort()

  for i in range(0, len(req['age'])):
    age = req['age'][i]
    entity = get_filtered_data(coll, {
      'TierID': req['tierid'],
      'Age': age,
      'SumInsured': req['sum'],
      'Tenure': req['tenure']
    })

    if age > 19:
      adult += 1
    else:
      children += 1

    k = len(req['age']) > 1 and age != max(req['age'])
    final_arr.append({
      'name': f'Adult {adult}' if age > 18 else f'Child {children}',
      'product_code': entity['ProductCode'],
      'tier_id': entity['TierID'],
      'plan_code': entity['PlanCode'],
      'plan_name': entity['PlanName'],
      'age': entity['Age'],
      'sum': entity['SumInsured'],
      'tenure': entity['Tenure'],
      'rate': entity['Rate'],
      'disc': 50 if k else 0,
      'final_amt': (entity['Rate'] * 0.5) if k else entity['Rate']
    })

  return jsonify({
    "data": final_arr,
    "amount": sum(elem['final_amt'] for elem in final_arr)
  })