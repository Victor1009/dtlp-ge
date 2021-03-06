﻿<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Default.aspx.vb" Inherits="_Default" %>

<!DOCTYPE html>

<html>
<head>
    <title>Shipments Data Analyze</title>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
  
    <link href="css/bootstrap.min.css" rel="stylesheet" />   
    <link href="css/iids.css" rel="stylesheet" />
    <link href="css/responsive.css" rel="stylesheet" />    
    <link href="css/font-awesome.min.css" rel="stylesheet" />  
    <link href="css/declarative-visualizations.css" rel="stylesheet" />
    <link href="css/datepicker.css" rel="stylesheet" />

    <script src="js/plugins/jquery-1.11.3.min.js"></script>
    <script src="js/plugins/bootstrap.min.js"></script>
    <script src="js/plugins/datepicker.js"></script>    
    <script src="js/plugins/charts_v3/highcharts.js"></script>
    <script src="js/plugins/cookies.js"></script>
    <script src="js/plugins/spinner.js"></script>
    <script src="js/plugins/datatables.min.js"></script>
      
    <script src="js/tools.js"></script>  
    <script src="js/user_info.js"></script>
    <script src="js/fiscal_date_time.js"></script>     
    <script src="js/shipments.js"></script>
    <script src="js/global_search.js"></script>
   
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
                <div class="pull-left navbar-form">
                    <div class="input-group">
                        <input id ="input-search" type="search" class="col-sm-1 search-query form-control" data-toggle="dropdown" data-target=".navbar-search">
                        <span class="input-group-btn">
                            <button id ="button-search" class="btn btn-inverse btn-icon"><i class="fa fa-search" aria-hidden="true"></i></button>
                        </span>
                    </div>              
                </div>
            </div>            
        </div>
        <div class="primary-navbar nav-collapse">
            <div class="container">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="Default.aspx">Dashboard</a></li>                                  
                    <li ><a href="data.aspx">Data</a></li> 
                    <li ><a href="upload_ips_report.aspx">Update</a></li> 
                </ul>
            </div>
        </div>                     
    </nav>            
    <div class="container content"> 
        <div class="row">
            <div class="col-lg-12">
                <div class="pull-left">                    
                    <div class="form-inline">                          
                        <select id="site" class="form-control" >                  
                            <option value="All">All Sites</option>                 
                            <option value="Aurora">Aurora</option>     
                            <option value="BOP">BOP</option>                
                            <option value="FLO">Florence</option> 
                            <option value="LAU">Laurel</option>                
                            <option value="MSN">Madison</option>                
                            <option value="MTY">Monterrey</option>                                        
                            <option value="Tower">Tower</option>                
                            <option value="WAUKESHA">Waukesha</option> 
                        </select> 
                        <select id="type_payment" class="form-control">
                            <option value="All">All</option>
                            <option value="Processed">Processed</option>
                            <option value="Scheduled To Pay">Scheduled</option>
                        </select> 
                        <select  id="type_shippment" class="form-control">                                                  
                            <option value="OB">Outbound</option>
                            <option value="IN">Inbound</option>
                        </select> 
                    </div>                    
                </div>
                <div class="pull-right" >                    
                    <div class="input-group input-daterange" style ="float:left;margin-right:10px; width:250px;">                                               
                        <input id="start_date" type="text" class="form-control">
                        <span class="input-group-addon">to</span>
                        <input id="end_date" type="text" class="form-control" >                        
                        <span class="input-group-btn">
                            <button class="btn" type="button"><i class="fa fa-calendar" aria-hidden="true"></i></button>
                        </span>                       
                    </div>              
                    <div class="btn-group" data-toggle="buttons" style="font-weight:bold;">
                        <label id="btn_date_yy" class="btn"><input type="radio" name="radio-range-date" value="YY">YY</label>                        
                        <label id="btn_date_qq" class="btn active"><input type="radio" name="radio-range-date" value="QQ" checked>QQ</label>                        
                        <label id="btn_date_mm" class="btn"><input type="radio" name="radio-range-date" value="MM">MM</label>       
                        <label id="btn_date_wk" class="btn"><input type="radio" name="radio-range-date" value="WK">WK</label>       
                    </div> 
                </div> 
            </div>
        </div>                
        <div class="row ">
            <div class="col-lg-6">          
                <div class="module ">
                    <div class="module-body" style="height:auto;"> 
                        <div id = "container_volume_pie" style="height:240px;"></div><br />
                        <div class="module-data-viz" >
                            <div class="center-block" style="width:180px;">                                    
                                <p class="caption hero"> <strong><i class="fa fa-truck" aria-hidden="true"></i></strong> <strong id="ob_total_volume">0</strong></p>                                        
                                <p class="caption">Shipments</p> 
                            </div>
                        </div>                               
                    </div>
                </div>
            </div>
            <div class="col-lg-6">          
                <div class="module ">
                    <div class="module-body" style="height:auto;"> 
                        <div id = "container_cost_pie" style="height:240px;"></div><br />
                        <div class="module-data-viz" >
                            <div class="center-block"style="width:180px;">                                    
                                <p class="caption hero"><strong><i class="fa fa-usd" aria-hidden="true"></i></strong> <strong id="ob_total_cost">0</strong></p>
                                <p class="caption">Dlls.</p>                                         
                            </div>
                        </div>                              
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">          
                <div class="module ">                    
                    <div class="module-body" style="height:auto;">                                                                        
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="pull-right">
                                    <span>View By: </span>
                                    <div class="btn-group" data-toggle="buttons" style="font-weight:bold;">                                              
                                        <label id="btn_group_qq" class="btn"><input type="radio" name="radio-group" value="QQ">QQ</label>                        
                                        <label id="btn_group_mm" class="btn active"><input type="radio" name="radio-group" value="MM" checked>MM</label>       
                                        <label id="btn_group_wk" class="btn "><input type="radio" name="radio-group" value="WK" >WK</label>       
                                    </div>
                                </div>
                            </div>
                        </div><br /><br />
                        <div class="row" >
                            <div  class="col-lg-6 col-md-12" >
                                <div id="container_chart_trend_total_shipments" style="height:320px;"></div>
                            </div>
                            <div  class="col-lg-6 col-md-12" >
                                <div id="container_chart_trend_cost_by_week" style="height:320px;"></div>
                            </div>
                        </div>
                        <div class="row" >
                            <div  class="col-lg-12 " >
                                <div id ="container_chart_trend_rate_per_pound" style="height:320px;"></div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>    
        </div>
        <div class="row ">
            <div class="col-lg-6">          
                <div class="module ">
                    <div class="module-body" style="height:auto;"> 
                        <div id = "container_chart_shipments_by_carrier" style="height:250px;"></div><br />                                                   
                    </div>
                </div>
            </div>
            <div class="col-lg-6">          
                <div class="module ">
                    <div class="module-body" style="height:auto;"> 
                        <div id = "container_chart_cost_by_carrier" style="height:250px;"></div><br />                                                     
                    </div>
                </div>
            </div>
        </div>                           
        <div class="row ">
            <div class="col-lg-6">          
                <div class="module ">
                    <div class="module-body" style="height:auto;"> 
                        <div id = "container_chart_shipments_by_service" style="height:250px;"></div><br />                                                   
                    </div>
                </div>
            </div>
            <div class="col-lg-6">          
                <div class="module ">
                    <div class="module-body" style="height:auto;"> 
                        <div id = "container_chart_cost_by_service" style="height:250px;"></div><br />                                                     
                    </div>
                </div>
            </div>
        </div> 
    </div>    
    <div id="modal-pop-up" class="modal fade in" aria-hidden="true"  >
        <div class="modal-dialog modal-lg">
           
        </div>
    </div>
    
    <div id="modal-pop-up2" class="modal fade in" aria-hidden="true"  >
        <div class="modal-dialog modal-lg">
            
        </div>
    </div>
    
    <div id="modal-pop-up-lg" class="modal fade in" aria-hidden="true"  >
        <div id="modal-content-lg" class="modal-dialog modal-lg">            
        </div>
    </div>    
    
    <script>
        setUpLoadShipments();
        setUpGlobalSearch();
    </script>
</body>
</html>
