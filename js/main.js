
// Global objects go here (outside of any functions)
// Set SVG width and height
const w = 500
const h = 300

let difficultyFilter = [];

/**
 * Use bar chart as filter buttons and update scatter plot accordingly
 */
function filterData() {
  if (difficultyFilter.length == 0) {
      scatterplot.data = data;
   } else {
       scatterplot.data = data.filter(d =>
difficultyFilter.includes(d.difficulty));
   }
   scatterplot.updateVis();
}

const dispatcher = d3.dispatch('filterCategories');


dispatcher.on('filterCategories', selectedCategories => {
	if (selectedCategories.length == 0) {
		scatterplot.data = data;
	} else {
		scatterplot.data = data.filter(d => selectedCategories.includes(d.difficulty));
	}
	scatterplot.updateVis();
});


const svg = d3.select('#scatterplot')
    .attr('width', w)
    .attr('height', h);


//data preprocessing
let data, scatterplot, barchart; 

d3.csv('data/vancouver_trails.csv')
   .then(_data => {
     data = _data; // for safety, so that we use a local copy of data.

     data.forEach(d =>{
        d.time = +d.time;
        d.distance = +d.distance;
     })
     const width = w - 55;
     const height = h - 45;
     
     const Xscale = d3.scaleLinear()
     .domain([0, d3.max(data, d => d.distance)])
     .range([0, width]);
 
     const Yscale = d3.scaleLinear()
     .domain([0, d3.max(data, d => d.time)])
     .range([height, 0]);


     

     // Initialize scale
     const colorScale = d3.scaleOrdinal()
     .domain(['Easy', 'Intermediate', 'Difficult'])
     .range(['#a8e6a3', '#4caf50', '#1b5e20']);

     scatterplot = new Scatterplot({parentElement: '#scatterplot', colorScale: colorScale}, data); //we will update config soon
     scatterplot.updateVis();

     barchart = new Barchart({parentElement: '#barchart', colorScale: colorScale}, dispatcher, data);
     barchart.updateVis();
     console.log(data);

     
   })
  .catch(error => console.error(error));



/**
 * Load data from CSV file asynchronously and render charts
 */



/**
 * Use bar chart as filter and update scatter plot accordingly
 */



