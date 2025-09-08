(async function(){
  const contentEl = document.getElementById('content');
  const tocEl = document.getElementById('toc');

  // Fetch your existing markdown file
  const res = await fetch('API Docs/Track3D API Endpoints.md');
  let md = await res.text();

  // Remove embedded layout/styles from the markdown file to avoid duplicate sidebar/header
  // Strip <style>...</style>
  md = md.replace(/<style[\s\S]*?<\/style>/gi, '');
  // Strip <header class="page">...</header>
  md = md.replace(/<header[^>]*class=["']?page["']?[^>]*>[\s\S]*?<\/header>/gi, '');
  // Strip <aside ...>...</aside>
  md = md.replace(/<aside[\s\S]*?<\/aside>/gi, '');
  // Keep inner of <main class="content"> if present
  const mainMatch = md.match(/<main[^>]*class=["']?content["']?[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch && mainMatch[1]) {
    md = mainMatch[1];
  }
  // Remove leftover container tags like <div class="doc">...
  md = md.replace(/<div[^>]*class=["']?doc["']?[^>]*>/gi, '').replace(/<\/div>\s*$/i, '');

  // Render markdown
  const html = marked.parse(md, { mangle: false, headerIds: true });
  contentEl.innerHTML = html;

  // Convert trailing `{#custom-id}` fragments in headings into proper ids and remove from text
  const allHeadings = contentEl.querySelectorAll('h1, h2, h3, h4, h5, h6');
  allHeadings.forEach(h => {
    const m = h.textContent.match(/\s*\{#([A-Za-z0-9_-]+)\}\s*$/);
    if (m) {
      h.textContent = h.textContent.replace(/\s*\{#[A-Za-z0-9_-]+\}\s*$/, '');
      h.id = m[1];
    }
    if (!h.id) {
      h.id = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
    }
  });

  // Build hierarchical TOC: H1 > H2 > H3
  tocEl.innerHTML = '';
  let currentH1Ul = null;   // UL under current H1
  let currentH2Ul = null;   // UL under current H2

  allHeadings.forEach(h => {
    if (!(h.tagName === 'H1' || h.tagName === 'H2' || h.tagName === 'H3')) return;

    const makeLinkLi = (el) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${el.id}`;
      a.textContent = el.textContent;
      li.appendChild(a);
      return li;
    };

    if (h.tagName === 'H1') {
      const liH1 = makeLinkLi(h);
      tocEl.appendChild(liH1);
      currentH1Ul = document.createElement('ul');
      currentH1Ul.className = 'nav sub';
      liH1.appendChild(currentH1Ul);
      currentH2Ul = null; // reset H2 context
    } else if (h.tagName === 'H2') {
      const liH2 = makeLinkLi(h);
      // ensure we have an H1 UL; if not, attach directly to toc
      if (!currentH1Ul) {
        currentH1Ul = tocEl; // fallback
      }
      currentH1Ul.appendChild(liH2);
      currentH2Ul = document.createElement('ul');
      currentH2Ul.className = 'nav sub';
      liH2.appendChild(currentH2Ul);
    } else if (h.tagName === 'H3') {
      const liH3 = makeLinkLi(h);
      if (currentH2Ul) {
        currentH2Ul.appendChild(liH3);
      } else if (currentH1Ul) {
        currentH1Ul.appendChild(liH3);
      } else {
        tocEl.appendChild(liH3);
      }
    }
  });

  // Add Copy buttons to code blocks
  contentEl.querySelectorAll('pre').forEach(pre => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.addEventListener('click', async () => {
      const codeEl = pre.querySelector('code');
      const code = codeEl ? codeEl.innerText : pre.innerText;
      try {
        await navigator.clipboard.writeText(code);
        btn.textContent = 'Copied!';
        setTimeout(() => (btn.textContent = 'Copy'), 1200);
      } catch (e) {
        btn.textContent = 'Failed';
        setTimeout(() => (btn.textContent = 'Copy'), 1200);
      }
    });
    pre.appendChild(btn);
  });
})();
