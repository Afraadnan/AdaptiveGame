import pandas as pd
import mysql.connector
from pyBKT.models import Model
from sqlalchemy import create_engine, DOUBLE, VARCHAR

from django.db import models

class QuizData(models.Model):
    student_id = models.IntegerField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    question_id = models.CharField(max_length=100)
    is_correct = models.BooleanField()

    def __str__(self):
        return f"QuizData {self.pk}: {self.student_id} - {self.question_id}"

user = 'root'
password = 'Limbic-AI'
host = 'localhost'
database = 'segp-grp-j'

cnx = mysql.connector.connect(user='root', password='Limbic-AI', host='localhost', database='segp-grp-j')

engine = create_engine('mysql+mysqlconnector://' + user + ':' + password + '@' + host + '/' + database, echo=False)

cursor = cnx.cursor()

model = Model(seed=42, num_fits=1)


def BKT():
    query = 'SELECT studentID, skillComponent, Correct, start_time, end_time FROM `segp-grp-j`.student'

    cursor.execute(query)
    results = cursor.fetchall()

    df = pd.DataFrame(results, columns=['studentID', 'skillComponent', 'Correct', 'start_time', 'end_time'])

    cursor.close()

    defaults = {'user_id': 'studentID', 'skill_name': 'skillComponent', 'correct': 'Correct', 'start_time': 'start',
                'end_time': 'end', 'multigs': 'studentID'}

    skill = ["addition", "substitution"]

    model.fit(data=df, defaults=defaults, skills=skill, multilearn='studentID', multigs=True)

    params_df = model.params()

    table_name = 'results'

    # Export the result to a new table in MySQL using pandas and sqlalchemy
    params_df.to_sql(table_name, con=engine, if_exists='replace',
                     dtype={'skill': VARCHAR(45), 'param': VARCHAR(45), 'class': VARCHAR(45), 'value': DOUBLE})

    cnx.close()



if __name__ == '__main__':
    BKT()
