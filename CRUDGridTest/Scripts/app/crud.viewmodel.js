(function() {

    var crudViewModel = {
        data: ko.observableArray([]),
        columns: ko.observableArray(
        [
            { columnName: 'Name', width: 100 },
            { columnName: 'Description', width: 200 },
            { columnName: 'Weight', width: 20 },
            { columnName: 'Actions', width: 100 },
        ])
    };


    ko.applyBindings(crudViewModel);

    console.log("2");
    headerDrag($("#crudTable thead tr"));

    $.ajax({
        url: '/CrudTable/List',
        type: 'POST',
        success: function (data) {
            crudViewModel.data(data);
        }
    });
}())

console.log("1");
function headerDrag(tableHeaderRow) {

    debugger;
    var pressed = false;
    var start = undefined;
    var startX, startWidth;

    tableHeaderRow.mousedown(function (e) {
        start = $(this);
        pressed = true;
        startX = e.pageX;
        startWidth = $(this).width();
    });

    $(document).mousemove(function (e) {
        if (pressed) {
            $(start).width(startWidth + (e.pageX - startX));
        }
    });

    $(document).mouseup(function () {
        if (pressed) {
            pressed = false;
        }
    });
};