// Set this to the address that should receive intro-call requests.
// The form opens the visitor's email app with the request pre-filled.
var CONTACT_EMAIL = 'hello@yourdomain.com';

(function () {
  var levels = [
    { id: 'FBS', name: 'FBS', blurb: 'The top tier of college football, with the largest programs, staffs and recruiting budgets. Competition for each spot is national.',
      rows: [['Athletic aid', 'Yes. Full scholarships are possible.'], ['Who it fits', 'Players who stand out in size, speed or production against top competition.'], ['What to know', 'Recruiting starts early and staffs lean on camps, film and trusted coaches. Preferred walk-on offers are common.']] },
    { id: 'FCS', name: 'FCS', blurb: 'Highly competitive football with a different scholarship structure than FBS. A strong landing spot for players just under FBS thresholds.',
      rows: [['Athletic aid', 'Yes. Aid is often split across the roster.'], ['Who it fits', 'Players with strong film and a profile that matches a program\'s needs and academics.'], ['What to know', 'Many programs recruit regionally, so Virginia and the mid-Atlantic matter.']] },
    { id: 'D2', name: 'Division II', blurb: 'A balance of football, academics and campus life, with smaller staffs and rosters than the divisions above.',
      rows: [['Athletic aid', 'Yes, usually partial and often combined with academic aid.'], ['Who it fits', 'Players who want to compete early and keep costs manageable.'], ['What to know', 'Outreach from the player carries real weight. Aid packages vary widely, so compare totals.']] },
    { id: 'D3', name: 'Division III', blurb: 'Football at schools that put academics first, with strong alumni networks and a wide range of campus types.',
      rows: [['Athletic aid', 'No athletic scholarships. Academic and need-based aid apply.'], ['Who it fits', 'Players who value the school first and the football second, or equally.'], ['What to know', 'Grades and test profile can matter as much as film. Coaches often help with admissions.']] },
    { id: 'NAIA', name: 'NAIA', blurb: 'A separate athletic association with its own rules, often with flexible timelines for recruiting and admissions.',
      rows: [['Athletic aid', 'Yes. Awards vary by school.'], ['Who it fits', 'Players who missed earlier windows or want a smaller program with real playing time.'], ['What to know', 'Eligibility rules differ from the NCAA, so check requirements separately.']] },
    { id: 'JUCO', name: 'Junior college', blurb: 'A two-year route to play right away, strengthen academics or build film before moving to a four-year school.',
      rows: [['Athletic aid', 'Varies by college and state.'], ['Who it fits', 'Late bloomers and players who need time to qualify or develop.'], ['What to know', 'Transfer paths are real but not automatic. Plan credits and film from day one.']] }
  ];
  var tabs = document.getElementById('tabs');
  var panel = document.getElementById('panel');
  function show(i) {
    var l = levels[i];
    var btns = tabs.querySelectorAll('button');
    for (var b = 0; b < btns.length; b++) {
      btns[b].setAttribute('aria-selected', b === i ? 'true' : 'false');
      btns[b].tabIndex = b === i ? 0 : -1;
    }
    var html = '<h3>' + l.name + '</h3><p class="blurb">' + l.blurb + '</p><dl class="rows">';
    for (var r = 0; r < l.rows.length; r++) {
      html += '<div><dt>' + l.rows[r][0] + '</dt><dd>' + l.rows[r][1] + '</dd></div>';
    }
    panel.innerHTML = html + '</dl>';
    panel.setAttribute('aria-labelledby', 'tab-' + l.id);
  }
  levels.forEach(function (l, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.id = 'tab-' + l.id; b.setAttribute('role', 'tab');
    b.textContent = l.name;
    b.addEventListener('click', function () { show(i); });
    b.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = (i + 1) % levels.length;
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = (i + levels.length - 1) % levels.length;
      if (n !== null) { e.preventDefault(); show(n); tabs.querySelectorAll('button')[n].focus(); }
    });
    tabs.appendChild(b);
  });
  show(0);

  var ok = document.getElementById('ok');
  var form = document.getElementById('lead');
  var configured = CONTACT_EMAIL.indexOf('yourdomain.com') === -1;
  if (configured) {
    document.querySelectorAll('[data-contact-email]').forEach(function (el) {
      el.textContent = CONTACT_EMAIL;
      el.classList.remove('ph');
    });
  }
  function val(id) { return document.getElementById(id).value.trim(); }
  function say(text, warn) {
    ok.textContent = text;
    ok.className = warn ? 'warn' : '';
    ok.hidden = false;
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var player = val('pn');
    var parent = val('em');
    if (!player || !/^\S+@\S+\.\S+$/.test(parent)) {
      say('Please add the player\'s name and a valid parent or guardian email so we can reply.', true);
      return;
    }
    if (!configured) {
      say('Contact email not set yet. Add your address to CONTACT_EMAIL at the top of script.js.', true);
      return;
    }
    var lines = [
      'Player: ' + player,
      'Grade: ' + val('gr'),
      'Position: ' + (val('pos') || 'n/a'),
      'High school: ' + (val('sch') || 'n/a'),
      'Parent/guardian email: ' + parent,
      '',
      val('msg')
    ];
    var href = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent('Intro call request: ' + player) +
      '&body=' + encodeURIComponent(lines.join('\n'));
    say('Your email app should open with this request filled in. If it does not, email ' + CONTACT_EMAIL + ' directly.', false);
    window.location.href = href;
  });
})();
