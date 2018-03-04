/**
 * Created by tarva on 19.11.2017.
 */

function ProjectFormController() {
    var ctrl = this;

    /**
     * Constructor
     */
    ctrl.main = function () {
        ctrl.projectCopy = JSON.parse(JSON.stringify(ctrl.project));
    };

    /**
     * Submit form
     */
    ctrl.submitForm = function () {
        ctrl.onSubmitForm({project: ctrl.projectCopy});
    };

    /**
     * Cancel form
     */
    ctrl.cancelForm = function () {
        ctrl.onCancelForm();
    };

    /**
     * Show project title. If no title is found,
     * return some default text
     *
     * @returns {string}
     */
    ctrl.showProjectHeading = function () {
        if (ctrl.projectCopy && ctrl.projectCopy.title.length > 0) {
            return ctrl.projectCopy.title;
        }
        return "Project title";
    };

    ctrl.main();
}

angular.module('myApp').component('projectForm', {
    templateUrl: 'project/project-form.html',
    controller: ProjectFormController,
    bindings: {
        project: '<',
        onSubmitForm: '&',
        onCancelForm: '&'
    }
});