/**
 * Created by tarva on 31.12.2017.
 */

function ChecklistController() {
    var ctrl = this;

    ctrl.main = function () {
        ctrl.isEditMode = false;
        ctrl.newContent = "";
    };

    /**
     * Set checklist view to form mode
     */
    ctrl.clickAddItem = function () {
        ctrl.isEditMode = true;
    };

    /**
     * Cancel new item
     */
    ctrl.cancelItem = function () {
        ctrl.isEditMode = false;
        ctrl.newContent = "";
    };

    /**
     * Add new checklist item to project
     * @param content - item content
     */
    ctrl.addItem = function (content) {
        ctrl.onAddItem({item: {content: content}}).then(function () {
            ctrl.newContent = "";
            ctrl.isEditMode = false;
        });
    };

    /**
     * Set checklist item as done
     */
    ctrl.setItemDone = function (item) {
        ctrl.onUpdateItem({item: item});
    };

    /**
     * Remove done items
     */
    ctrl.removeDoneItems = function () {
        ctrl.onRemoveDoneItems();
    };

    ctrl.main();
}

angular.module('myApp').component('checklist', {
    templateUrl: 'checklist/checklist.html',
    controller: ChecklistController,
    bindings: {
        checklist: '<',
        onUpdateItem: '&',
        onRemoveDoneItems: '&',
        onAddItem: '&'
    }
});