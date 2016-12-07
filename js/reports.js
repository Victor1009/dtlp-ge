

function setUpLoadReports(value) {
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
    GetTableShipments($("#site").val(), $("#type_shippment").val(), $("#type_payment").val(), "All", $("#start_date").val(), $("#end_date").val(), "canvas_table", "table_shipments");    
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



// TABLES

function GetTableShipments(site_name, type_shipment, payment, mode,start_date, end_date, renderTo, table_name) {
    $('#' + renderTo ).html(new Spinner().spin().el);
    var serializedData = {};
    serializedData.option = "GetShipmentsForReports";
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
            var table = $('#' + table_name).DataTable({
                searching: true,
                ordering: true,
                scrollY: '42vh',
                scrollCollapse: true,
                paging: false,
                "dom": '<"toolbar">frtip',
                //"bInfo": false
            });
            $("div.toolbar", $('#' + renderTo)).html('<button id="exportExcel' + table_name + '" type="button" class="btn btn-default"><i class="fa fa-download" aria-hidden="true"></i></button>');
            
            $('#exportExcel' + table_name, $('#' + renderTo)).click(function () {
                var URI;
                URI = "serverControl.aspx?";
                URI += "option=GetShipmentsForReportsExcel"
                URI += "&typeRender=Excel";
                URI += "&table_name=" + table_name;
                URI += "&site_name=" + site_name;
                URI += "&type_shipment=" + type_shipment;
                URI += "&type_payment=" + payment;
                URI += "&mode=" + mode;
                URI += "&start_date=" + start_date;
                URI += "&end_date=" + end_date + ' 11:59:59 PM';
                window.open(URI);
            });


            $('#' + renderTo+' tbody').on('click', 'tr', function () {
                var data = table.row(this).data();
                PopUpShipmentDetails(data[0]);                
            });
           
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("op:" + serializedData.option + " " + textStatus + errorThrown);
        }
    });

}
