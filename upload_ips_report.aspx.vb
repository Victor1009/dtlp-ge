Imports System.IO
Imports OfficeOpenXml

Partial Class upload_ips_report
    Inherits System.Web.UI.Page

    Dim columnValue As String
    Dim columnsMap(35) As String
    Dim query As String = ""
    Dim indexBach As Integer = 0
    Dim db As New SQL_dataBase

    Protected Sub submit_ips_button_Click(sender As Object, e As EventArgs) Handles submit_ips_button.Click
        Dim scale As String = 0

        If ips_report.HasFile Then
            If Path.GetExtension(ips_report.FileName) = ".xlsx" Then
                Dim excel As New ExcelPackage(ips_report.FileContent)
                Dim ws As ExcelWorksheet = excel.Workbook.Worksheets.First()
                Dim totalCols As Integer = ws.Dimension.[End].Column
                Dim totalRows As Integer = ws.Dimension.[End].Row


                db.ExecuteNonQuery("DELETE tb_shipments_stage")
                For column As Integer = 1 To totalCols
                    columnValue = ws.Cells(1, column).Text
                    If columnValue = "Group ID" Then columnsMap(1) = column
                    If columnValue = "Pro Number" Then columnsMap(2) = column
                    If columnValue = "Invoice Number" Then columnsMap(3) = column
                    If columnValue = "Date - Shipment" Then columnsMap(4) = column
                    If columnValue = "Carrier - SCAC Code" Then columnsMap(5) = column
                    'If columnValue = "Carrier - Name" Then columnsMap(6) = column
                    If columnValue = "Carrier - Major Mode" Then columnsMap(7) = column
                    If columnValue = "Charges - Billed" Then columnsMap(8) = column
                    If columnValue = "Charges - Net" Then columnsMap(9) = column
                    If columnValue = "Shipper Name" Then columnsMap(10) = column
                    If columnValue = "Shipper Address" Then columnsMap(11) = column
                    If columnValue = "Shipper City" Then columnsMap(12) = column
                    If columnValue = "Shipper State" Then columnsMap(13) = column
                    If columnValue = "Shipper Country" Then columnsMap(14) = column
                    If columnValue = "Shipper Zip" Then columnsMap(15) = column
                    If columnValue = "Consignee Name" Then columnsMap(16) = column
                    If columnValue = "Consignee Address" Then columnsMap(17) = column
                    If columnValue = "Consignee City" Then columnsMap(18) = column
                    If columnValue = "Consignee State" Then columnsMap(19) = column
                    If columnValue = "Consignee Country" Then columnsMap(20) = column
                    If columnValue = "Consignee Zip" Then columnsMap(21) = column
                    If columnValue = "Invoice Status(Pay/Rej/Hold)" Then columnsMap(22) = column
                    If columnValue = "Billing Code" Then columnsMap(23) = column
                    If columnValue = "Modality" Then columnsMap(24) = column
                    If columnValue = "IPS Invoice Number" Then columnsMap(25) = column
                    If columnValue = "Status/Week Ending Date" Then columnsMap(26) = column
                    If columnValue = "Process Loc.(DataEntry/Audit)" Then columnsMap(27) = column
                    If columnValue = "Weight - As Wgt" Then columnsMap(28) = column
                    If columnValue = "WGT Measure: pounds, kilos" Then columnsMap(29) = column
                    If columnValue = "Pieces" Then columnsMap(30) = column
                    If columnValue = "Number Of Containers" Then columnsMap(31) = column
                    If columnValue = "International Code" Then columnsMap(32) = column
                    If columnValue = "Service Mode" Then columnsMap(33) = column
                    If columnValue = "Service Level (Next Day,2nd Day,Etc.)" Then columnsMap(34) = column
                    If columnValue = "Index Number" Then columnsMap(35) = column
                Next

                For rows As Integer = 2 To totalRows

                    scale = "2.2046"
                    If ws.Cells(rows, columnsMap(29)).Text = "Pounds" Then scale = "1"

                    query += "  INSERT INTO tb_shipments_stage ("
                    query += "  id"
                    query += "  ,[group_id]"
                    query += "  ,[pro_number]"
                    query += "  ,[invoice_number]"
                    query += "  ,[date_shipment]"
                    query += "  ,[carrier_scac_code]"
                    'query += "  ,[carrier_name]"
                    query += "  ,[carrier_major_mode]"
                    query += "  ,[charges_billed]"
                    query += "  ,[charges_net]"
                    query += "  ,[shipper_name]"
                    query += "  ,[shipper_address]"
                    query += "  ,[shipper_city]"
                    query += "  ,[shipper_state]"
                    query += "  ,[shipper_country]"
                    query += "  ,[shipper_zip_code]"
                    query += "  ,[consignee_name]"
                    query += "  ,[consignee_address]"
                    query += "  ,[consignee_city]"
                    query += "  ,[consignee_state]"
                    query += "  ,[consignee_country]"
                    query += "  ,[consignee_zip_code]"
                    query += "  ,[invoice_status]"
                    query += "  ,[billing_code]"
                    query += "  ,[modality]"
                    query += "  ,[ips_invoice_number]"
                    query += "  ,[status_week_ending_date]"
                    query += "  ,[process_loc]"
                    query += "  ,[weight_as_weight]"
                    query += "  ,[pieces]"
                    query += "  ,[number_of_containers]"
                    query += "  ,[international_code]"
                    query += "  ,[service_mode]"
                    query += "  ,[service_level]"
                    query += "   )"
                    query += "   VALUES("
                    query += "  '" + ws.Cells(rows, columnsMap(35)).Text() + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(1)).Text() + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(2)).Text() + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(3)).Text() + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(4)).Text() + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(5)).Text() + "'"
                    'query += "  ,'" + ws.Cells(rows, columnsMap(6)).Text() + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(7)).Text() + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(8)).Text() + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(9)).Text() + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(10)).Text.Replace("'", "''") + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(11)).Text.Replace("'", "''") + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(12)).Text.Replace("'", "''") + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(13)).Text.Replace("'", "''") + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(14)).Text.Replace("'", "''") + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(15)).Text + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(16)).Text.Replace("'", "''") + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(17)).Text.Replace("'", "''") + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(18)).Text.Replace("'", "''") + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(19)).Text.Replace("'", "''") + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(20)).Text.Replace("'", "''") + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(21)).Text + "'"
                    query += "  ,'" + Left(ws.Cells(rows, columnsMap(22)).Text.Replace("'", "''"), 59) + "'"
                    query += "  ,'" + Left(ws.Cells(rows, columnsMap(22)).Text.Replace("'", "''"), 10).Trim() + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(24)).Text().Trim() + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(25)).Text() + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(26)).Text() + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(27)).Text() + "'"
                    query += "  ," + ws.Cells(rows, columnsMap(28)).Text() + " * " + scale + " "
                    query += "  ,'" + ws.Cells(rows, columnsMap(30)).Text() + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(31)).Text() + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(32)).Text() + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(33)).Text() + "'"
                    query += "  ,'" + ws.Cells(rows, columnsMap(34)).Text() + "'"
                    query += ")"

                    indexBach += 1
                    If indexBach = 10 Then
                        indexBach = 0
                        db.ExecuteNonQuery(query)
                        query = ""
                    End If
                Next

                query += " EXEC sp_move_data_stage_to_production "
                db.ExecuteNonQuery(query)
            End If
        End If
    End Sub
   
End Class
