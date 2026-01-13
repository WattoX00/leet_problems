const userUrl = './data/user_data.json';
const problemUrl = './data/problem_data.json';
    
// fetch user_data.json
    
fetch(userUrl)
    .then(res => res.json())
    .then(data => userIntoJs(data));

// fetch problem_data.json

fetch(problemUrl)
    .then(res => res.json())
    .then(data => problemIntoJs(data));

// user

function userIntoJs(userJson) {
    const name = userJson['name'];
    const pfp = userJson['avatar'];
    const web = userJson['website'];
    const git = userJson['giturl'];
    const total = userJson['accepted'][0]['count'];
    
    userJsonDom(name, pfp, web, git, total);
}

function userJsonDom(name, pfp, web, git, total) {
    const userName = document.getElementById('userName');
    const userPfp = document.getElementById('userPfp');
    const websiteUrl = document.getElementById('websiteUrl');
    const githubUrl = document.getElementById('githubUrl');
    const totalSolved = document.getElementById('totalSolved');

    userName.textContent = name;
    userPfp.src = pfp;
    websiteUrl.href = web;
    githubUrl.href = git;
    totalSolved.textContent = total;
}

// problem

function problemElements(problemName, totalAccepted, totalSubmission, difficulty, url) {

    const id = generateId();
    
    const problems = document.getElementById('problems');
    const solvedProblems = document.createElement('div');

    problems.appendChild(solvedProblems);
    solvedProblems.id = `solved_problem_${id}`;
    solvedProblems.classList.add('problem_div')

    const span1 = document.createElement('span');
    solvedProblems.appendChild(span1);
    span1.id = `prob_${id}`;
    span1.textContent = `${id}. `;

    const span2 = document.createElement('span');
    span1.appendChild(span2);
    span2.id = `problemName_${id}`;
    span2.textContent = `${problemName}`;
 
    const p1 = document.createElement('p');
    solvedProblems.appendChild(p1);
    p1.id = `totalAccepted_${id}`;
    p1.textContent = `Total Accepted: ${totalAccepted}`;

    const p2 = document.createElement('p');
    solvedProblems.appendChild(p2);
    p2.id = `totalSubmission_${id}`;
    p2.textContent = `Total Submissions: ${totalSubmission}`;
    
    const p3 = document.createElement('p');
    solvedProblems.appendChild(p3);
    p3.id = `difficulty_${id}`;
    p3.textContent = `${difficulty}`;

    const a = document.createElement('a');
    solvedProblems.appendChild(a);
    a.id = `url_${id}`;
    a.href = `${url}`;

    const python_fetch = document.createElement('button');
    python_fetch.id = `btn_${id}`;
    python_fetch.classList.add('btnF');
    python_fetch.textContent = `Show problem and solution`;
    
    python_fetch.addEventListener('click', (e) => {
        e.stopPropagation();
        fetchPython(id);
    })

    const vision = document.createElement('div');
    vision.classList.add('bonus');
    vision.classList.add('hidden');
    vision.appendChild(p1);
    vision.appendChild(p2);
    vision.appendChild(p3);
    vision.appendChild(a);
    vision.appendChild(python_fetch);
    solvedProblems.appendChild(vision);

}

function problemIntoJs(data) {
    for (key in data){
       const problemName = data[key]['title'];
       const totalAccepted = data[key]['stats']['totalAccepted'];
       const totalSubmission =  data[key]['stats']['totalSubmission'];
       const difficulty = data[key]['difficulty'];
       const url = data[key]['url'];
       problemElements(problemName, totalAccepted, totalSubmission, difficulty, url);
    }
}

const problemDivs = document.getElementById('problems');

problemDivs.addEventListener('click', (e) => {
    const clickedElement = e.target.closest('.problem_div');
    if (e.target.closest('.btnF')) return;
    if (!clickedElement) return;
    const toggleElement = clickedElement.querySelector('.bonus');
    if (toggleElement) {
        toggleElement.classList.toggle('hidden');
    };
});

// id generator

const generateId = (() => {
    let id = 1;
    return () => id++
})();

let cache = {};
async function fetchPython(id) {
    if (id in cache) return showPyhton(cache[id]);
    
    const pyton = `./problems/${id}.py`;
    const res = await fetch(pyton);
    const data = await res.text();

    cache[id] = data;

    showPyhton(data);
};

function showPyhton(data) {
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popupText');
    popupText.textContent = data;
    popup.classList.toggle('popup_toggle');
};

const closePopup = document.getElementById('closePopup');

closePopup.addEventListener('click', (e) => {
    popup.classList.toggle('popup_toggle');
});