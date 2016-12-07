var renderTo = {}
renderTo.volume = {}; renderTo.volume.toRender = true;
renderTo.cost = {}; renderTo.cost.toRender = true;
renderTo.rate = {}; renderTo.rate.toRender = false;

function setUpLoadShipments() {
    SetEventsForDOMElements();

    $('#start_date').val(DATE_TIME.f_qq_range.start_date);
    $('#end_date').val(DATE_TIME.f_qq_range.end_date);
    RenderPage();       
}

function GetValuesFromURL() {
    var site = GetValueToURL('site', "");
    if (site!= "") {
        $("#site option[value='" + site + "']").attr('selected', 'selected');        
    }    
}

function SetEventsForDOMElements() {
   
    SetUpCalendar($("#start_date, #end_date"), "start_date");

    $("input:radio[name=radio-range-date]").change(function () {

        if ($(this).val() == "YY") { $('#start_date').val(DATE_TIME.f_yy_range.start_date); $('#end_date').val(DATE_TIME.f_yy_range.end_date); }
        if ($(this).val() == "QQ") { $('#start_date').val(DATE_TIME.f_qq_range.start_date); $('#end_date').val(DATE_TIME.f_qq_range.end_date); }
        if ($(this).val() == "MM") { $('#start_date').val(DATE_TIME.f_mm_range.start_date); $('#end_date').val(DATE_TIME.f_mm_range.end_date); }
        if ($(this).val() == "WK") { $('#start_date').val(DATE_TIME.f_wk_range.start_date); $('#end_date').val(DATE_TIME.f_wk_range.end_date); }
        
        
        RenderPage()
    });  

    $('input:radio[name=radio-group]').change(function () {
        GetSummaryShipmentsByDatePart($("#site").val(), $("#type_shippment").val(), $("#type_payment").val(),$(this).val(), $("#start_date").val(), $("#end_date").val());
    });    
    
    $("#type_shippment").change(function () {
        RenderPage();
        if($(this).val() == 'OB')
            $('#title_module_header').text("Outbound Payments");
        else
            $('#title_module_header').text("Inbound Payments");
    });

    $("#type_payment").change(function () {
        RenderPage();
    });

    $("#type_shipper").change(function () {
        RenderPage();
    });

    $("#site").change(function () {
        RenderPage();        
    });

    $('#more_info_shipments').click(function () {
        DrawPieChart("container_chart_shipments_by_carrier", "Shipments by carrier", SHIPMENTS_BY_CARRIER.cost.series);
        DrawPieChart("container_chart_cost_by_carrier", "Cost by carrier", SHIPMENTS_BY_CARRIER.volume.series);
        $('#modal_pop_up').modal();
    });

    $('#input-search').keyup(function (event) {
        if (event.which == 13) {
            PopUpShipmentDetails($(this).val());
        }
    })
}

function RenderPage() {
    renderTo.volume.toRender = true;
    renderTo.cost.toRender = true;
    renderTo.rate.toRender = false;
    

    GetSummaryShipments($("#site").val(), $("#type_shippment").val(), $("#type_payment").val(), $("#start_date").val(), $("#end_date").val());
    GetSummaryShipmentsByDatePart($("#site").val(), $("#type_shippment").val(), $("#type_payment").val(), $('input[name=radio-group]:checked').val(), $("#start_date").val(), $("#end_date").val());
    
    renderTo.volume.container = "container_chart_shipments_by_carrier";
    renderTo.volume.title = "Top 5 Shipments by Carrier";
    renderTo.cost.container = "container_chart_cost_by_carrier";
    renderTo.cost.title = "Top 5 Cost by Carrier";    
    GetSummaryShipmentsByCarrier($("#site").val(), $("#type_shippment").val(), $("#type_payment").val(), $("#start_date").val(), $("#end_date").val(), renderTo);
        
    renderTo.volume.container = "container_chart_shipments_by_service";
    renderTo.volume.title = "Top 5 Shipments by Service Level";
    renderTo.cost.container = "container_chart_cost_by_service";
    renderTo.cost.title = "Top 5 Cost by Service Level";
    GetSummaryShipmentsByServiceLevel($("#site").val(), $("#type_shippment").val(), $("#type_payment").val(), $("#start_date").val(), $("#end_date").val(), renderTo);
}

function SetUpCalendar(objCalendar, fromToCalendarID) {
    objCalendar.datepicker({
        numberOfMonths: 1
        ,dateFormat: 'mm/dd/yy'               
        ,onSelect: function (selectedDate) {
            var option = this.id == fromToCalendarID ? "minDate" : "maxDate",
                instance = $(this).data("datepicker"),
                date = $.datepicker.parseDate(
                    instance.settings.dateFormat ||
                    $.datepicker._defaults.dateFormat,
                    selectedDate, instance.settings);
            objCalendar.not(this).datepicker("option", option, date);
        }, onClose: function () {
            RenderPage();
        }
    });
}


// GET DATA

function GetSummaryShipments(site_name, type_shipment, payment, start_date, end_date) {
    $('#container_cost_pie').html(new Spinner().spin().el);
    $('#container_volume_pie').html(new Spinner().spin().el);

    var serializedData = {};
    serializedData.option = "GetSummaryShipments";
    serializedData.typeRender = "StringData";
    serializedData.site_name = site_name;
    serializedData.type_shipment = type_shipment;
    serializedData.type_payment = payment;
    serializedData.start_date = start_date;
    serializedData.end_date = end_date + ' 11:59:59 PM';

    $.ajax({
        type: "POST",
        url: "serverControl.aspx",
        cache: false,
        data: serializedData,
        async: true,
        success: function (data) {
            var values = ConvertStringToArray(data, ",", ";");
            var cost = {}; cost.series = new Array(); cost.total = 0;
            var volume = {}; volume.series = new Array(); volume.total = 0;

            var indexSeries = 0;

            for (index = 0; index < values.length - 1; index++) {                                
                cost.series[indexSeries] = {};
                cost.series[indexSeries].name = values[index][1];
                cost.series[indexSeries].y = parseFloat(values[index][3]);
                cost.total += parseFloat(values[index][3]);

                volume.series[indexSeries] = {};
                volume.series[indexSeries].name = values[index][1];;
                volume.series[indexSeries].y = parseInt(values[index][2]);
                volume.total += parseInt(values[index][2]);
                indexSeries++;                                                                
            }

            $('#ob_total_volume').text(FormatNumber(parseInt((volume.total) / 1000))  + " K");
            $('#ob_total_cost').text(FormatNumber(parseInt((cost.total) / 1000)) + " K");
                        
            DrawPieChartWithEvent("container_cost_pie", "Total Cost", cost.series);
            DrawPieChartWithEvent("container_volume_pie", "Total Shipments", volume.series);
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("op:"+serializedData.option + " " + textStatus + errorThrown);
        }
    });

}

function GetSummaryShipmentsByDatePart(site_name, type_shipment, payment, group_by, start_date, end_date) {

    $('#container_chart_trend_cost_by_week').html(new Spinner().spin().el);
    $('#container_chart_trend_total_shipments').html(new Spinner().spin().el);
    $('#container_chart_trend_rate_per_pound').html(new Spinner().spin().el);

    var serializedData = {};
    serializedData.option = "GetSummaryShipmentsByDatePart";
    serializedData.typeRender = "StringData";
    serializedData.site_name = site_name;
    serializedData.type_shipment = type_shipment;
    serializedData.type_payment = payment;
    serializedData.group_by = group_by;
    serializedData.start_date = start_date;
    serializedData.end_date = end_date + ' 11:59:59 PM';

    $.ajax({
        type: "POST",
        url: "serverControl.aspx",
        cache: false,
        data: serializedData,
        async: true,
        success: function (data) {           

            var values = ConvertStringToArray(data, ",", ";");
            var categories = new Array();
            var cost = {}; cost.series = new Array(); cost.total = 0;
            var volume = {}; volume.series = new Array(); volume.total = 0;
            var rate = {}; rate.series = new Array(); rate.total = 0;
            
            var rate_per_pound;
            var indexSeries = 0;

            for (row = 0; row < values.length - 1; row++) 
                categories[row] = group_by + " " + values[row][2];            

            for (column = 7; column < values[0].length - 1; column+=4) {                
                cost.series[indexSeries] = {};
                cost.series[indexSeries].data = new Array();
                cost.series[indexSeries].name = values[0][column];

                volume.series[indexSeries] = {};
                volume.series[indexSeries].data = new Array();
                volume.series[indexSeries].name = values[0][column];

                rate.series[indexSeries] = {};
                rate.series[indexSeries].data = new Array();
                rate.series[indexSeries].name = values[0][column];

                for (row = 0; row < values.length - 1; row++) {
                    volume.series[indexSeries].data[row] = parseFloat(values[row][column + 1]);
                    cost.series[indexSeries].data[row] = parseFloat(values[row][column + 2]);                    
                    rate_per_pound = (parseFloat(values[row][column + 3]) / parseFloat(values[row][column + 2])).toFixed(2);
                    rate.series[indexSeries].data[row] = (isNaN(rate_per_pound)) ? 0 : parseFloat(rate_per_pound); 
                }
                indexSeries++;
            }            

            switch (group_by) {
                case 'QQ': group_by = "Quarter"
                case 'MM': group_by = "Month"
                case 'WK': group_by = "Week"
            }

            DrawAreaSplineChart("container_chart_trend_cost_by_week", "Cost By " + group_by, categories, cost);
            DrawAreaSplineChart("container_chart_trend_total_shipments", "Shipments By " + group_by, categories, volume);
            DrawSplineChart("container_chart_trend_rate_per_pound", "Rate Per Pound", categories, rate);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("op:" + serializedData.option + " " + textStatus + errorThrown);
        }
    });
}

function GetSummaryShipmentsByCarrier(site_name, type_shipment, payment, start_date, end_date, render) {
    var renderInfo = JSON.parse(JSON.stringify(render));
    var serializedData = {};

    $('#' + renderInfo.cost.container + '').html(new Spinner().spin().el);
    $('#' + renderInfo.volume.container + '').html(new Spinner().spin().el);    

    serializedData.option = "GetSummaryShipmentsByCarrier";
    serializedData.typeRender = "StringData";
    serializedData.site_name = site_name;
    serializedData.type_shipment = type_shipment;
    serializedData.type_payment = payment;
    serializedData.start_date = start_date;
    serializedData.end_date = end_date + ' 11:59:59 PM';

    $.ajax({
        type: "POST",
        url: "serverControl.aspx",
        cache: false,
        data: serializedData,
        async: true,
        success: function (data) {
            var values = ConvertStringToArray(data, ",", ";");
            var cost = {}; cost.series = new Array(); cost.total = 0;
            var volume = {}; volume.series = new Array(); volume.total = 0;
            var rate = {}; rate.series = new Array(); rate.total = 0;

            var indexSeries = 0;

            for (index = 0; index < values.length - 1; index++) {
                cost.series[indexSeries] = {};
                cost.series[indexSeries].name = values[index][0];
                cost.series[indexSeries].y = parseFloat(values[index][2]);
                cost.total += parseFloat(values[index][2]);

                volume.series[indexSeries] = {};
                volume.series[indexSeries].name = values[index][0];;
                volume.series[indexSeries].y = parseInt(values[index][1]);
                volume.total += parseInt(values[index][1]);
                               
                rate.series[indexSeries] = {};
                rate.series[indexSeries].name = values[index][0];;
                rate.series[indexSeries].y = parseInt(values[index][4]);
                rate.series[indexSeries].shipments = parseInt(values[index][1]);
                rate.series[indexSeries].cost = parseInt(values[index][2]);
                rate.series[indexSeries].weight = parseInt(values[index][3]);
                rate.total += parseInt(values[index][4]);
                rate.name = "Rate Per Pound"
                indexSeries++;
            }

            if (renderInfo.cost.toRender) DrawPieChart(renderInfo.cost.container, renderInfo.cost.title, cost.series);
            if (renderInfo.volume.toRender) DrawPieChart(renderInfo.volume.container, renderInfo.volume.title, volume.series);
            if (renderInfo.rate.toRender) DrawPieChart(renderInfo.rate.container, renderInfo.rate.title, volume.series);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("op:" + serializedData.option + " " + textStatus + errorThrown);
        }
    });

}

function GetSummaryShipmentsByServiceLevel(site_name, type_shipment, payment, start_date, end_date, render) {
    var renderInfo = JSON.parse(JSON.stringify(render));
    var serializedData = {};

    $('#' + renderInfo.cost.container ).html(new Spinner().spin().el);
    $('#' + renderInfo.volume.container ).html(new Spinner().spin().el);

    serializedData.option = "GetSummaryShipmentsByServiceLevel";
    serializedData.typeRender = "StringData";
    serializedData.site_name = site_name;
    serializedData.type_shipment = type_shipment;
    serializedData.type_payment = payment;
    serializedData.start_date = start_date;
    serializedData.end_date = end_date + ' 11:59:59 PM';

    $.ajax({
        type: "POST",
        url: "serverControl.aspx",
        cache: false,
        data: serializedData,
        async: true,
        success: function (data) {
            var values = ConvertStringToArray(data, ",", ";");
            var categories = new Array();
            var cost = {}; cost.series = new Array(); cost.total = 0;
            var volume = {}; volume.series = new Array(); volume.total = 0;
            var rate = {}; rate.series = new Array(); rate.total = 0;

            var indexSeries = 0;

            for (index = 0; index < values.length - 1; index++) {
                categories[indexSeries] = values[index][0];

                cost.categories = categories;
                cost.series[indexSeries] = {};
                cost.series[indexSeries].name = values[index][0];
                cost.series[indexSeries].y = parseFloat(values[index][2]);
                cost.total += parseFloat(values[index][2]);

                volume.categories = categories;
                volume.series[indexSeries] = {};
                volume.series[indexSeries].name = values[index][0];;
                volume.series[indexSeries].y = parseInt(values[index][1]);
                volume.total += parseInt(values[index][1]);

                rate.categories = categories;
                rate.series[indexSeries] = {};
                rate.series[indexSeries].name = values[index][0];;
                rate.series[indexSeries].y = parseInt(values[index][4]);                
                rate.series[indexSeries].shipments = parseInt(values[index][1]);
                rate.series[indexSeries].cost = parseInt(values[index][2]);
                rate.series[indexSeries].weight = parseInt(values[index][3]);
                rate.total += parseInt(values[index][4]);
                rate.name = "Rate Per Pound"
                indexSeries++;
            }

            if (renderInfo.cost.toRender) DrawPieChart(renderInfo.cost.container, renderInfo.cost.title, cost.series);
            if (renderInfo.volume.toRender) DrawPieChart(renderInfo.volume.container, renderInfo.volume.title, volume.series);
            if (renderInfo.rate.toRender)  DrawBarChart(renderInfo.rate.container, renderInfo.rate.title, rate);            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("op:" + serializedData.option + " " + textStatus + errorThrown);
        }
    });
}

// TABLES

function GetTableShipmentsByServiceLevel(site_name, type_shipment, payment, start_date, end_date, renderTo,table_name) {
       
    $('#' + renderTo ).html(new Spinner().spin().el);
    var serializedData = {};
    serializedData.option = "GetSummaryShipmentsByServiceLevel";
    serializedData.typeRender = "Table";
    serializedData.table_name = table_name;
    serializedData.site_name = site_name;
    serializedData.type_shipment = type_shipment;
    serializedData.type_payment = payment;
    serializedData.start_date = start_date;
    serializedData.end_date = end_date + ' 11:59:59 PM';

    $.ajax({
        type: "POST",
        url: "serverControl.aspx",
        cache: false,
        data: serializedData,
        async: true,
        success: function (data) {           
            $('#' + renderTo).html(data);
            $('#' + table_name).DataTable({
                searching: false,
                ordering: true,
                scrollY: '50vh',
                scrollCollapse: true,
                paging: false
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("op:" + serializedData.option + " " + textStatus + errorThrown);
        }
    });
}

function GetTableShipments(site_name, type_shipment, payment, mode,start_date, end_date, renderTo, table_name) {
    $('#' + renderTo ).html(new Spinner().spin().el);
    var serializedData = {};
    serializedData.option = "GetShipments";
    serializedData.typeRender = "Table";
    serializedData.table_name = table_name;
    serializedData.site_name = site_name;
    serializedData.type_shipment = type_shipment;
    serializedData.type_payment = payment;
    serializedData.mode = mode;
    serializedData.start_date = start_date;
    serializedData.end_date = end_date + ' 11:59:59 PM';

    $.ajax({
        type: "POST",
        url: "serverControl.aspx",
        cache: false,
        data: serializedData,
        async: true,
        success: function (data) {
            $('#' + renderTo).html(data);
            $('#' + table_name).DataTable({
                searching: true,
                ordering: true,
                scrollY: '42vh',
                scrollCollapse: true,
                paging: true
            });
           
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("op:" + serializedData.option + " " + textStatus + errorThrown);
        }
    });

}


// CHARTS

function DrawPieChart(container,title,series) {

    $('#' + container + '').highcharts({
        chart: { type: 'pie' }
         , title: { text: title, style: { "font-family": "ge-inspira;", "color": "#000", "fontSize": "22px","font-weight":"bold" } }
        , tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br /> Total:<b>{point.y}</b> ' }        
        , plotOptions: {
            pie: {
                allowPointSelect: false, cursor: 'pointer',showInLegend: true
                , dataLabels: {
                    enabled: false,                    
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
            ,series: {                        
                    events: {
                    click: function (event) {
                        //$('#modal-pop-up').modal();                        
                    }
                }
            }           
        } 
        ,legend: {
             layout: 'vertical',
             align: 'right',
             verticalAlign: 'middle',
             borderWidth: 0,
             labelFormat: '{name} {percentage:.1f} %'
         }
        , credits: { enabled: false }
        , series: [{
            name: 'Shipments', colorByPoint: true, data:series            
        }]
    });
}

function DrawPieChartWithEvent(container, title, series) {

    $('#' + container + '').highcharts({
        chart: { type: 'pie' }
         , title: { text: title, style: { "font-family": "ge-inspira;", "color": "#000", "fontSize": "22px", "font-weight": "bold" } }
        , tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br /> Total:<b>{point.y}</b> ' }
        , plotOptions: {
            pie: {
                allowPointSelect: false, cursor: 'pointer', showInLegend: true
                , dataLabels: {
                    enabled: false,
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
            , series: {
                events: {
                    click: function (event) {
                        PopUpViewDetais(event)                       
                    }
                }
            }
        }
        , legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0,
            labelFormat: '{name} {percentage:.1f} %'
        }
        , credits: { enabled: false }
        , series: [{
            name: 'Shipments', colorByPoint: true, data: series
        }]
    });
}

function DrawAreaSplineChart(container, title, categories, series) {
    var colors = Highcharts.getOptions().colors;

    var chart = $('#' + container).highcharts({
        chart: { type: 'column' }
        , title: { text: title, style: { "font-family": "ge-inspira;", "color": "#000", "fontSize": "22px", "font-weight": "bold" } }
        , xAxis: { categories: categories, tickmarkPlacement: 'on' }
        , yAxis: { min: 0, }
        , tooltip: { valueSuffix: '' }
        , plotOptions: { areaspline: { stacking: 'normal' }, spline: { dataLabels: { enabled: true } } }
        , legend: { enabled: true }
        , credits: { enabled: false }
        , series: series.series
    }).highcharts();
        
}

function DrawSplineChart(container, title, categories, series) {
    var colors = Highcharts.getOptions().colors;

    var chart = $('#' + container).highcharts({
        chart: { type: 'column' }
        , title: { text: title, style: { "font-family": "ge-inspira;", "color": "#000", "fontSize": "22px", "font-weight": "bold" } }
        , xAxis: { categories: categories }
        , yAxis: { min: 0, }
        , tooltip: { valueSuffix: '' }
        , plotOptions: {
            spline: { dataLabels: { enabled: true } }
            , series: {
                events: {
                    click: function (event) {
                        PopUpDetailsByCarrier(event);
                    }
                }
            }
        }
        , legend: { enabled: true }
        , credits: { enabled: false }
        , series: series.series
    }).highcharts();

}

function DrawBarChart(container, title, series) {
    var colors = Highcharts.getOptions().colors;

    var chart = $('#' + container).highcharts({
        chart: { type: 'column' }
        , title: { text: title, style: { "font-family": "ge-inspira;", "color": "#000", "fontSize": "22px", "font-weight": "bold" } }        
        , yAxis: { min: 0, labels: { enabled: true }, title: { text: null } }
        , xAxis: { categories: series.categories }        
        , tooltip: {
            shared: true
            ,useHTML: true
            ,headerFormat: '{point.key}'
            , pointFormat: '<table>'+
                           '<tr><td>{series.name}:</td><td>{point.y} $</td></tr>' +
                           '<tr><td>Shipments:</td><td>{point.shipments}</td></tr>'+
                           '<tr><td>Cost:</td><td>{point.cost} $</td></tr>'+
                           '<tr><td>Weight:</td><td>{point.weight} lb </td></tr>'+
                           '</table>'
            ,valueDecimals: 2
        }
        , legend: { enabled: true }
        , credits: { enabled: false }
        , series: [{ name: series.name, data: series.series }]
    }).highcharts();

}

//PopUp's

function PopUpViewDetais(event) {
    $('#modal-pop-up-lg').modal();

    $.ajax({
        type: "get",
        url: "popUp/content_table.html?var=" + Math.random(),
        cache: false,
        async: true,
        success: function (data) {
            $('#modal-content-lg').html(data);
            $('#title_pop_up2').text(event.point.name);
            if ($("#site").val() == 'All')
                GetTableShipments(event.point.name, $("#type_shippment").val(), $("#type_payment").val(), "All", $("#start_date").val(), $("#end_date").val(), "pop_up_content_table", "table_shipments");
            else
                GetTableShipments($("#site").val(), $("#type_shippment").val(), $("#type_payment").val(), event.point.name, $("#start_date").val(), $("#end_date").val(), "pop_up_content_table", "table_shipments");
        },
        error: function (XHR, textStatus, errorThrown) {
            alert('Error Loading Pop Up');
        }
    });
}

function PopUpDetailsByCarrier(event) {
    $('#modal-pop-up-lg').modal();

    $.ajax({
        type: "get",
        url: "popUp/details_by_carrier.html?var=" + Math.random(),
        cache: false,
        async: true,
        success: function (data) {
            $('#modal-content-lg').html(data);
            var values = event.point.category.split(' ');
            getDateFromAbreviation(values[0], parseInt(values[1]) - 1);
            $('#title_pop_up').text(event.point.category + ' ' + event.point.series.name);
            renderTo.volume.toRender = true;
            renderTo.cost.toRender = true;
            renderTo.rate.toRender = true;
            renderTo.volume.container = "chart1";
            renderTo.volume.title = "Top 5 Shipments by Service Level";
            renderTo.cost.container = "chart2";
            renderTo.cost.title = "Top 5 Cost by Service Level";
            renderTo.rate.container = "chart3";
            renderTo.rate.title = "Rate Per Pound by Service Level";

            if ($("#site").val() == 'All') {
                GetTableShipmentsByServiceLevel(event.point.series.name, $("#type_shippment").val(), $("#type_payment").val(), DATE_TIME.request.start_date, DATE_TIME.request.end_date, 'chart4', "summary");
                GetSummaryShipmentsByServiceLevel(event.point.series.name, $("#type_shippment").val(), $("#type_payment").val(), DATE_TIME.request.start_date, DATE_TIME.request.end_date, renderTo);
            } else {
                GetTableShipmentsByServiceLevel($("#site").val(), $("#type_shippment").val(), $("#type_payment").val(), DATE_TIME.request.start_date, DATE_TIME.request.end_date, 'chart4', "summary");
                GetSummaryShipmentsByServiceLevel($("#site").val(), $("#type_shippment").val(), $("#type_payment").val(), DATE_TIME.request.start_date, DATE_TIME.request.end_date, renderTo);
            }
        },
        error: function (XHR, textStatus, errorThrown) {
            alert('Error Loading Pop Up');
        }
    });
}
