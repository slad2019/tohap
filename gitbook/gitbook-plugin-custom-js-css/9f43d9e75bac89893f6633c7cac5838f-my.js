    let tooltipElem;

    document.onmouseover = function(event) {
      let target = event.target;

      // if we have tooltip HTML...
      let tooltipHtml = target.dataset.tooltip;
      if (!tooltipHtml) return;

      // ...create the tooltip element

      tooltipElem = document.createElement('div');
      tooltipElem.className = 'tooltip';
      tooltipElem.innerHTML = tooltipHtml;
      document.body.append(tooltipElem);

      // position it above the annotated element (top-center)
      let coords = target.getBoundingClientRect();
      let pcoords = target.parentElement.getBoundingClientRect();

      let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
      if (left < pcoords.left) {
        left = pcoords.left; // don't cross the left window edge
      } else if (left + tooltipElem.offsetWidth > pcoords.right) {
        left = pcoords.right - tooltipElem.offsetWidth
      }
      

      let top = coords.top - tooltipElem.offsetHeight - 10;
      if (top < 0) { // if crossing the top window edge, show below instead
        top = coords.top + target.offsetHeight + 10;
      }

      tooltipElem.style.left = left + 'px';
      tooltipElem.style.top = top + 'px';
    };

    document.onmouseout = function(e) {

      if (tooltipElem) {
        tooltipElem.remove();
        tooltipElem = null;
      }

    };
