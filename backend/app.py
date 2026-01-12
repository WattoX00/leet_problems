from fastapi import FastAPI
import requests

app = FastAPI()

problemUrl = 'https://leetcode-api-pied.vercel.app/problem/'
userUrl = 'https://leetcode-api-pied.vercel.app/user/wattox01' # userName comes here

@app.get('/user')
def getUserJson():
    res = requests.get(userUrl)
    return res.json()

@app.get('/problem/{id}')
def getProblemById(id: str):
    res = requests.get(problemUrl+id)
    return res.json()