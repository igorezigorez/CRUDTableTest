function CreateViewModel() {
    var crudViewModel = {
        data: ko.observableArray([]),
        columns: ko.observableArray(
        [
            { name: 'Name', width: ko.observable(100) },
            { name: 'Description', width: ko.observable(250) },
            { name: 'Weight', width: ko.observable(60) },
            { name: 'Checked', width: ko.observable(100), renderFunction: function(data) { return data ? '+' : '-'; } },
            { name: 'Options', width: ko.observable(130), templateName: "CrudSelect" },
            { name: 'Actions', width: ko.observable(130), templateName: "CrudActions" }
        ]),
        getColumnTemplateName: function(column) {
            return column.templateName ? column.templateName : 'CrudCell';
        },
        modalDisplay: ko.observable("none"),
        deleteitem: function(id) {
            $.ajax({
                url: '/Crud/Delete',
                type: 'POST',
                data: 'id=' + id,
                success: function() {
                    crudViewModel.refresh();
                }
            });
        },
        refresh: function() {
            $.ajax({
                url: '/Crud/Items',
                type: 'POST',
                success: function(data) {
                    crudViewModel.data(data);
                }
            });
        },

        currentColumnIndex: 0,
        pressed: 0,
        startX: 0,
        startWidth1: 0,
        startWidth2: 0,

        startResize: function(data, e) {
            if (e.target.className == "grip") {
                this.currentColumnIndex = $(e.target).data("index");
                this.pressed = true;
                this.startX = e.pageX;
                this.startWidth1 = this.columns()[this.currentColumnIndex].width();
                if (this.columns().length > [this.currentColumnIndex + 1]) {
                    this.startWidth2 = this.columns()[this.currentColumnIndex + 1].width();
                }
            }
        },
        resize: function (pageX) {
            if (this.pressed) {
                this.columns()[this.currentColumnIndex].width(this.startWidth1 + (pageX - this.startX));
                if (this.columns().length > [this.currentColumnIndex + 1]) {
                    this.columns()[this.currentColumnIndex + 1].width(this.startWidth2 - (pageX - this.startX));
                }
            }
        },
        stopResize: function() {
            if (this.pressed) {
                this.pressed = false;
            }
        },
    };

    $(document).mousemove(function (e) { crudViewModel.resize(e.pageX); });
    $(document).mouseup(function () { crudViewModel.stopResize(); });

    ko.applyBindings(crudViewModel);
    crudViewModel.refresh();

    return crudViewModel;
};

var viewModel = CreateViewModel();
