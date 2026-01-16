from app import getUserJson, getProblemById
import json
from pathlib import Path

# user_data.json

def makeUserData():
    userJson = getUserJson() #json

    name = userJson['username']
    avatarUrl = userJson['profile']['userAvatar']
    realname = userJson['profile']['realName']
    website = userJson['profile']['websites']
    gitUrl = userJson['githubUrl']

    acSubmit = userJson['submitStats']['acSubmissionNum']
    totalSubmit = userJson['submitStats']['totalSubmissionNum']

    userDataJson = {
        "name": name,
        "avatar": avatarUrl,
        "realname": realname,
        "website": website,
        "giturl": gitUrl,
        "accepted": acSubmit,
        "total": totalSubmit
        }
    
    writeUserDataJson(userDataJson)

def writeUserDataJson(data):
    with open('data/user_data.json', 'w') as f:
        return json.dump(data, f, indent=4)

# problem_data.json

def problm(id):

    problemJson = getProblemById(id) #json

    title = problemJson['title']
    stats = json.loads(problemJson['stats'])
    difficulty = problemJson['difficulty']
    url = problemJson['url']

    problemDataJson = {
        "title": title,
        "stats": stats,
        "difficulty": difficulty,
        "url": url
    }

    data = openProblemDataJson()
    data[id] = problemDataJson
    
    writeProblemDataJson(data)

def openProblemDataJson():
    with open('data/problem_data.json', 'r') as f:
        return json.load(f)

def writeProblemDataJson(data):
    with open('data/problem_data.json', 'w') as f:
        return json.dump(data, f, indent=4)

def syncProblemData():
    data = openProblemDataJson()

    for file in Path('problems').iterdir():

        if file.stem not in data:
            problm(file.stem)


# running !!!

# makeUserData()

# syncProblemData()
