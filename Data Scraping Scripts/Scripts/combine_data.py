import os
import json

PATH_TO_FIRST_DATA_FILE = os.path.join('..', '..', 'Dataset', '2009-2015.json') 
PATH_TO_SECOND_DATA_FILE = os.path.join('..', '..', 'Dataset', '2016-2018.json') 
PATH_TO_OUTPUT_FILE = os.path.join('..', '..', 'Dataset', 'final.json')

x = json.loads(open(PATH_TO_FIRST_DATA_FILE, 'r').read())
y = json.loads(open(PATH_TO_SECOND_DATA_FILE, 'r').read())

x.update(y)

json_dict = json.dumps(x)
open(PATH_TO_OUTPUT_FILE, 'w').write(json_dict)