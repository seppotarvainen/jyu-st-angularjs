/**
 * Created by tarva on 19.11.2017.
 */

function MainController($scope, projectService) { // project-factory
    var ctrl = this;
    ctrl._isLocked = projectService.getLock();
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

        projectService.subscribeLock($scope, function (event, data) {
            ctrl._isLocked = data;
        });
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
     * Handle project view 'edit project' button
     * @param project - project to edit
     */
    ctrl.onClickEditProject = function (project) {
        ctrl.selectedProject = project;
        ctrl.isEditMode = true;
    };

    /**
     * Handle project form submit
     * @param project - project data
     */
    ctrl.onSubmitForm = function (project) {
        if (!project.id) {
            projectService.addProject(project).then(function (data) {
                ctrl.projects.push(data);
                ctrl.selectedProject = data;
                ctrl.isEditMode = false;
            });
        } else {
            ctrl.onEditProject(project);
        }
    };

    /**
     * Edit project
     * @param project - updated project
     */
    ctrl.onEditProject = function (project) {
        for (var i = 0; i < ctrl.projects.length; i++) {
            if (ctrl.projects[i].id === project.id) {
                ctrl.projects[i] = project;
                projectService.updateProject(project).then(function (data) {
                    ctrl.isEditMode = false;
                    ctrl.selectedProject = project;
                });
                break;
            }
        }
    };

    /**
     * Handle cancel form
     */
    ctrl.onCancelForm = function (project) {
        ctrl.isEditMode = false;
        ctrl.selectedProject = Boolean(project.id) ? project : null;
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