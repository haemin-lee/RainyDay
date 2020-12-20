### how to run api for ai stuff

to download library:
pip install flask
pip install numpy

once downloaded, to run from parent directory (should be in /models):
windows:
set FLASK_APP=flaskr
set FLASK_ENV=development
flask run

bash:
export FLASK_APP=flaskr
export FLASK_ENV=development
flask run
