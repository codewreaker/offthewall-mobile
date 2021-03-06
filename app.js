function onLoad() {
    // A simple check for phones tto make sure device is ready to with all plugins
    document.addEventListener("deviceready", deviceReady, false);
}


//event_id
//event_name
//event_picture
//event_desc
//event_rate




var deviceReady = $(function () {
    var fetchJSON;
    var actionType;
    var setEvent;
    var eventName="";


    //An Ajax call to fetch data from server
    fetchJSON = function () {
            var user_general_id;
            $obj = JSON.parse(window.localStorage.getItem('credentials'));
            $str = "opt=4&user_id=" + $obj.user_id;
            user_general_id = $obj.user_id;
            $.when(
                // Part a populates listSection
                sendRequest($str, function (data) {
                    $obj = $.parseJSON(data);
                    var $toastContent = $obj.message;
                    Materialize.toast($toastContent, 3000);
                    var data = $obj.data;
                    var top = '<li class="collection-header"><h4>Events</h4></li>';
                    var mid = "";
                    for (var i = 0; i < data.length; i++) {
                        mid = mid + '<li class="collection-item avatar events"><a class="lighten-2 view-product" href="#modal-view" id="' + data[i].event_id + '"><img src="data:image/jpeg;base64,' + data[i].event_picture + '" alt="" class="circle"/></a><span class="title">' + data[i].event_name + '</span><p>' + data[i].event_desc + '</p><span class="controls secondary-content"><a class="btn-floating teal lighten-2 delete-event" id="' + data[i].event_id + '"><i class="fa fa-2x fa-trash"></i></a></span></li>';
                    }
                    Materialize.toast("Complete!!!", 3000);
                    $("#listSection").html(top + mid);
                    list_control();
                }),

                // Part B populates listsection2
                sendRequest("opt=2", function (data) {
                    var icon = "phone";
                    $obj = $.parseJSON(data);
                    var $toastContent = $obj.message;
                    Materialize.toast($toastContent, 3000);
                    var data = $obj.data;
                    if ($.parseJSON(window.localStorage.getItem('deviceData')).result == 1) {
                        icon = "envelope";
                    }
                    var top = '<li class="collection-header"><h4>Friends</h4></li>';
                    var mid = "";
                    for (var i = 0; i < data.length; i++) {
                        mid = mid + '<li class="collection-item avatar"><a accesskey="5" href="' + actionType(data, i) + '"><i class="fa fa-' + icon + ' circle teal"></i></a><span class="title">' + data[i].email + '</span><p>+' + data[i].user_telephone + '&nbsp </p><span class="controls secondary-content"></li>';
                    }
                    $("#listSection2").html(top + mid);
                }),
                // Part B populates listsection2
                sendRequest("opt=3&user_id="+user_general_id, function (data) {
                    $obj = $.parseJSON(data);
                    // Part C populates listsection3
                    var $toastContent = $obj.message;
                    Materialize.toast($toastContent, 3000);
                    var data = $obj.data;
                    var top = '<li class="collection-header"><h4>Tickets</h4></li>';
                    var mid = "";
                    for (var i = 0; i < data.length; i++) {
                        mid = mid + '<li class="collection-item avatar"><a class="lighten-2 view-product" href="#modal-view" id="' + data[i].event_id + '"><img src="data:image/jpeg;base64,' + data[i].event_picture + '" alt="" class="circle"/></a><span class="title">' + data[i].event_name + '</span><p>&cent;' + data[i].event_rate + '&nbsp </p><span class="controls secondary-content"><a class="btn-floating teal lighten-2 view-receipt" href="#modal-receipt" data-event="' + data[i].event_name + '"><img src="src/img/logo.png" alt="" class="circle"><i class="fa fa-eye"></i></a></span></li>';
                    }
                    $("#listSection3").html(top + mid);
                     setEvent();
                })).done(function () {
                Materialize.toast("Working...", 3000);
            });

        }
        //a private function to return a type of action
    actionType = function (data, index) {
        var val = 'tel:+' + data[index].user_telephone;
        if ($.parseJSON(window.localStorage.getItem('deviceData')).result == 1) {
            val = 'mailto:' + data[index].email;
        }
        return val;
    }

    //A private function that sets the current event
      setEvent = function () {
       $(document).on('click','.view-receipt',function(){
              eventName=$(this).attr('data-event');
              $("#event_val").html(eventName);
              $("#phone_num").html($.parseJSON(window.localStorage.getItem('credentials')).phone);
          });
    }

    /**
     * A function to login
     ***/
    var login = function () {
        $("#login_btn").click(function () {
            $username = $("#login_email").val();
            $pword = $("#login_pword").val();
            $str = "opt=0&username=" + $username + "&pword=" + $pword;
            var obj = $.ajax({
                type: "POST",
                //url: "http://localhost/mobile_web/otw-server/OTW.php",
                url: "http://cs.ashesi.edu.gh/~csashesi/class2016/prophet-agyeman-prempeh/otw-server/OTW.php", //for web
                data: $str,
                async: false,
                cache: false
            });
            $obj = $.parseJSON(obj.responseText);
            var $toastContent = $obj.message;
            if ($obj.result == 1) {
                $json_string = {
                    "user_id": $obj.user_id,
                    "email": $obj.phone,
                    "phone":$obj.phone
                };
                //Setting the login variables locally
                var localData = JSON.stringify($json_string);
                window.localStorage.setItem('credentials', localData);
                Materialize.toast($toastContent, 2000);
                //Relocating to either web or phone view based on device
                $object = JSON.parse(window.localStorage.getItem('deviceData'));
                if ($object.result == 1) {
                    setTimeout(function () {
                        window.location.replace("main_web.html");
                    }, 2000);
                    //Relocating to mobile page
                } else {
                    setTimeout(function () {
                        window.location.replace("main.html");
                    }, 2000);
                }

            } else {
                Materialize.toast($toastContent, 3000);
            }
        });

    }

    /**
     * A function to logout
     ***/
    var logout = function () {
        $("#logout_btn").click(function () {
            sendRequest("opt=8", function (data) {
                $obj = $.parseJSON(data);
                var $toastContent = $obj.message;
                if ($obj.result == 1) {
                    Materialize.toast($toastContent, 3000);
                    window.localStorage.removeItem("credentials");
                    setTimeout(function () {
                        window.location.replace("login.html");
                    }, 1000);
                } else {
                    Materialize.toast($toastContent, 3000);
                }
            });
        });
    }

    //A function to send sms
    var sendSMS = function (message, number) {
        $str = "opt=7&number=" + number + "&message=" + message;
        sendRequest(str, function (data) {

        });
    }




    //This function will be used to send an Ajax call to a database
    function sendRequest(dataString, callback) {
        $.ajax({
            type: "POST",
            //url: "http://localhost/mobile_web/otw-server/OTW.php",
            url: "http://cs.ashesi.edu.gh/~csashesi/class2016/prophet-agyeman-prempeh/otw-server/OTW.php", //for web
            data: dataString,
            async: true,
            cache: false,
            success: function (data) {
                callback(data);
            }
        });
    }

    // An ajax call to save product
    var saveProduct = function () {
        $("#save-product").on('click', function () {
            var a = $("#event_name").val();
            var b = $("#event_rate").val();
            var c = $("#product_quant").val();
            var d = $("#event_id").val();
            var str = 'opt=1&event_name=' + a + '&event_rate=' + b + '&product_quant=' + c + '&event_id=' + d;
            sendRequest(str, function (data) {
                var $toastContent = $obj.message;
                Materialize.toast($toastContent, 3000);
            });
        });
    }

    //An ajax call to delete a product from the database
    var deleteEvent = function () {
        $("ul").on('click', 'li.events', function () {
            var _this=$(this);
            $('.delete-event').click(function () {
                $obj = JSON.parse(window.localStorage.getItem('credentials'));
                $myid = $obj.user_id;
                var id = $(this).prop("id");
                var str = 'opt=6&event_id=' + id + '&user_id=' + $myid;
                $(this).closest('li').hide();
                sendRequest(str, function (data) {
                    $obj = $.parseJSON(data);
                    var $toastContent = $obj.message;
                    Materialize.toast($toastContent, 3000);
                });
            });
        });

    }

    //An ajax call to edit a product in the database
    var viewDetails = function () {
        var id;
        // This part populates the form

        $("ul").on('click', 'li', function () {
            $(".img-placeholder").html('<img src="' + $(this).find('img').attr('src') + '"/>');
            $("#modal-view h4").html($(this).find('span.title').html());
        });

        // This part executes the edit function
        $("#view-product").click(function () {
            var a = $("#event_name_1").val();
            var b = $("#event_rate_1").val();
            var c = $("#product_quant_1").val();
            var d = $("#event_id_1").val();
            var str = 'opt=5&event_id=' + id + '&event_name=' + a + '&event_rate=' + b + '&product_quantity=' + c + '&event_id=' + d;
            sendRequest(str, function (data) {
                $obj = $.parseJSON(data);
                var $toastContent = $obj.message;
                Materialize.toast($toastContent, 3000);
            });


        });

    }




    // The barcode of the product is scanned and form is filled
    var addMyEvent = function () {
        var id;
        var currentQuantity;
        var barcode_id;
        $("#scan-btn-2").click(function () {
            //                        barcode_id = "354826";
            //                        $obj = sendRequest('opt=6&event_id=' + barcode_id);
            //                        alert($obj.data[0].event_id);
            //                        if ($obj.result == 0) {
            //                            alert("No Such Product");
            //                        } else {
            //                            id = $obj.data[0].event_id;
            //                            currentQuantity = $obj.data[0].product_quantity;
            //                            $("#event_name_2").val($obj.data[0].event_name);
            //                            $("#event_rate_2").val($obj.data[0].event_rate);
            //
            //                            $("#event_id_2").val($obj.data[0].event_id);
            //                        }
            cordova.plugins.barcodeScanner.scan(
                //check why its is alerting no such product when there is product
                function (result) {
                    $object = JSON.parse(window.localStorage.getItem('credentials'));
                    $str = "opt=5&user_id=" + $object.user_id + "&barcode=" + result.text;
                    sendRequest($str, function (data) {
                        $obj = $.parseJSON(data);
                        if ($obj.result == 0) {
                            alert("This event is not yet supported in Off The Wall:" + result.text);
                        } else {
                            var $toastContent = $obj.message;
                            Materialize.toast($toastContent, 3000);
                        }
                    });
                    fetchJSON();
                },
                function (error) {

                }
            );
        });
    }


    var purchaseTicket = function () {
        $('body').on('click', '#purchase_ticket', function () {
            $str = "opt=7&number=" + $.parseJSON(window.localStorage.getItem('credentials')).phone + "&event="+eventName;
            sendRequest($str, function (data) {
                var $toastContent = $.parseJSON(data).message;
                Materialize.toast($toastContent, 3000);
            });
        });
    }

    //A function that triggers the barcode scanner to append to the edit form
    var barcode = function () {
        $("#scan-btn, #scan-btn-1").click(function () {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    $("#event_id_1").val(result.text);
                    $("#event_id").val(result.text);
                },
                function (error) {

                }
            );
        });
    }


    // this function triggers the modal at the bottom of the screen to add data
    $('.add-product-trigger').leanModal({
        ready: function () {
            Materialize.toast('Add a product here', 2000);
        }, // Callback for Modal open
        complete: function () {} // Callback for Modal close
    });


    $("#purchase").leanModal({
        ready: function () {
            Materialize.toast('Save a purchase', 2000);
        }, // Callback for Modal open
        complete: function () {} // Callback for Modal close
    });





    // A series of functions that are bound to each list, an alternative for method delegation
    var list_control = function () {
        // this function triggers the modal at the bottom of the screen to add data
        $('.view-product').leanModal({
            ready: function () {
                Materialize.toast('Poster View', 2000);
            }, // Callback for Modal open
            complete: function () {} // Callback for Modal close
        });



        $(".view-receipt").leanModal({
            ready: function () {
            }, // Callback for Modal open
            complete: function () {} // Callback for Modal close
        });


    }


    var syncSystem = function () {
        $("#sync").click(function () {
            fetchJSON();
        });
    }



    //A function to login
    login();
    //logout function
    logout();
    //A function that populates the table
    syncSystem();
    //executes a barcode reader on phones
    barcode();
    //executes a save product function
    saveProduct();
    //A function that allows the user to view the details of a clicked list
    viewDetails();
    //a function that starts a barcode reader and adds the event to your list of events
    addMyEvent();
    //A function to delete an event
    deleteEvent();
    //A function called when a user decides to purchase a ticket
    purchaseTicket();
    //setEvent






});
