﻿(function() {

    var crudViewModel = {
        data: ko.observableArray([]),
        columns: ko.observableArray(
        [
            { name: 'Name', width: ko.observable(150)},
            { name: 'Description', width: ko.observable(300) },
            { name: 'Weight', width: ko.observable(70), renderFunction: function (data) { return "rendered" + data; } },
            { name: 'Actions', width: ko.observable(100), renderFunction: function(data, item) {
                return "<a href='/Crud/Edit/" + item.Id + "'>Edit</a>&nbsp;<a href='/Crud/Delete/" + item.Id + "'>Delete</a>";
            } }
        ])
    };


    ko.applyBindings(crudViewModel);

    $.ajax({
        url: '/Crud/Items',
        type: 'POST',
        success: function(data) {
            crudViewModel.data(data);
            headerResize($("#crudTable"));
        }
    });

    headerDrag($("#crudTable"), crudViewModel);
    
}());

function headerDrag(table, model) {
    var pressed = false;
    var currentIndex = undefined;
    var startX, startWidth1, startWidth2;

    table.find("thead tr").mousedown(function (e) {
        if (e.target.className == "grip") {
            currentIndex = $(e.target).data("index");
            pressed = true;
            startX = e.pageX;
            startWidth1 = model.columns()[currentIndex].width();
            if (model.columns().length > [currentIndex + 1]) {
                startWidth2 = model.columns()[currentIndex + 1].width();
            }
        } else {
            
        }
    });

    $(document).mousemove(function (e) {
        if (pressed) {
            model.columns()[currentIndex].width(startWidth1 + (e.pageX - startX));
            if (model.columns().length > [currentIndex + 1]) {
                model.columns()[currentIndex + 1].width(startWidth2 - (e.pageX - startX));
            }
        }
    });

    $(document).mouseup(function () {
        if (pressed) {
            pressed = false;
        }
    });
};

function headerResize(table) {
    var $bodyCells = table.find('tbody tr:first').children(),
        colWidth;

    $(window).resize(function() {
        colWidth = $bodyCells.map(function() {
            return $(this).width();
        }).get();

        table.find('thead tr').children().each(function (i, v) {
            $(v).width(colWidth[i]);
        });
    }).resize();
};


var modal = document.getElementById('modal');
var shade = document.getElementById('shade');
document.getElementById('start').onclick = function () {
    modal.style.display = shade.style.display = 'block';
};
$('.submitCrud').click(function () {
    //modal.style.display = shade.style.display = 'none';
});