document.getElementById("search-button").addEventListener("click", function () {
  const apiKey = "33313110a2354b63bfc5598af59fed15";
  const searchInput = document.getElementById("search-input").value;
  const newsUrl = `https://newsapi.org/v2/everything?q=${searchInput}&apiKey=${apiKey}`;

  fetch(newsUrl)
    .then((response) => response.json())
    .then((data) => {
      displayNews(data.articles);
    })
    .catch((error) => {
      console.error("Error fetching news:", error);
    });
});

function displayNews(articles) {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "";

  articles.forEach((article) => {
    const cardElement = document.createElement("div");
    cardElement.className = "col-md-4 mb-4";

    const cardHtml = `
              <div class="card">
                  <img src="${article.urlToImage || "https://via.placeholder.com/150"}" class="card-img-top" alt="${article.title}">
                  <div class="card-body">
                      <h5 class="card-title">${article.title}</h5>
                      <p class="card-text">${article.description}</p>
                      <a href="${article.url}" target="_blank" class="btn btn-primary">Baca lebih lanjut</a>
                  </div>
              </div>
          `;

    cardElement.innerHTML = cardHtml;
    newsContainer.appendChild(cardElement);
  });
}
