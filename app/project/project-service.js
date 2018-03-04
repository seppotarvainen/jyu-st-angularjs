/**
 * Created by tarva on 19.11.2017.
 */

function ProjectService(rootScope, http) {
    var projectService = this;

    var URL = "http://localhost:8080/projects";

    projectService._lock = false;

    /**
     * Load all projects
     * @returns {Promise} - list of projects
     */
    projectService.loadProjects = function () {
        return http.get(URL).then(function (response) {
            return response.data;
        });
    };

    /**
     * Add new project
     * @param project - project data
     * @returns {Promise} - added project
     */
    projectService.addProject = function (project) {
        return http.post(URL, project).then(function (response) {
            return response.data;
        })
    };

    /**
     * Delete project
     * @param project - project to delete
     * @returns {Promise} - null
     */
    projectService.deleteProject = function (project) {
        return http.delete(URL + "/" + project.id).then(function (response) {
            return response.data;
        })
    };

    /**
     * Update project
     * @param project - project to update
     * @returns {Promise} - updated project
     */
    projectService.updateProject = function (project) {
        return http.put(URL + "/" + project.id, project).then(function (response) {
            return response.data;
        })
    };

    /**
     * Add checklist item to project
     * @param projectId - project of the new checklist item
     * @param checklistItem - checklist item
     * @returns {Promise} - new checklist item
     */
    projectService.addChecklistItem = function (projectId, checklistItem) {
        return http.post(URL + "/" + projectId + "/checklist-items", checklistItem).then(function (response) {
            return response.data;
        })
    };

    /**
     * Update project's checklist item
     * @param projectId - project containing checklist item
     * @param itemId - checklist item id
     * @param checklistItem - checklist item data
     * @returns {Promise} - updated checklist item
     */
    projectService.updateChecklistItem = function (projectId, itemId, checklistItem) {
        return http.put(URL + "/" + projectId + "/checklist-items/" + itemId, checklistItem).then(function (response) {
            return response.data;
        })
    };

    projectService.subscribeLock = function (scope, callback) {
        var handler = rootScope.$on('lock', callback);
        scope.$on('$destroy', handler);
    };

    projectService.setLock = function (lockState) {
        projectService._lock = lockState;
        rootScope.$emit('lock', lockState);
    };

    projectService.getLock = function () {
        return projectService._lock;
    };

    return projectService;
}

angular.module('myApp').factory('projectService', ['$rootScope', '$http', ProjectService]);