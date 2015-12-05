//An Ajax call to fetch data from server
    fetchJSON = function () {
        $.when(
            // Part a populates listSection
            $obj = sendRequest("opt=1", function (data) {
                $obj = $.parseJSON(data);
            });
            var $toastContent = $obj.message; Materialize.toast($toastContent, 3000);
            var data = $obj.data;
            var top = '<li class="collection-header"><h4>Events</h4></li>';
            var mid = "";
            for (var i = 0; i < data.length; i++) {
                mid = mid + '<li class="collection-item avatar"><a class="lighten-2 view-product" href="#modal-view" id="' + data[i].event_id + '"><img src="data:image/jpeg;base64,' + data[i].event_picture + '" alt="" class="circle"/></a><span class="title">' + data[i].event_name + '</span><p>' + data[i].event_desc + '</p><span class="controls secondary-content"><a class="btn-floating teal lighten-2 delete-product" id="' + data[i].event_id + '"><i class="fa fa-2x fa-trash"></i></a></span></li>';
            }
            $("#listSection").html(top + mid),

            // Part B populates listsection2
            sendRequest("opt=2", function (data) {
                // Part C populates listsection3
                var $toastContent = $obj.message;
                Materialize.toast($toastContent, 3000);
                var data = $obj.data;
                var top = '<li class="collection-header"><h4>Tickets</h4></li>';
                var mid = "";
                for (var i = 0; i < data.length; i++) {
                    mid = mid + '<li class="collection-item avatar"><a class="lighten-2 view-product" href="#modal-view" id="' + data[i].event_id + '"><img src="data:image/jpeg;base64,' + data[i].event_picture + '" alt="" class="circle"/></a><span class="title">' + data[i].event_name + '</span><p>&cent;' + data[i].event_rate + '&nbsp </p><span class="controls secondary-content"><a class="btn-floating teal lighten-2 view-receipt" href="#modal-receipt" id=' + data[i].event_id + '"><img src="src/img/logo.png" alt="" class="circle"><i class="fa fa-eye"></i></a></span></li>';
                }
                $("#listSection3").html(top + mid);

                list_control(data);
            }),

                );









    }
