// Intro-call requests are sent to this address through FormSubmit (formsubmit.co).
// First-time setup: submit the form once on the live site, then click the
// activation link FormSubmit emails to this address.
// If the service cannot be reached, the form falls back to opening an email draft.
var CONTACT_EMAIL = 'tylerjelrod@gmail.com';

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

  // Swap each photo placeholder for the real image once the file is uploaded.
  document.querySelectorAll('.photo[data-src]').forEach(function (box) {
    var im = new Image();
    im.onload = function () {
      box.textContent = '';
      box.removeAttribute('role');
      box.removeAttribute('aria-label');
      box.classList.add('has-img');
      im.alt = box.getAttribute('data-alt') || '';
      box.appendChild(im);
    };
    im.src = box.getAttribute('data-src');
  });

  var ok = document.getElementById('ok');
  var form = document.getElementById('lead');
  var send = document.getElementById('send');
  function val(id) { return document.getElementById(id).value.trim(); }
  function say(text, warn) {
    ok.textContent = text;
    ok.className = warn ? 'warn' : '';
    ok.hidden = false;
  }
  function draft(fields) {
    var lines = Object.keys(fields).map(function (k) { return k + ': ' + (fields[k] || 'n/a'); });
    return 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent('Intro call request: ' + fields['Player name']) +
      '&body=' + encodeURIComponent(lines.join('\n'));
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var player = val('pn');
    var parent = val('em');
    if (!player || !/^\S+@\S+\.\S+$/.test(parent)) {
      say('Please add the player\'s name and a valid parent or guardian email so we can reply.', true);
      return;
    }
    var fields = {
      'Player name': player,
      'Grade': val('gr'),
      'Position': val('pos'),
      'High school': val('sch'),
      'Parent/guardian email': parent,
      'Message': val('msg')
    };
    var payload = {
      _subject: 'Intro call request: ' + player,
      _template: 'table',
      _captcha: 'false',
      _honey: document.getElementById('hp').value,
      email: parent
    };
    Object.keys(fields).forEach(function (k) { payload[k] = fields[k]; });

    send.disabled = true;
    send.textContent = 'Sending...';
    fetch('https://formsubmit.co/ajax/' + encodeURIComponent(CONTACT_EMAIL), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (!res.ok) { throw new Error('HTTP ' + res.status); }
      return res.json();
    }).then(function (data) {
      if (data && (data.success === true || data.success === 'true')) {
        say('Thanks. Your request is in and we will reply within one business day.', false);
        form.reset();
      } else {
        throw new Error('Not accepted');
      }
    }).catch(function () {
      say('We could not send that automatically. Your email app should open with the request filled in. If it does not, email ' + CONTACT_EMAIL + ' directly.', true);
      window.location.href = draft(fields);
    }).then(function () {
      send.disabled = false;
      send.textContent = 'Request my intro call';
    });
  });
})();
