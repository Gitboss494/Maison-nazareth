/* script.js : commun à toutes les pages */

/* ===== AGENDA : modifiez cette liste (date au format AAAA-MM-JJ) ===== */
const EVENTS = [
  {
    date: '2026-12-24',
    titre: 'Veillée et messe de Noël (exemple)',
    heure: '[heure à préciser]',
    lieu: 'Mvolyé, Yaoundé',
    description: 'Exemple à remplacer par vos vrais événements.'
  },
  {
    date: '2026-12-13',
    titre: 'Retraite spirituelle de l’Avent (exemple)',
    heure: '[heure à préciser]',
    lieu: 'Maison Nazareth, Mvolyé',
    description: 'Une journée de silence, de prière et de partage. Exemple à remplacer.'
  },
  {
    date: '2026-10-04',
    titre: 'Journée communautaire (exemple)',
    heure: '[heure à préciser]',
    lieu: 'Mvolyé, Yaoundé',
    description: 'Messe suivie d’un repas fraternel. Exemple à remplacer.'
  }
];

document.addEventListener('DOMContentLoaded', () => {

  // Année du pied de page
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Animation de la page d'accueil
  setTimeout(() => {
    const title = document.getElementById('main-title');
    const text = document.getElementById('hero-text');
    if (title) title.classList.add('visible');
    if (text) text.classList.add('visible');
  }, 100);

  // Agenda (uniquement sur agenda.html)
  const upcoming = document.getElementById('agendaUpcoming');
  const past = document.getElementById('agendaPast');
  if (upcoming && past) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const toDate = (e) => new Date(e.date + 'T12:00:00');
    const sorted = [...EVENTS].sort((a, b) => toDate(a) - toDate(b));
    fill(upcoming, sorted.filter((e) => toDate(e) >= today), 'Aucun événement annoncé pour le moment.');
    fill(past, sorted.filter((e) => toDate(e) < today).reverse(), 'Aucun événement passé à afficher.');
  }

  function fill(list, events, emptyText) {
    list.innerHTML = '';
    if (!events.length) {
      const li = document.createElement('li');
      li.className = 'empty';
      li.textContent = emptyText;
      list.appendChild(li);
      return;
    }
    events.forEach((e) => {
      const d = new Date(e.date + 'T12:00:00');
      const li = document.createElement('li');
      li.className = 'card';

      const badge = document.createElement('div');
      badge.className = 'date-badge';
      const day = document.createElement('span');
      day.className = 'day';
      day.textContent = d.getDate();
      const month = document.createElement('span');
      month.className = 'month';
      month.textContent = d.toLocaleDateString('fr-FR', { month: 'short' });
      badge.append(day, month);

      const body = document.createElement('div');
      body.className = 'event';
      const h3 = document.createElement('h3');
      h3.textContent = e.titre;
      const meta = document.createElement('p');
      meta.className = 'meta';
      meta.textContent = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
        + ' · ' + e.heure + ' · ' + e.lieu;
      const desc = document.createElement('p');
      desc.textContent = e.description;
      body.append(h3, meta, desc);

      li.append(badge, body);
      list.appendChild(li);
    });
  }
});
