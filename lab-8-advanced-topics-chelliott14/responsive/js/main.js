/**
 * Load data from CSV file asynchronously and render scatter plot
 */
let data, scatterplot;
d3.csv('data/vancouver_trails.csv')
  .then(_data => {
    data = _data;
    data.forEach(d => {
      d.time = +d.time;
      d.distance = +d.distance;
    });
    
    scatterplot = new Scatterplot({ parentElement: '#scatterplot'}, data);
    scatterplot.updateVis();
  })
  .catch(error => console.error(error));


  let pageLoad = true;
  d3.select(window).on('resize', () => {
  if (pageLoad) {
          pageLoad = false;
      } else {
          scatterplot.updateVis()
      }
  });
  
