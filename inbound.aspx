<%@ Page Language="VB" AutoEventWireup="false" CodeFile="inbound.aspx.vb" Inherits="_Default" %>

<!DOCTYPE html>

<html>
<head>
    <title>Shipments Data Analyze</title>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
  
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/iids-blessed1.css" rel="stylesheet" />
    <link href="css/iids.css" rel="stylesheet" />    
    <link href="css/font-awesome.min.css" rel="stylesheet" />  
    <link href="css/declarative-visualizations.css" rel="stylesheet" />
    <link href="css/datepicker.css" rel="stylesheet" />

    <script src="js/plugins/jquery-1.11.3.min.js"></script>
    <script src="js/plugins/bootstrap.min.js"></script>
    <script src="js/plugins/datepicker.js"></script>
    <script src="js/plugins/datepicker-red.js"></script>    
    <script src="js/plugins/charts_v3/highcharts.js"></script>
    <script src="js/plugins/cookies.js"></script>
    
    <script src="js/table.js"></script>
    <script src="js/user_info.js"></script>
    <script src="js/fiscal_date_time.js"></script>
    <script src="js/tools.js"></script>    
    <script src="js/shipments.js"></script>
   
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
                    <li ><a href="Default.aspx">Outbound</a></li>               
                     <li class="active"><a href="inbound.aspx">Inbound</a></li> 
                    <li ><a href="upload_ips_report.aspx">Update</a></li> 
                </ul>
            </div>
        </div>                     
    </nav>            
    <div class="container content"> 
        <div class="row">
            <div class="col-lg-12">
                <div class="pull-left">                    
                    <select id="site" >                  
                        <option value="All">All Sites</option>                 
                        <option value="AURORA">AURORA</option>     
                        <option value="BOP">BOP</option>                
                        <option value="MADISON">MADISON</option>                
                        <option value="MONTERREY">MONTERREY</option>                
                        <option value="LAUREL">LAUREL</option>                
                        <option value="TOWER">TOWER</option>                
                        <option value="WAUKESHA">WAUKESHA</option> 
                    </select> 
                    <select id="type_payment">
                        <option value="All">All</option>
                        <option value="Processed">Processed</option>
                        <option value="Scheduled To Pay">Scheduled</option>
                    </select>                            
                    <select  id="type_shipper">
                        <option value="All">All</option>
                        <option value="Domestic">Domestic</option>
                        <option value="International">International</option>
                    </select> 
                </div>
                <div class="pull-right">                    
                    <div class="input-group input-daterange" style ="float:left;margin-right:10px; width:250px;">                                               
                        <input id="start_date" type="text" class="form-control">
                        <span class="input-group-addon">to</span>
                        <input id="end_date" type="text" class="form-control" >                        
                        <span class="input-group-btn">
                            <button class="btn" type="button"><i class="icon-calendar"></i></button>
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
            <div class="col-lg-12">          
                <div class="module ">
                    <header class="module-header">
                        <h2>Inbound Payments</h2>
                    </header>
                    <br />
                    <div class="module-body" style="height:auto;"> 
                        <div class="row" >
                            <div  class="col-lg-6 col-md-6  " >                                
                                <div id = "container_volume_pie" style="height:220px;"></div><br />
                                <div class="module-data-viz" >
                                    <div class="center-block" style="width:180px;">                                    
                                        <p class="caption hero"> <strong><i class="icon-truck"></i></strong> <strong id="ob_total_volume">0</strong> Shipments</p>                                        
                                        <p class="caption">Total</p> 
                                    </div>
                                </div>                               
                                <a id="more_info_shipments"> More Details > </a>
                            </div>                            
                            <div class="col-lg-6 col-md-6" >                                
                                <div id = "container_cost_pie" style="height:220px;"></div><br />
                                <div class="module-data-viz" >
                                    <div class="center-block"style="width:180px;">                                    
                                        <p class="caption hero"><strong><i class="icon-usd"></i></strong> <strong id="ob_total_cost">0</strong> Dlls.</p>
                                        <p class="caption">Total</p>                                         
                                    </div>
                                </div>                                
                            </div>                                                                                                                  
                        </div><br />                                                
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="pull-right">
                                    <span>View By: </span>
                                    <div class="btn-group" data-toggle="buttons" style="font-weight:bold;">                                              
                                        <label id="btn_group_qq" class="btn"><input type="radio" name="radio-group" value="QQ">QQ</label>                        
                                        <label id="btn_group_mm" class="btn"><input type="radio" name="radio-group" value="MM">MM</label>       
                                        <label id="btn_group_wk" class="btn active"><input type="radio" name="radio-group" value="WK" checked>WK</label>       
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
                        <div class="row" >
                            
                        </div>
                    </div>
                </div>
            </div>    
        </div>                           
    </div>    
    <div id="modal_pop_up" class="modal fade in" aria-hidden="true"  >
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">×</button>
                    <h2>Shipments Top (5)</h2>
                </div>
                <div class="modal-body">
                    <div id ="container_chart_shipments_by_carrier" style="height:300px;"></div>                                                 
                    <div id ="container_chart_cost_by_carrier" style="height:300px;"></div>
                </div>
                <div class="modal-footer">
                    <a href="#" class="btn" data-dismiss="modal">Close</a>                    
                </div>
            </div>
        </div>
    </div>
    <script>
        setUpLoadShipments('IN');
    </script>
</body>
</html>
