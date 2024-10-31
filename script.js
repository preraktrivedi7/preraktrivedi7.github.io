async function fetchMediumFeed() {
  const feedUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@preraktrivedi7';
  
  try {
    const response = await fetch(feedUrl);
    const data = await response.json();
    const container = document.getElementById('blog-feed');
    container.innerHTML = '';

    // Fetch the first 8 items
    data.items.slice(0, 8).forEach(item => {
      const article = document.createElement('article');

      // Use item.thumbnail directly, and strip <figure> tags from the description
      const cleanedDescription = item.description.replace(/<figure[^>]*>.*?<\/figure>/g, '');

      article.innerHTML = `
        <header>
          <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
          <span class="date">Published: ${new Date(item.pubDate).toDateString()}</span>
        </header>
        <div class="image fit">
          <img src="${item.thumbnail || 'default-image.jpg'}" alt="${item.title}" />
        </div>
        <p>${cleanedDescription.slice(0, 150)}...</p>
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

document.addEventListener('DOMContentLoaded', fetchMediumFeed);
