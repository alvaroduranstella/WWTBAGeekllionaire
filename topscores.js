const top5Scores = document.getElementById("top5Scores");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

top5Scores.innerHTML = highScores
    .map(score => {
        return '<li class="high-score">'${score.name} - ${score.score}'</li>';
    })
    .join("");