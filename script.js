// Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // Plan selection scroll
  function selectPlan(name, price) {
    const select = document.getElementById('selectedPlan');
    for (const opt of select.options) {
      if (opt.value.startsWith(name)) { select.value = opt.value; break; }
    }
  }

  // File drop label update
  const fileInput = document.getElementById('screenshotFile');
  const fileDrop = document.getElementById('fileDrop');
  const fdTitle = document.getElementById('fdTitle');
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      fdTitle.textContent = '✓ ' + fileInput.files[0].name;
      fileDrop.classList.add('has-file');
    } else {
      fdTitle.textContent = 'اضغط هنا أو اسحب الصورة';
      fileDrop.classList.remove('has-file');
    }
  });

  // Confirm payment -> open WhatsApp
  function confirmPayment() {
    const phone = document.getElementById('transferPhone').value.trim();
    if (!phone) {
      alert('من فضلك اكتب رقم الهاتف اللي حولت منه أولاً');
      return;
    }
    const planData = document.getElementById('selectedPlan').value.split('|');
    const planName = planData[0];
    const planPrice = planData[1];
    const coachNumber = '201090044618';
    const msg = 'السلام عليكم، أنا مشترك جديد في EL3almy Gym.' +
      '\nالباقة: ' + planName +
      '\nالمبلغ: ' + planPrice + ' جنيه' +
      '\nرقم الهاتف اللي حولت منه: ' + phone +
      '\n(هبعتلكم صورة إثبات التحويل دلوقتي)';
    const url = 'https://wa.me/' + coachNumber + '?text=' + encodeURIComponent(msg);
    window.open(url, '_blank');
  }
