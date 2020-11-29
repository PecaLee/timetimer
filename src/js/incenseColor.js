//향의 색깔
function incenseColor() {
  const colored = parseInt(NOW / 36);
  let burned;
  if (colored >= 90) {
    burned = `#d3d3d3 ${colored}% 100%`;
  } else {
    burned = `#d3d3d3 ${colored}% ${colored + 10}%, rgba(0,0,0,0) ${
      colored + 15
    }%`;
  }
  slider.style.background = `linear-gradient(to right, #9f755f 0 ${colored}%, ${burned} 
    `;
}
