const API_URL = 'https://script.google.com/macros/s/AKfycbxSZKsdZgIDbokPBeLY-HorkQTjO6uOXa8JktEd4eEJz1H99q0N9fe5HiR_XGwIx24/exec';

async function fetchData() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const tbody = document.querySelector('#data-table tbody');
  tbody.innerHTML = '';
  data.slice(1).forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

document.getElementById('form').addEventListener('submit', async e => {
  e.preventDefault();
  const payload = {
    nama: e.target.nama.value,
    email: e.target.email.value,
    pesan: e.target.pesan.value,
  };
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  e.target.reset();
  fetchData();
});

fetchData();
