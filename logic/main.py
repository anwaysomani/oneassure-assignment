from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import bson.json_util as json_util


print("Starts here")
app = Flask(__name__)

# Configure the MongoDB URI
app.config['MONGO_URI'] = 'mongodb+srv://assignmentaccess:oPjeRkS9x9yGKaxc@assignment.v8ead4w.mongodb.net/assignment'

def init_conn():
  return PyMongo(app)

# get distinct keys
def get_distinct_values(conn_db, field_name):
    collection = conn_db.db.dataset
    return collection.distinct(field_name)

# get filtered data set
def get_filtered_data(collection, filters):
    return collection.find_one(filters)


@app.route('/', methods=['POST'])
def filterdata():
  req = request.json

  connected_db = init_conn()
  coll = connected_db.db.dataset

  # from db, fetch each individual entry and add to array
  """
  filter_design:
  - tier_id
  - sum_insured
  - tenure
  - age > array(int)
  """

  final_arr = []

  for i in range(0, len(req['age'])):
    # 1. fetch exact value from db
    entity = get_filtered_data(coll, {
      'TierID': req['tierid'],
      'Age': req['age'][i],
      'SumInsured': req['sum'],
      'Tenure': req['tenure']
    })

    # 2. add to final array
    final_arr.append({
      'product_code': entity['ProductCode'],
      'tier_id': entity['TierID'],
      'plan_code': entity['PlanCode'],
      'plan_name': entity['PlanName'],
      'age': entity['Age'],
      'sum': entity['SumInsured'],
      'tenure': entity['Tenure'],
      'rate': entity['Rate'],
    })

  print(final_arr)

  return jsonify({
    "msg": "Successfully stored data set",
    "code": 200,
    "data": final_arr
  })