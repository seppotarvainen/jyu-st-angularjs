/**
 * Created by tarva on 19.11.2017.
 */

function ProjectViewController(projectService) {
    var ctrl = this;

    /**
     * Delete current project
     */
    ctrl.deleteProject = function () {
        ctrl.onDeleteProject({project: ctrl.project});
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
    }
}

angular.module('myApp').component('projectView', {
    templateUrl: 'project/project-view.html',
    controller: ProjectViewController,
    bindings: {
        project: '<',
        onDeleteProject: '&'
    }
});