async function fetchMediumFeed() {
  const feedUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@preraktrivedi7&cache_buster=${new Date().getTime()}`;
  
  try {
    const response = await fetch(feedUrl);
    const data = await response.json();
    const container = document.getElementById('blog-feed');
    container.innerHTML = '';

    // Check if articles are available
    if (!data.items || data.items.length === 0) {
      container.innerHTML = '<p>No articles found.</p>';
      return;
    }

    // Display the first 8 items
    data.items.slice(0, 8).forEach(item => {
      const article = document.createElement('article');

      // Clean description by removing HTML tags
      const cleanedDescription = item.description.replace(/<figure[^>]*>.*?<\/figure>/g, '').replace(/<\/?[^>]+(>|$)/g, "");

      article.innerHTML = `
        <header>
          <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
          <span class="date">Published: ${new Date(item.pubDate).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short'
          })}</span>
        </header>
        <p>${cleanedDescription.slice(0, 150)}...</p>
        <a href="${item.link}" class="button" target="_blank">Read on Medium</a>
      `;
      container.appendChild(article);
    });
  } catch (error) {
    console.error('Error fetching the Medium feed:', error);
    document.getElementById('blog-feed').innerHTML = '<p>Unable to load articles at this time. Please try again later.</p>';
  }
}

// Fetch initially on page load
document.addEventListener('DOMContentLoaded', fetchMediumFeed);

// Set interval to refresh every 5 minutes
setInterval(fetchMediumFeed, 300000); // 300000 ms = 5 minutes