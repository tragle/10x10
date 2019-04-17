let problems;

const getProblems = () => {
  let time = Date.now();
  let level = 1;
  let result = [];
  let index = 0; 
  for (let x = 1; x <= 10; x++) {
    for (let y = 1; y <= 10; y++) {
      result.push({
        index,
        level,
        time,
        x,
        y
      });
      index++;
    }
  }
  return result;
}

const init = () => {
  problemsData = localStorage.getItem('problems');
  if (problemsData) problems = JSON.parse(problemsData);
  if (!problems) problems = getProblems();
}

const getProblem = () => {
  let set = problems.filter(r => r.time < Date.now());
  return set[Math.floor(Math.random() * set.length)];
}

const updateProblem = (index, isCorrect) => {
  const problem = problems[index];
  if (isCorrect) {
    problem.level++;
  } else {
    problem.level = 1;
  }
  let time = new Date(problem.time);
  time.setDate(time.getDate() + problem.level);
  problem.time = time.valueOf();
  localStorage.setItem('problems', JSON.stringify(problems));
}

const handleCorrect = (index) => {
  updateProblem(index, true);
}

const handleIncorrect = (index) => {
  updateProblem(index, false);
}
