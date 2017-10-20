(function(){

    $( "button#removeImage" ).bind( "click", function(e) {
        e.preventDefault();
        $.Zebra_Dialog('Czy napewno chcesz usunąć zdjęcie?', {
            'type':     'question',
            'title':    'Usuwanie zdjęcia',
            'buttons':  [
                            {caption: 'Tak', callback: function() {                                                                
                                $( "form#imageDelete" ).submit();
                                // $("tbody#reclamationRows").append(localStorage.content);                               
                            }},
                            {caption: 'Anuluj', callback: function() {}}
                        ]
        });
    });

    $( "button#changeStatusImage" ).bind( "click", function(e) {
        e.preventDefault();
        $.Zebra_Dialog('Czy napewno chcesz zmienić status zdjęcia?', {
            'type':     'question',
            'title':    'Zmiana statusu zdjęcia',
            'buttons':  [
                            {caption: 'Tak', callback: function() {                                                                
                                $( "form#imageStatus" ).submit();
                                // $("tbody#reclamationRows").append(localStorage.content);                               
                            }},
                            {caption: 'Anuluj', callback: function() {}}
                        ]
        });
    });

    // $( "button#changeStatusButton" ).bind( "click", function(e) {
    //     e.preventDefault();
    //     $.Zebra_Dialog('Czy napewno chcesz zmienić status reklamacji? <br><br> <b>Uwaga!</b><br>Jeżeli zmienisz status na "Rozpatrzona", reklamacja zostanie przesłana do ajenta.', {
    //         'type':     'warning',
    //         'title':    'Zmiana statusu',
    //         'buttons':  [
    //                         {caption: 'Tak', callback: function() { $( "form#reclamationStatus" ).submit(); }},
    //                         {caption: 'Anuluj', callback: function() {}}
    //                     ]
    //     });
    // });

    // $( "button#changeStatusButtonDptif" ).bind( "click", function(e) {
    //     e.preventDefault();
    //     $.Zebra_Dialog('Czy napewno chcesz zwrócić reklamację do Działu Inwentaryzacji?', {
    //         'type':     'warning',
    //         'title':    'Zwrot reklamacji do Działu Inwentaryzacji',
    //         'buttons':  [
    //                         {caption: 'Tak', callback: function() { $( "form#reclamationStatus" ).submit(); }},
    //                         {caption: 'Anuluj', callback: function() {}}
    //                     ]
    //     });
    // });

    // $("tbody td#clickForChangeStatus span#Audyt").bind( "click", function(e) {
    //     that = this;
    //     e.preventDefault();
    //     $.Zebra_Dialog('Jaki status chcesz ustawić?', {
    //         'type':     'question',
    //         'title':    'Zmiana statusu obiegówki',
    //         'buttons':  [
    //                         {caption: 'Sprawdzanie', callback: function() {

    //                             $.ajax({
    //                                 url: "/estimateChangeStatus",
    //                                 method: "POST",
    //                                 data: {
    //                                         id: that.getAttribute("name"),
    //                                         status: 'Sprawdzanie'
    //                                 }
    //                             }).done(function(data) {
    //                                 //    $("span#Audyt[name=" +  that.getAttribute("name") + "]").html(data.actuallStatus).removeClass();
    //                                 //    $("span#Audyt[name=" +  that.getAttribute("name") + "]").addClass('btn btn-sm btn-info');
    //                                    window.location.reload();
    //                                 });
    //                         }},

    //                         {caption: 'Rozliczona', callback: function() {

    //                             $.ajax({
    //                                 url: "/estimateChangeStatus",
    //                                 method: "POST",
    //                                 data: {
    //                                         id: that.getAttribute("name"),
    //                                         status: 'Rozliczona'
    //                                 }
    //                             }).done(function(data) {
    //                                 //    $("span#Audyt[name=" +  that.getAttribute("name") + "]").html(data.actuallStatus).removeClass();
    //                                 //    $("span#Audyt[name=" +  that.getAttribute("name") + "]").addClass('btn btn-sm btn-success');
    //                                    window.location.reload();
    //                                 });
    //                         }},
    //                         {caption: 'Anuluj', callback: function() {}}
    //                     ]
    //     });
    // });

    // $("tbody td#clickForChangeStatus span#Sprawdzanie").bind( "click", function(e) {
    //     that = this;
    //     e.preventDefault();
    //     $.Zebra_Dialog('Czy napewno chcesz zmienić status na "Rozliczona"?', {
    //         'type':     'question',
    //         'title':    'Zmiana statusu obiegówki',
    //         'buttons':  [
    //                         {caption: 'Tak', callback: function() {

    //                             $.ajax({
    //                                 url: "/estimateChangeStatus",
    //                                 method: "POST",
    //                                 data: {
    //                                         id: that.getAttribute("name"),
    //                                         status: 'Rozliczona'
    //                                 }
    //                             }).done(function(data) {
    //                                 //    $("span#Sprawdzanie[name=" +  that.getAttribute("name") + "]").html(data.actuallStatus).removeClass();
    //                                 //    $("span#Sprawdzanie[name=" +  that.getAttribute("name") + "]").addClass('btn btn-sm btn-success');
    //                                    window.location.reload();
    //                                 });
    //                         }},
    //                         {caption: 'Anuluj', callback: function() {}}
    //                     ]
    //     });
    // });

    // $( "button#sendEstimateToAudyt" ).bind( "click", function(e) {
    //     e.preventDefault();
    //     $.Zebra_Dialog('Czy napewno chcesz zwrócić obiegówkę do Działu Inwentaryzacji?', {
    //         'type':     'warning',
    //         'title':    'Zwrot obiegówki do Działu Inwentaryzacji',
    //         'buttons':  [
    //                         {caption: 'Tak', callback: function() { $( "form#estimationStatus" ).submit(); }},
    //                         {caption: 'Anuluj', callback: function() {}}
    //                     ]
    //     });
    // });

})()