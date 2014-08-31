function CreateViewModel($tableElement) {

    var crudViewModel = {
        data: ko.observableArray([]),
        current: ko.observable({}),
        columns: ko.observableArray(
        [
            { name: 'Name', width: ko.observable(100) },
            { name: 'Description', width: ko.observable(250) },
            { name: 'Weight', width: ko.observable(60) },
            { name: 'Active', width: ko.observable(100), renderFunction: function(data) { return data ? '+' : '-'; } },
            { name: 'Options', width: ko.observable(130), templateName: "CrudSelect" },
            { name: 'Actions', width: ko.observable(130), templateName: "CrudActions" }
        ]),
        getColumnTemplateName: function(column) {
            return column.templateName ? column.templateName : 'CrudCell';
        },
        modalDisplay: ko.observable("none"),
        modalActionName: ko.observable(''),
        editItemClick: function (row) {
            this.current(row);
            this.modalActionName("Edit");
            this.modalDisplay('block');
        },
        createItemClick: function () {
            this.current({Id:0});
            this.modalActionName("Create");
            this.modalDisplay('block');
        },
        deleteItemClick: function (id) {
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
        moveColumn: function (index) {
            if (index > 0 && index < this.columns().length) {
                var temp = this.columns()[index];
                this.columns()[index] = this.columns()[index - 1];
                this.columns()[index - 1] = temp;
                this.columns(this.columns());
            }
        },
        resizeState: {
            currentColumnIndex: 0,
            pressed: 0,
            startX: 0,
            startWidth1: 0,
            startWidth2: 0
        },
        startResize: function (data, e) {
            if (e.target.className == "grip") {
                var state = this.resizeState;
                state.currentColumnIndex = +e.target.getAttribute("data-index");
                //cant use -   $(e.target).data("index");   - because of jQuery issue related to cache and reorder column functionality
                state.pressed = true;
                state.startX = e.pageX;
                state.startWidth1 = this.columns()[state.currentColumnIndex].width();
                if (this.columns().length > [state.currentColumnIndex + 1]) {
                    state.startWidth2 = this.columns()[state.currentColumnIndex + 1].width();
                }
            }
        },
        resize: function (pageX) {
            var state = this.resizeState;
            if (state.pressed) {
                this.columns()[state.currentColumnIndex].width(state.startWidth1 + (pageX - state.startX));
                if (this.columns().length > [state.currentColumnIndex + 1]) {
                    this.columns()[state.currentColumnIndex + 1].width(state.startWidth2 - (pageX - state.startX));
                }
            }
        },
        stopResize: function() {
            if (this.resizeState.pressed) {
                this.resizeState.pressed = false;
            }
        }
    };

    $(document).mousemove(function (e) { crudViewModel.resize(e.pageX); });
    $(document).mouseup(function () { crudViewModel.stopResize(); });

    ko.applyBindings(crudViewModel);
    crudViewModel.refresh();

    return crudViewModel.refresh;
};

var refreshCrudFunc = CreateViewModel($("table"));
