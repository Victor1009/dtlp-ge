function setUpGlobalSearch() {    
    $('#input-search').keyup(function (event) {
        if (event.which == 13) {
            PopUpShipmentDetails($(this).val());
        }
    })

    $('#button-search').click(function () {
        PopUpShipmentDetails($('#input-search').val());
    });
}

function GetShipmentdetails(pro_number) {
    var serializedData = {};
    serializedData.option = "GetShipmentsDetails";
    serializedData.typeRender = "JSON";
    serializedData.value = pro_number;
    

    $.ajax({
        type: "POST",
        url: "serverControl.aspx",
        cache: false,
        dataType: "json",
        data: serializedData,
        async: true,
        success: function (data) {
            if (data.length > 0) {               

                $('#title_pop_up').text(data[0].site);
                $('#charges_net').text(FormatNumber(data[0].charges_net));
                $('#weight_as_weight').text(FormatNumber(data[0].weight_as_weight));

                $('#pro_number').text(data[0].pro_number);
                $('#invoice_number').text(data[0].invoice_number);
                $('#ips_invoice_number').text(data[0].ips_invoice_number);
                $('#date_shipment').text(data[0].date_shipment);
                $('#status_week_ending_date').text(data[0].status_week_ending_date);
                $('#invoice_status').text(data[0].invoice_status);

                $('#shipper_name').text(data[0].shipper_name);
                $('#shipper_address').text(data[0].shipper_address);
                $('#shipper_city').text(data[0].shipper_city);
                $('#shipper_state').text(data[0].shipper_state);
                $('#shipper_country').text(data[0].shipper_country);
                $('#shipper_zip').text(data[0].shipper_zip_code);

                $('#consignee_name').text(data[0].consignee_name);
                $('#consignee_address').text(data[0].consignee_address);
                $('#consignee_city').text(data[0].consignee_city);
                $('#consignee_state').text(data[0].consignee_state);
                $('#consignee_country').text(data[0].consignee_country);
                $('#consignee_zip').text(data[0].consignee_zip_code);

                $('#carrier_name').text(data[0].carrier_name);
                $('#carrier_major_mode').text(data[0].carrier_major_mode);
                $('#servie_name').text(data[0].servie_name);
                $('#international_code').text(data[0].international_code);
                $('#billing_code').text(data[0].billing_code);

                $('#delivery').text(data[0].delivery);
                $('#order_num').text(data[0].order_num);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("op:" + serializedData.option + " " + textStatus + errorThrown);
        }
    });
}

function PopUpShipmentDetails(pro_number) {
    $('#modal-pop-up-lg').modal();

    $.ajax({
        type: "get",
        url: "popUp/shipment_details.html",
        cache: false,
        async: true,
        success: function (data) {
            $('#modal-content-lg').html(data);
            GetShipmentdetails(pro_number);
        },
        error: function (XHR, textStatus, errorThrown) {
            alert('Error Loading Pop Up');
        }
    });
}