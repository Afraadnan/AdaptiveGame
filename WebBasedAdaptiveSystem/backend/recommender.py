from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import pandas as pd
import mysql.connector


cnx = mysql.connector.connect(user='root', password='Limbic-AI',
                              host='localhost', database='segp-grp-j')
cursor = cnx.cursor()

query = 'SELECT studentID, resourceIndex, resourceName, rating FROM `segp-grp-j`.resources'

cursor.execute(query)
results = cursor.fetchall()

ds = pd.DataFrame(results, columns=['studentID', 'resourceIndex', 'resourceName', 'rating'])

tfd = TfidfVectorizer(ngram_range=(1, 3), min_df=0, stop_words='english')
tfidf_matrix = tfd.fit_transform(ds['resourceName'])
cosine_similarities = linear_kernel(tfidf_matrix, tfidf_matrix)

results = {}

for idx, row in ds.iterrows():
    similar_indices = cosine_similarities[idx].argsort()[:-100:-1]
    similar_items = [(cosine_similarities[idx][i], ds['resourceIndex'][i]) for i in similar_indices]
    results[row['resourceIndex']] = similar_items[0:]


def item(id):
    """

    :param id: item_id
    :return: resourceName
    """
    return ds.loc[ds['resourceIndex'] == id]['resourceName'].tolist()[0]


def rating(id):
    """

    :param id: item_id
    :return: rating
    """
    return ds.loc[ds['resourceIndex'] == id]['rating'].tolist()[0]


def studentID(id):
    """

    :param id: item_id
    :return: studentID
    """
    return ds.loc[ds['resourceIndex'] == id]['studentID'].tolist()[0]


# Just reads the results out of the dictionary.
def recommend(item_id, num):
    """
    :param item_id: item_id according to skillComponent
    :param num: order of tuples
    """

    print("Recommending " + str(num) + " resources that can help you with " + item(item_id).split('-')[0] + "...")
    print("-------")
    recs = results[item_id][:num]

    b = []

    for rec in recs:
        a = [(item(rec[1]).split("-")[1], rating(rec[1]))]
        b.extend(a)

    sorted_list = sorted(b, key=lambda x: x[1], reverse=True)

    for c in sorted_list:
        print("Recommended: " + c[0] +" " + "(Rating by User:" + " " + str(c[1]) + ")")


if __name__ == '__main__':
    cursor = cnx.cursor()

    query = 'SELECT COUNT(*) FROM resources WHERE resourceName LIKE "%equation%"'

    # Execute the query
    cursor.execute(query)

    # Get the count value for number of resources that is related to equation
    count = cursor.fetchone()[0]

    # Print the count value
    print(count)

    recommend(1, count)

    cursor.close()
    cnx.close()
