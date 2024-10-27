async function fetchMediumFeed() {
  const feedUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@preraktrivedi7';
  try {
    const response = await fetch(feedUrl);
    const data = await response.json();
    const container = document.getElementById('medium-feed');

    data.items.slice(0, 5).forEach(item => {
      const post = document.createElement('div');
      post.innerHTML = `<h3><a href="${item.link}" target="_blank">${item.title}</a></h3><p>${item.pubDate}</p><p>${item.description}</p>`;
      container.appendChild(post);
    });
  } catch (error) {
    console.error('Error fetching the Medium feed:', error);
  }
}

document.addEventListener('DOMContentLoaded', fetchMediumFeed);
