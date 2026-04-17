document.addEventListener('DOMContentLoaded', function() {
  const closeBtn = document.getElementById('closeBtn');
  const rotateMsg = document.getElementById('rotateMsg');
  if(closeBtn && rotateMsg) {
    closeBtn.addEventListener('click', function() {
      rotateMsg.style.display = 'none';
    });
  }

  const container = document.getElementById('lcdContainer');

  function goToStep(stepName, isHistoryNavigation = false) {
      console.log(stepName, container[0]);
      container.setAttribute('data-step', stepName);

      if (!isHistoryNavigation) {
          history.pushState({ step: stepName }, "", `#${stepName}`);
      }
  }

  window.addEventListener('popstate', function(event) {
      if (event.state && event.state.step) {
          goToStep(event.state.step, true);
      } else {
          goToStep('start', true);
      }
  });

  history.replaceState({ step: 'start' }, "", "#start");
  goToStep('start', true);

  document.addEventListener('click', (e) => {
      const clickTarget = e.target.closest('#startTop, #backStart, #checkBtn, #backPreview, #engravBtn');
      
      if (!clickTarget) return;

      const id = clickTarget.id;

      if (id === 'startTop') goToStep('nfc');
      if (id === 'backStart') goToStep('start');
      if (id === 'checkBtn') goToStep('prep');
      if (id === 'backPreview') goToStep('nfc');
      if (id === 'engravBtn') goToStep('engrave');

  });

});

