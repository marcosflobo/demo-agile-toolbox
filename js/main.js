$( document ).ready(function() {
    var data = [
        {
            jira: "ECO-39",
            desc: "Have a way to override the threat level for a binary",
            estimation: 3,
            points: [0, 0.25, 0.1, 0, 0.75, 0.5, 0.5, 0, 0, 0.9],
            comments: "",
        },{
            jira: "ECO-40",
            desc: "create a .DEB for application library",
            estimation: 8,
            points: [0, 0, 0.5, 1, 0.25, 0.25, 2, 2, 1, 1],
            comments: "",
        },{
            jira: "ECO-41",
            desc: "fix untrusted subdomains in brightcloud",
            estimation: 3,
            points: [0, 0, 0.5, 1, 0.25, 0.25, 1, 0, 0, 0],
            comments: "",
        },
    ];
    for (var i = 0; i < data.length; i ++) {
        var sum = 0;
        $.each(data[i]["points"],function(){ sum+=parseFloat(this) || 0;} );
        var percent_progress = (sum/data[i]["estimation"])*100;
        var html = '<tr id="tr_'+data[i]["jira"]+'">\n' +
            '<td><a href="javascript:void(0)" title="Open Jira PBI"><img src="img/jira.png" style="width: 24px;" /></a><span class="editable">'+data[i]["jira"]+'</span></td>\n' +
            '<td><span class="editable">'+data[i]["desc"]+'</span></td>\n' +
            '<td class="points_done"><span class="editable">'+data[i]["estimation"]+'</span></td>\n' +
            '<td class="points_done" title="'+percent_progress+'%"><div style="border: 1px solid blue"><div style="background-color: #94e4a5; width: '+percent_progress+'%;">'+sum+'</div></div></td>\n';
        for (var j = 0; j < data[i]["points"].length; j ++) {
            html += '<td class="points_done"><span class="editable">'+data[i]["points"][j]+'</span></td>\n';
        }
        html += '<td class="comments editable"><span class="editable">'+data[i]["comments"]+'</span></td>\n' +
        '</tr>';
        $(".table_sprint > tbody:last").after(html);
    }

    var teams = [
        {
            name: "eco",
            members: [
                "Nicolas Muñoz",
                "Marcos Lobo",
            ],
        },{
            name: "phoenix",
            members: [
                "Mohamad Haidar",
                "Joao Fiuza",
            ],
        }
    ];
    for (var i = 0; i < teams.length; i ++) {
        var team_html = '<h3>'+teams[i]["name"]+'</h3>\n' +
            '<h4>Members</h4>\n' +
            '<div class="team_member_list">\n';
        for (var j = 0; j < teams[i]["members"].length; j ++) {
            team_html += '<div class="team_member_item">\n' +
                '  <div class="member_name"><span class="editable">'+teams[i]["members"][j]+'</span></div>\n' +
                '  <div class="member_action_delete"><a href="javascript:void(0);" title="Delete member"><i class="fa fa-trash-o"></i></a></div>\n' +
            '</div>\n';
        }
        team_html += '</div>';
        team_html += '<button>Delete Team</button>';
        $("#team_"+teams[i]["name"]).append(team_html);
    }

    $('span.editable').bind('click', function() {
        $(this).attr('contentEditable', true);
    }).blur(function() {
        $(this).attr('contentEditable', false);
    });
});

function get_sprint_burndown_chart(){
    return {
        title: {
            text: 'Sprint 5 8/11/2017 to 21/11/2017 '
        },

        yAxis: {
            title: {
                text: 'Story points'
            }
        },
        xAxis: {
            title: {
                text: "Days",
            },
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 1
            }
        },

        series: [{
            type: 'column',
            name: 'PBIs done',
            data: [0, 0, 0, 0,0,0,0, 1, 0, 2],
            color: "#b0ff11",
        },{
            type: 'spline',
            name: 'Optimal progress',
            data: [12.6, 11.2, 9.8, 8.4, 7, 5.6, 4.2, 2.8, 1.4, 0],
            color: "#0000ff",
        }, {
            type: 'spline',
            name: 'Team progress',
            data: [14, 13.5, 13.3, 12.8, 11.05, 6.3, 4.8, 2, 2.1, 0],
            color: "green",
        },],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    };
}

function get_release_burdonw_chart(){
    return {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Release 6.14 Burndown'
        },
        xAxis: {
            categories: [
                'Sprint 1',
                'Sprint 2',
                'Sprint 3',
                'Sprint 4',
                'Sprint 5'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Story Points done'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} SP</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Story points',
            data: [15, 20, 30, 35, 34],
            color: "orange"
        }]
    };
}

function get_velocity_chart(){
    return {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Velocity'
        },
        xAxis: {
            categories: [
                'Sprint 1',
                'Sprint 2',
                'Sprint 3',
                'Sprint 4',
                'Sprint 5',
                'Sprint 6',
                'Sprint 7',
                'Sprint 8',
                'Sprint 9',
                'Sprint 10',
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Story Points done'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} SP</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Story points',
            data: [15, 20, 30, 35, 34, 32, 33, 40, 42, 42],
            color: "#00FFAA"
        }]
    };
}

Highcharts.chart('sprint_burndown_chart', get_sprint_burndown_chart());
Highcharts.chart('sprint_burndown_chart_current', get_sprint_burndown_chart());


// Release burndown
Highcharts.chart('release_burndown_chart', get_release_burdonw_chart());
Highcharts.chart('release_burndown_chart2', get_release_burdonw_chart());

// Velocity
Highcharts.chart('velocity_burndown_chart', get_velocity_chart());
Highcharts.chart('velocity_burndown_chart2', get_velocity_chart());
