const { spawnSync } = require('child_process');
const bridge = "C:\\Users\\Administrator\\AppData\\Roaming\\reasonix\\skills\\mcp-streamable-connect\\mcp-bridge.js";

function call(params) {
  const j = JSON.stringify(params);
  const r = spawnSync('node', [bridge, 'call', 'tools/call', j], { encoding: 'utf-8', shell: false, windowsHide: true });
  try { return JSON.parse(r.stdout); }
  catch { return { error: r.stdout || r.stderr }; }
}

// Navigate to page 4
const nav = call({name:"chrome_navigate",arguments:{url:"https://ctext.org/post-han/zhs?searchu=%E5%B0%89%E7%BC%AD&page=4"}});
console.log('Nav:', nav.result?.content?.[0]?.text?.substring(0,200));

// Search all occurrences of 尉缭 on this page
const search = call({name:"chrome_javascript",arguments:{code:"const text = document.body.innerText; const lines = text.split('\\n'); const result = []; for(let i=0;i<lines.length;i++){const l=lines[i].trim(); if(l.includes('尉缭')) result.push(l.substring(0,150));} return result.join('\\n').substring(0,5000);"}});
console.log('Results:', search.result?.content?.[0]?.text);
