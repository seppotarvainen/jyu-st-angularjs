/**
 * Created by tarva on 19.11.2017.
 */

function ProjectViewController($scope, projectService) {
    var ctrl = this;
    ctrl._isLocked = projectService.getLock();

    ctrl.main = function () {
        projectService.subscribeLock($scope, function (event, data) {
            ctrl._isLocked = data;
        });
    };

    /**
     * Set project to edit
     */
    ctrl.clickEditProject = function () {
        ctrl.onClickEditProject({project: ctrl.project})
    };

    /**
     * Delete current project
     */
    ctrl.deleteProject = function () {
        ctrl.onDeleteProject({project: ctrl.project});
    };

    /**
     * Toggle project done state
     * @param value - new project done state
     */
    ctrl.setProjectDone = function (value) {
        ctrl.project.done = value;
        ctrl.onEditProject({project: ctrl.project});
    };

    /**
     * Update project time
     * @param time - new project time
     */
    ctrl.onUpdateTime = function (time) {
        ctrl.project.timeInSeconds = time;
        projectService.updateProject(ctrl.project).then(function (data) {
            ctrl.project = data;
        });
    };

    /**
     * Add checklist item to project
     * @param item - checklist item to add
     */
    ctrl.onAddChecklistItem = function (item) {
        return projectService.addChecklistItem(ctrl.project.id, item).then(function (data) {
            ctrl.project.checklist.push(data);
        });
    };

    /**
     * Update project checklist item
     * @param item - checklist item to update
     */
    ctrl.onUpdateChecklistItem = function (item) {
        projectService.updateChecklistItem(ctrl.project.id, item.id, item);
    };

    /**
     * Remove all done checklist items from current project
     */
    ctrl.onRemoveDoneChecklistItems = function () {
        projectService.deleteDoneChecklistItems(ctrl.project.id).then(function () {
            var notDone = [];
            var checklistItems = ctrl.project.checklist;
            for (var i = 0; i < checklistItems.length; i++) {
                if (!checklistItems[i].done) {
                    notDone.push(checklistItems[i])
                }
            }
            ctrl.project.checklist = notDone;
        });

    };

    ctrl.main();
}

angular.module('myApp').component('projectView', {
    templateUrl: 'project/project-view.html',
    controller: ProjectViewController,
    bindings: {
        project: '<',
        onEditProject: '&',
        onClickEditProject: '&',
        onDeleteProject: '&'
    }
});