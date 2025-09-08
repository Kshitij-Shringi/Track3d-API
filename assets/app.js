(async function(){
  const contentEl = document.getElementById('content');
  const tocEl = document.getElementById('toc');

  const res = await fetch('API Docs/Track3D API Endpoints.md');
  let md = await res.text();

  md = md.replace(/<style[\s\S]*?<\/style>/gi, '');
  md = md.replace(/<header[^>]*class=["']?page["']?[^>]*>[\s\S]*?<\/header>/gi, '');
  md = md.replace(/<aside[\s\S]*?<\/aside>/gi, '');
  const mainMatch = md.match(/<main[^>]*class=["']?content["']?[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch && mainMatch[1]) md = mainMatch[1];
  md = md.replace(/<div[^>]*class=["']?doc["']?[^>]*>/gi, '').replace(/<\/div>\s*$/i, '');

  // Mark endpoint lines for styling later (capture description after path)
  md = md.replace(/^\*\*(GET|POST|PUT|PATCH|DELETE)\*\*\s+(`?\/[\w\-\/{}]+`?)(.*)$/gmi, '::endpoint::$1::$2::$3');

  const html = marked.parse(md, { mangle: false, headerIds: true });
  contentEl.innerHTML = html;

  // Endpoint transform with description
  contentEl.querySelectorAll('p').forEach(p => {
    if (p.textContent.startsWith('::endpoint::')) {
      const parts = p.textContent.split('::');
      const method = parts[1];
      const pathRaw = parts[2];
      const descRaw = (parts[3] || '').trim();
      const path = pathRaw.replace(/^`|`$/g, '');

      const container = document.createElement('div');
      const div = document.createElement('div');
      div.className = 'endpoint';
      const methodSpan = document.createElement('span');
      methodSpan.className = 'method badge ' + (
        method === 'GET' ? 'badge-get' :
        method === 'POST' ? 'badge-post' :
        method === 'PUT' ? 'badge-put' : 'badge-delete'
      );
      methodSpan.textContent = method;
      const pathSpan = document.createElement('span');
      pathSpan.className = 'path';
      pathSpan.textContent = path;
      div.appendChild(methodSpan);
      div.appendChild(pathSpan);
      container.appendChild(div);

      const desc = descRaw.replace(/^[-–—:\s]+/, '');
      if (desc) {
        const dp = document.createElement('p');
        dp.className = 'endpoint-desc';
        dp.textContent = desc;
        container.appendChild(dp);
      }

      p.replaceWith(container);
    }
  });

  // Headings id cleanup
  const allHeadings = contentEl.querySelectorAll('h1, h2, h3, h4, h5, h6');
  allHeadings.forEach(h => {
    const m = h.textContent.match(/\s*\{#([A-Za-z0-9_-]+)\}\s*$/);
    if (m) { h.textContent = h.textContent.replace(/\s*\{#[A-Za-z0-9_-]+\}\s*$/, ''); h.id = m[1]; }
    if (!h.id) h.id = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  });

  // TOC build
  tocEl.innerHTML = '';
  let currentH1Ul = null, currentH2Ul = null;
  const makeLinkLi = el => { const li = document.createElement('li'); const a = document.createElement('a'); a.href = `#${el.id}`; a.textContent = el.textContent; li.appendChild(a); return li; };
  allHeadings.forEach(h => {
    if (h.tagName === 'H1') {
      const li = makeLinkLi(h); tocEl.appendChild(li); currentH1Ul = document.createElement('ul'); currentH1Ul.className = 'nav sub'; li.appendChild(currentH1Ul); currentH2Ul = null;
    } else if (h.tagName === 'H2') {
      const li = makeLinkLi(h); (currentH1Ul || tocEl).appendChild(li); currentH2Ul = document.createElement('ul'); currentH2Ul.className = 'nav sub'; li.appendChild(currentH2Ul);
    } else if (h.tagName === 'H3') {
      const li = makeLinkLi(h); (currentH2Ul || currentH1Ul || tocEl).appendChild(li);
    }
  });

  // Infer languages for code blocks, then highlight all
  contentEl.querySelectorAll('pre code').forEach(codeEl => {
    const hasLang = /language-/.test(codeEl.className);
    const text = codeEl.innerText.trim();
    if (!hasLang) {
      if (text.startsWith('{') || text.startsWith('[')) codeEl.classList.add('language-json');
      else if (/^curl\s/i.test(text) || /^#!/.test(text)) codeEl.classList.add('language-bash');
      else if (/\bGET\b|\bPOST\b|\bPUT\b|\bDELETE\b/.test(text) && /https?:\/\//.test(text)) codeEl.classList.add('language-bash');
    }
  });
  if (window.hljs && window.hljs.highlightAll) {
    window.hljs.highlightAll();
  }

  // Copy buttons
  contentEl.querySelectorAll('pre').forEach(pre => {
    const codeEl = pre.querySelector('code');
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16.5h8m-8-4h8m-8-4h8M6 19.5A2.25 2.25 0 013.75 17.25V6.75A2.25 2.25 0 016 4.5h9A2.25 2.25 0 0117.25 6.75v10.5A2.25 2.25 0 0115 19.5H6z"/></svg><span>Copy</span>';
    btn.addEventListener('click', async () => {
      const text = codeEl ? codeEl.innerText : pre.innerText;
      try { await navigator.clipboard.writeText(text); btn.querySelector('span').textContent = 'Copied!'; setTimeout(() => (btn.querySelector('span').textContent = 'Copy'), 1200); }
      catch { btn.querySelector('span').textContent = 'Failed'; setTimeout(() => (btn.querySelector('span').textContent = 'Copy'), 1200); }
    });
    pre.appendChild(btn);
  });

  const y = document.getElementById('year'); if (y) y.textContent = String(new Date().getFullYear());
})();
