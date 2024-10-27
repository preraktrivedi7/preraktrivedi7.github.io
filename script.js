async function fetchMediumFeed() {
  const feedUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@preraktrivedi7';
  try {
    const response = await fetch(feedUrl);
    const data = await response.json();
    const container = document.getElementById('blog-feed');

    // Clear existing content in the container
    container.innerHTML = '';

    // Loop through the feed items and create article elements
    data.items.slice(0, 6).forEach(item => {
      const article = document.createElement('article');

      article.innerHTML = `
        <header>
          <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
          <span class="date">Published: ${new Date(item.pubDate).toDateString()}</span>
        </header>
        <a href="${item.link}" target="_blank" class="image fit"><img src="${item.thumbnail}" alt="${item.title}" /></a>
        <p>${item.description.slice(0, 150)}...</p>
        <ul class="icons alt">
          <li><a href="${item.link}" class="button" target="_blank">Read on Medium</a></li>
        </ul>
      `;
      container.appendChild(article);
    });
  } catch (error) {
    console.error('Error fetching the Medium feed:', error);
  }
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', fetchMediumFeed);
