var url = './data.json'

var chartOptions = {'title':'Timeline of Chinies economic enteraction'}     

var chart;
var dataTable;
var json;


google.load("visualization","1",{packages:["timeline"]});

google.setOnLoadCallback(drawChart);


function pr(a) {
    console.log(a);
    return a;
}

function selectHandeler(e) {
    selection = chart.getSelection();
    name = dataTable.getValue(selection[0].row,1);
    
    discription = pr(json[name]["discription"]);
    
    $("#discription").text(discription);
    
}

function drawChart() {
    
    var container = document.getElementById('timeline');
    
    chart = new google.visualization.Timeline(container);
    dataTable = new google.visualization.DataTable();
    
    dataTable.addColumn({type:'string', id:'Type' });
    dataTable.addColumn({type:'string', id:'Title' });
    dataTable.addColumn({type:'string', role:'tooltip' });
    dataTable.addColumn({type:'date', id:'Start' });
    dataTable.addColumn({type:'date', id:'End' });
    
    populateTimelineChart();
    
    google.visualization.events.addListener(chart, 'select', selectHandeler);

    
}

function populateTimelineChart() {
    
    $.getJSON(url,function (data) {
        
        $.each(data, function(name,value){
            
            //console.log(value);
            
            json = data;
            
            type = value["type"];
            start = value["start"];
            end = value["end"];
            
            dataTable.addRows([
                [type,name,'', new Date(start,0,0), new Date(end,11,0)]
            ]);
            
        });
        
        chart.draw(dataTable,chartOptions);
        
    });
    
}