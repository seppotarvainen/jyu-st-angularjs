/**
 * Created by tarva on 19.11.2017.
 */

function ProjectListController() {
    var ctrl = this;

    /**
     * Handle select project event
     * @param project - project to select
     */
    ctrl.selectProject = function (project) {
        ctrl.onSelectProject({project: project});
    }
}

angular.module('myApp').component('projectList', {
    templateUrl: 'project/project-list.html',
    controller: ProjectListController,
    bindings: {
        projects: '<',
        selectedProject: '<',
        onSelectProject: '&'
    }
});