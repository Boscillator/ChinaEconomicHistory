var url = './data.json'

var chartOptions = {'title':'Timeline of Chinies economic enteraction'}       

var chart;
var dataTable;


google.load("visualization","1",{packages:["timeline"]});

google.setOnLoadCallback(drawChart);

function drawChart() {
    
    var container = document.getElementById('timeline');
    
    chart = new google.visualization.Timeline(container);
    dataTable = new google.visualization.DataTable();
    
    dataTable.addColumn({type:'string', id:'Type' });
    dataTable.addColumn({type:'string', id:'Title' });
    dataTable.addColumn({type:'date', id:'Start' });
    dataTable.addColumn({type:'date', id:'End' });
    
    populateTimelineChart();
    
}

function populateTimelineChart() {
    
    $.getJSON(url,function (data) {
        
        $.each(data, function(name,value){
            
            console.log(value);
            
            type = value["type"];
            start = value["start"];
            end = value["end"];
            
            dataTable.addRows([
                [type,name, new Date(start,0,0), new Date(end,11,0)]
            ]);
            
        });
        
        chart.draw(dataTable,chartOptions);
        
    });
    
}