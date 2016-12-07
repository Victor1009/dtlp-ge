<%@ Page Language="VB" AutoEventWireup="false" CodeFile="upload_ips_report.aspx.vb" Inherits="upload_ips_report" %>

<!DOCTYPE html>

<html>
<head>
    <title>Freight Data Analice</title>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
  
             
    <link href="css/iids-blessed1.css" rel="stylesheet" />
    <link href="css/iids.css" rel="stylesheet" />    
    <link href="css/font-awesome.min.css" rel="stylesheet" />  
    <link href="css/declarative-visualizations.css" rel="stylesheet" />
    <link href="css/datepicker.css" rel="stylesheet" />


    <script src="js/plugins/jquery-1.11.3.min.js"></script>
    <script src="js/plugins/bootstrap.min.js"></script>
    <script src="js/plugins/datepicker.js"></script>
    <script src="js/plugins/charts_v4/highcharts.js"></script>
    <script src="js/plugins/cookies.js"></script>


    <script src="js/table.js"></script>
    <script src="js/user_info.js"></script>
    <script src="js/fiscal_date_time.js"></script>
    <script src="js/freigths.js"></script>
</head>
<body>
    <nav class="navbar  navbar-default" role="navigation">  
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand">
                    <span class="ge-logo"></span> 
                    <span>Logistics Analyze <small> GE Healthcare</small></span> 
                </a>                                
            </div>
            <div class="pull-right">                        
                <img id="user-image" src="" alt="" class="img-circle" style="float:left; height:48px;margin:5px;margin-bottom:0px;">     
                <div class="btn-toolbar pull-left">                                         
                    <div class="btn-group">                                
                        <button class="btn btn-inverse"><span id="user-name" class="user-name" style="color:#eee">User Loggued</span></button>                                                
                    </div>
                </div>                                                           
            </div>              
        </div>
        <div class="primary-navbar nav-collapse">
            <div class="container">
                <ul class="nav navbar-nav">
                    <li ><a href="Default.aspx">Main Page</a></li>               
                    <li class="active"><a href="upload_ips_report.aspx">Update</a></li> 
                </ul>
            </div>
        </div>                     
    </nav> 
    <br />
    <div class="container">   
        <div class="row">
            <div class="col-lg-12">
                <section class="module">
                    <header class="module-header"></header>
                    <div class="module-body" style="height: 120px;">                        
                        <form id="form1" runat="server" class="form-group">
                            <div>
                                <label for="ips_report">IPS Report</label>
                                <asp:FileUpload ID="ips_report" runat="server" />
                                <p class="help-block">Select the IPS report.</p>
                                <asp:Button ID="submit_ips_button" runat="server" Text="Upload" class="btn btn-default" />
                            </div>
                        </form>                                               
                    </div>
                    <footer class="module-footer"></footer>
                </section>
                <br>
            </div>
        </div>
    </div>
</body>
</html>
