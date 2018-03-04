/**
 * Created by tarva on 19.11.2017.
 */

function MainController(projectService) { // project-factory
    var ctrl = this;

    /**
     * Constructor
     */
    ctrl.main = function () {
        ctrl.isEditMode = false;

        projectService.loadProjects().then(function (data) {
                ctrl.projects = data;
                ctrl.selectedProject = ctrl.projects[0]
            }
        );
    };

    /**
     * Handle project selection
     * @param project - project to select
     */
    ctrl.onSelectProject = function (project) {
        ctrl.selectedProject = project;
    };

    /**
     * Set project view edit mode
     * @param value - boolean, is edit mode on or not
     */
    ctrl.onSetEditMode = function (value) {
        ctrl.isEditMode = value;
    };

    /**
     * Handle click 'add project' button
     */
    ctrl.clickAddProject = function () {
        ctrl.selectedProject = {title: "", description: ""};
        ctrl.isEditMode = true;
    };

    /**
     * Handle project form submit
     * @param project - project data
     */
    ctrl.onSubmitForm = function (project) {
        projectService.addProject(project).then(function (data) {
            ctrl.projects.push(data);
            ctrl.selectedProject = data;
            ctrl.isEditMode = false;
        });
    };

    /**
     * Handle cancel form
     */
    ctrl.onCancelForm = function () {
        ctrl.isEditMode = false;
        ctrl.selectedProject = null;
    };

    /**
     * Handle delete project
     * @param project - project to delete
     */
    ctrl.onDeleteProject = function (project) {
        projectService.deleteProject(project).then(function (data) {
            ctrl.projects = ctrl.projects.filter(function (p) {
                return p.id !== project.id;
            });
            ctrl.selectedProject = null;
        });
    };

    ctrl.main();
}

angular.module('myApp').component('mainView', {
    templateUrl: 'layout/main-view.html',
    controller: MainController
});