(function() {

    var crudViewModel = {
        data: ko.observableArray([]),
        columns: ko.observableArray(
        [
            { name: 'Name', width: ko.observable(200)},
            { name: 'Description', width: ko.observable(500) },
            { name: 'Weight', width: ko.observable(20), renderFunction: function (data) { return "custom rendered" + data; } },
            { name: 'Actions', width: ko.observable(100), renderFunction: function(data, item) {
                return "<a href='/Crud/Edit/" + item.Id + "'>Edit</a>&nbsp;<a href='/Crud/Delete/" + item.Id + "'>Delete</a>";
            } }
        ])
    };


    ko.applyBindings(crudViewModel);

    $.ajax({
        url: '/CrudTable/List',
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
    var startX, startWidth;

    table.find("thead tr").mousedown(function (e) {
        if (e.target.className == "grip") {
            currentIndex = $(e.target).data("index");
            pressed = true;
            startX = e.pageX;
            startWidth = model.columns()[currentIndex].width();
        } else {
            
        }
    });

    $(document).mousemove(function (e) {
        if (pressed) {
            model.columns()[currentIndex].width(startWidth + (e.pageX - startX));
            model.columns()[currentIndex + 1].width(startWidth - (e.pageX - startX));
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