var data;

document.addEventListener("DOMContentLoaded", function() {
    var session;
    var colHeadings = ['X', 'Y'];
    data = [
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ],
        [ , , ]
    ],
    container = document.getElementById('example');

    hot = new Handsontable(container, {
        data: data,
        colHeaders: colHeadings,
        colWidths: 298,
        afterGetColHeader: function (col, TH) {
            // nothing for first column
            if (col == -1)
            {
                return;
            }
            }
    });

    $("th").dblclick(function (e) {
        e.preventDefault();
        var a = hot.getSelected();
        var b  = hot.getColHeader(a[1],a[2]);
        var headers = hot.getColHeader();
        var value;

        if($("th").find("input[name='id']").val())
        {
            value  = $("th").find("input[name='id']").val();
            headers[session] = value;
            session = a[1];
            headers[a[1]]="<input name='id' type='text' value="+b+"\>";
            hot.updateSettings({
                colHeaders: headers
            });
        }
        else
        {
            session = a[1];
            headers[a[1]]="<input name='id' type='text' value="+b+"\>";
                  hot.updateSettings({
                colHeaders: headers
            });
      $(this).find("input[name='id']").focus();
        }

    });

    $("th").change(function (e){
      e.preventDefault();
      var a = hot.getSelected();
        var b  = hot.getColHeader(a[1],a[2]);
            var headers = hot.getColHeader();
      var value  = $(this).find("input[name='id']").val();
        headers[a[1]] = value;
        hot.updateSettings({
                    colHeaders: headers
                });
    });

    hot.render();
});


var GraphEditor = Backbone.View.extend({
    chartType: '',

    selectors: {
        barI: document.querySelector('#bar-inputs'),
        lineI: document.querySelector('#line-inputs'),  
        generalI: document.querySelector('#general-inputs'),
        barC: document.querySelector('#barChart'),
        pieC: document.querySelector('#pieChart'),
        lineC: document.querySelector('#lineChart'),
        submit: document.querySelector('#submitButton'),
    },

    backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
    ],

    borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
    ],

    events: {
        'click label': '_labelSelect',
        'mouseover .ui-value': '_dropdown',
        'click #preview-button': '_preview',
        'click #submitButton': '_done'
    },

    _done: function(e){
        if (this.chartType === 'Bar') {
            var chart = this.selectors.barC.toDataURL();
            var width = this.selectors.barC.width;
        } else if (this.chartType === 'Pie') {
            var chart = this.selectors.pieC.toDataURL();
            var width = this.selectors.pieC.width;
        } else {
            var chart = this.selectors.lineC.toDataURL();
            var width = this.selectors.lineC.width;
        }

        Mixmax.done({
        src: chart,
        width: width
      });
    },

    _labelSelect: function(e) {
        const label = e.target.textContent;
        document.querySelector('.ui-value').textContent = label;
        document.querySelector('.ui-options').style.opacity = "0";
        this.selectors.generalI.style.visibility = 'visible';         
        
        if (label === 'Bar Chart') {
            this.selectors.lineI.style.display = 'none';              
            this.selectors.barI.style.display = "inline";
            document.querySelectorAll('.colHeader').forEach((col, i) => {
                if (i % 2 === 0) {
                    col.textContent = 'Labels';
                } else {
                    col.textContent = 'Data';
                }
            })
            this.chartType = 'Bar';
        } else if (label === 'Pie Chart') {
            this.selectors.lineI.style.display = 'none';
            this.selectors.barI.style.display = 'none';
            // document.querySelectorAll('.colHeader').forEach((col, i) => {
            //     if (i % 2 === 0) {
            //         col.textContent = 'Labels';
            //     } else {
            //         col.textContent = 'Data';
            //     }
            // })
            this.chartType = 'Pie';            
        } else {
            this.selectors.lineI.style.display = 'inline';              
            this.selectors.barI.style.display = 'none';
            // document.querySelectorAll('.colHeader').forEach((col, i) => {
            //     if (i % 2 === 0) {
            //         col.textContent = 'X Values';
            //     } else {
            //         col.textContent = 'Y Values';
            //     }
            // })
            this.chartType = 'Line';
        }

        document.querySelectorAll('label').forEach((label) => {
            label.style.display = 'none';
        });
    },

    _dropdown: function(e) {
        document.querySelectorAll('label').forEach((label) => {           
            label.style.display = 'block';
        })
        document.querySelector('.ui-options').style.opacity = "1";
    },

    _preview: function(e) {
        var headers = document.getElementsByClassName('colHeader');
        var finalHeader = [];
        for(var i = 0 ; i < headers.length/2 ; i++){
          finalHeader[i] = headers[i].innerText;
        }

        let labels = [];
        let dataSet = [];

        data.forEach((el) => {
          el.forEach((item, i) => {
            if (i === 0) labels.push(item);
            else dataSet.push(item);
          });
        });

        const plotTitle = document.querySelector('#plot-title').value;
        const lineTitle = document.querySelector('#line-title').value;
        const x = document.querySelector('#line-x').value;
        const y = document.querySelector('#line-y').value;

        if (this.chartType === 'Bar') {
            this.initializeBarChart(plotTitle, labels, dataSet);
        } else if (this.chartType === 'Pie') {
            this.initializePieChart(labels, dataSet);
        } else {
            scatterData = [];
            for (let i = 0; i < labels.length; i++) {
                scatterData.push({
                    x: labels[i],
                    y: dataSet[i]
                })
            }
            console.log(scatterData);

            this.initializeScatterPlot(lineTitle, x, y, scatterData);
        }
    },

    initializeBarChart: function(title, labels, dataSet) {
        var ctx = document.getElementById("barChart").getContext('2d');
        var barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [...labels],
                datasets: [{
                    label: title,
                    data: [...dataSet],
                    backgroundColor: this.backgroundColor,
                    borderColor: this.borderColor,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
              
                maintainAspectRatio: false,
                scaleLabel: "<%= '    ' + value%>"
            },
        });

        this.selectors.barC.style.display = 'inline';
        this.selectors.submit.style.display = 'inline-block';
        this.selectors.pieC.style.display = 'none';
        this.selectors.lineC.style.display = 'none';
    },

    initializePieChart: function(labels, dataSet) {
        var ctx = document.getElementById("pieChart").getContext('2d');
        var pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [...labels],
                datasets: [{
                    data: [...dataSet],
                    backgroundColor: this.backgroundColor,
                    borderColor: this.borderColor,
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,                
            }
        });

        this.selectors.barC.style.display = 'none';
        this.selectors.submit.style.display = 'inline-block';
        this.selectors.pieC.style.display = 'inline';
        this.selectors.lineC.style.display = 'none';
    },

    initializeScatterPlot(title, xTitle, yTitle, dataObj) {
        var ctx = document.getElementById("lineChart").getContext('2d');
        var scatterChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: title,
                    fill: false,    
                    showLine: true,
                    data: dataObj,
                    backgroundColor: this.backgroundColor,
                    borderColor: this.borderColor,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        scaleLabel: {
                          display: true,
                          labelString: yTitle
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: xTitle
                        },
                        type: 'linear',
                        position: 'bottom'
                    }]
                },
                maintainAspectRatio: false,
                
            }
        });

        this.selectors.barC.style.display = 'none';
        this.selectors.submit.style.display = 'inline-block';
        this.selectors.pieC.style.display = 'none';
        this.selectors.lineC.style.display = 'inline';
    }
});

// Create
new GraphEditor({
el: document.body
}).render();
