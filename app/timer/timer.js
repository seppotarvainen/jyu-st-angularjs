/**
 * Created by tarva on 19.11.2017.
 */

function TimerController($interval) {
    var ctrl = this;

    /**
     * Constructor
     */
    ctrl.main = function () {
        ctrl.currentTime = 0;
        ctrl.running = false;
        ctrl.timer = null;
    };

    /**
     * Toggle timer on and off.
     */
    ctrl.toggleTimer = function () {
        ctrl.running = !ctrl.running;
        if (ctrl.running) {
            ctrl.timer = $interval(ctrl.tick, 1000);
        } else {
            ctrl.onUpdateTime({time: ctrl.time + ctrl.currentTime});
            ctrl.currentTime = 0;
            $interval.cancel(ctrl.timer);
        }
    };

    /**
     * Tick timer
     */
    ctrl.tick = function () {
        ctrl.currentTime += 1;
    };

    /**
     * Get time in format: {hours]h {minutes]min {seconds]s
     * @param seconds - time in seconds
     * @returns {string}
     */
    ctrl.getTime = function (seconds) {
        var h = Math.floor(seconds / 3600);
        var m = Math.floor((seconds / 60) % 60);
        var s = seconds % 60;

        return h + "h " + m + "min " + s + "s";
    };

    ctrl.main();
}

angular.module('myApp').component('timer', {
    templateUrl: 'timer/timer.html',
    controller: TimerController,
    bindings: {
        time: '<',
        onUpdateTime: '&'
    }
});