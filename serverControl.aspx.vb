
Partial Class serverControl
    Inherits System.Web.UI.Page

    Dim shipment As New Shipments()
    Dim users_ As New Users()

    Dim _OPTION As String

    Dim userSSO As String
    Dim site_name As String
    Dim id_production_line As String
    Dim typeRender As String
    Dim tableName As String
    Dim stringArray As String
    Dim type_payment As String
    Dim type_shipment As String
    Dim type_freight As String
    Dim group_by As String
    Dim start_date As String
    Dim end_date As String
    Dim date_part As String
    Dim value As String
    Dim mode As String


    Protected Sub Page_Error(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Error
        Dim ObjEmail As New Email()
        Dim errorMessage As String

        errorMessage = "REQUEST :</br>" + Request.FilePath + " </br></br>"
        errorMessage += "OPTION :</br>" + _OPTION + " </br></br>"
        errorMessage += "REMOTE_USER :</br>" + Request.ServerVariables.Get("REMOTE_USER") + " </br></br>"
        errorMessage += "ERROR  :</br>" + Server.GetLastError.ToString() + " </br></br>"

        'ObjEmail.sendEmailError(errorMessage)
    End Sub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        _REQUEST()
        If _OPTION = "getUserInfo" Then getUserInfo()
        If _OPTION = "getFiscalDateTime" Then getFiscalDateTime()
        If _OPTION = "getDateFromAbreviation" Then getDateFromAbreviation()

        If _OPTION = "GetSummaryShipments" Then GetSummaryShipments()
        If _OPTION = "GetSummaryShipmentsByDatePart" Then GetSummaryShipmentsByDatePart()
        If _OPTION = "GetSummaryShipmentsByCarrier" Then GetSummaryShipmentsByCarrier()
        If _OPTION = "GetSummaryShipmentsByServiceLevel" Then GetSummaryShipmentsByServiceLevel()

        If _OPTION = "GetShipments" Then GetShipments()
        If _OPTION = "GetShipmentsForReports" Then GetShipmentsForReports()
        If _OPTION = "GetShipmentsForReportsExcel" Then GetShipmentsForReportsExcel()
        If _OPTION = "GetShipmentsDetails" Then GetShipmentsDetails()
    End Sub

    Sub _REQUEST()
        _OPTION = Request("option")
        
        id_production_line = Request("id_production_line")
        site_name = Request("site_name")
        typeRender = Request("typeRender")
        tableName = Request("table_name")
        stringArray = Request("stringArray")
        type_shipment = Request("type_shipment")
        type_payment = Request("type_payment")
        type_freight = Request("type_freight")
        group_by = Request("group_by")
        start_date = Request("start_date")
        end_date = Request("end_date")
        date_part = Request("date_part")
        value = Request("value")
        mode = Request("mode")

        Try
            userSSO = Right(My.User.Name, 9)
        Catch ex As Exception
            userSSO = "00000000"
        End Try

    End Sub

    Sub getUserInfo()
        users_.loadUserInfo(userSSO)
        Response.Write(users_.getLastQueryInArrayString)
    End Sub

    Sub getFiscalDateTime()
        Dim fiscalDate As New FiscalDateTime()
        Response.Write(fiscalDate.dateArrayString)
    End Sub

    Sub getDateFromAbreviation()
        Dim fiscalDate As New FiscalDateTime()
        Response.Write(fiscalDate.GetRangeDateForDatePart(date_part, value))
    End Sub

    Sub GetSummaryShipments()
        shipment.GetSummaryShipments(site_name, type_shipment, type_payment, start_date, end_date)
        If typeRender = "StringData" Then Response.Write(shipment.getLastQueryInArrayString())
        If typeRender = "Table" Then Response.Write(shipment.getLastQueryInDataTable(tableName, 1, 100))
    End Sub

    Sub GetSummaryShipmentsByDatePart()
        shipment.GetSummaryShipmentsByDatePart(site_name, type_shipment, type_payment, group_by, start_date, end_date)
        If typeRender = "StringData" Then Response.Write(shipment.getLastQueryInArrayString())
        If typeRender = "Table" Then Response.Write(shipment.getLastQueryInDataTable(tableName, 1, 100))
    End Sub

    Sub GetSummaryShipmentsByCarrier()
        shipment.GetSummaryShipmentsByCarrier(site_name, type_shipment, type_payment, start_date, end_date)
        If typeRender = "StringData" Then Response.Write(shipment.getLastQueryInArrayString())
        If typeRender = "Table" Then Response.Write(shipment.getLastQueryInDataTable(tableName, 1, 100))
    End Sub

    Sub GetSummaryShipmentsByServiceLevel()
        shipment.GetSummaryShipmentsByServiceLevel(site_name, type_shipment, type_payment, start_date, end_date)
        If typeRender = "StringData" Then Response.Write(shipment.getLastQueryInArrayString())
        If typeRender = "Table" Then Response.Write(shipment.getLastQueryInDataTable(tableName, 1, 100))
    End Sub

    Sub GetShipments()
        shipment.GetShipments(site_name, type_shipment, type_payment, mode, start_date, end_date)
        If typeRender = "StringData" Then Response.Write(shipment.getLastQueryInArrayString())
        If typeRender = "Table" Then Response.Write(shipment.getLastQueryInDataTable(tableName, 1, 600))
    End Sub

    Sub GetShipmentsForReports()
        shipment.GetShipmentsForReports(site_name, type_shipment, type_payment, mode, start_date, end_date)
        If typeRender = "StringData" Then Response.Write(shipment.getLastQueryInArrayString())
        If typeRender = "Table" Then Response.Write(shipment.getLastQueryInDataTable(tableName, 1, 600))
    End Sub

    Sub GetShipmentsForReportsExcel()
        shipment.GetShipmentsForReportsExcel(site_name, type_shipment, type_payment, mode, start_date, end_date)
        If typeRender = "Excel" Then shipment.getLastQueryInExcel(Response, "Shipments_data")
    End Sub

    Sub GetShipmentsDetails()
        shipment.GetShipmentDetails(value)
        If typeRender = "StringData" Then Response.Write(shipment.getLastQueryInArrayString())
        If typeRender = "JSON" Then Response.Write(shipment.getLastQueryInJSON())
        If typeRender = "Table" Then Response.Write(shipment.getLastQueryInDataTable(tableName, 1, 600))
    End Sub


End Class
