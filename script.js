AOS.init({ duration: 800, once: true });

document.getElementById('menu-btn').addEventListener('click', () => {
  document.getElementById('mobile-nav').classList.toggle('hidden');
});

const towns = [
  { name: 'Basud', img: 'basud', desc: 'Beaches and historic lighthouse.' },
  { name: 'Capalonga', img: 'capalonga', desc: 'Waterfalls and hidden caves.' },
  { name: 'Daet', img: 'daet', desc: 'Festivals and vibrant markets.' },
  { name: 'Jose Panganiban', img: 'jose-panganiban', desc: 'Mining history and culture.' },
  { name: 'Labo', img: 'labo', desc: 'Rivers and Mount Isarog gateway.' },
  { name: 'Mercedes', img: 'mercedes', desc: 'Entry to Calaguas Islands.' },
  { name: 'Paracale', img: 'paracale', desc: 'Gold mining heritage town.' },
  { name: 'San Lorenzo Ruiz', img: 'san-lorenzo-ruiz', desc: 'Pilgrimage and architecture.' },
  { name: 'San Vicente', img: 'san-vicente', desc: 'Lagoons and coves.' },
  { name: 'Santa Elena', img: 'santa-elena', desc: 'Natural pools and parks.' },
  { name: 'Talisay', img: 'talisay', desc: 'Heritage homes and local delicacies.' },
  { name: 'Vinzons', img: 'vinzons', desc: 'Spanish-era churches.' }
];

function renderTowns() {
  const container = document.getElementById('towns-container');
  towns.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = 'town-card shadow-md';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', i * 100);
    card.innerHTML = `
      <img src="https://source.unsplash.com/600x400/?${t.img}" alt="${t.name}">
      <div class="info">
        <h3>${t.name}</h3>
        <p>${t.desc}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderTowns);
