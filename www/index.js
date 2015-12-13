var url = './data.min.json'

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

function setDescription(name) {
    discription = '<h3>'+name+'</h3>';
    discription += pr(json[name]["discription"]);
    alsoSee = pr(json[name]["alsoSee"])
    
    if (alsoSee != null) {
        discription +='<h4>Also See:</h4><ui>'
        $.each(alsoSee,function(index,value){
           discription += '<li><a onClick="setDescription(\''+value+'\');">'+value+'</a></li>';
        });
        discription += "</ui>"
    }
    
    $("#discription").html(discription);
}

function selectHandeler(e) {
    selection = chart.getSelection();
    name = dataTable.getValue(selection[0].row,1);
    
    setDescription(name);
    
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
        json = data;
        $.each(data, function(name,value){
            
            //console.log(value);
            
            
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