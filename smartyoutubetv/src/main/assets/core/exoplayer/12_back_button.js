console.log("Scripts::Running core script back_button.js");

/**
 * Checks that player is running and performs button press until success.
 * @param selector button selector
 */
function BackButton(selector) {
    this.selector = selector;
    this.retryTimes = 10;
    this.checkDelayMS = 1000;

    this.retryOnFail = function() {
        if (this.retryTimes <= 0 || ExoUtils.playerIsClosed()) {
            return;
        }
        this.retryTimes--;

        EventUtils.triggerEnter(this.findToggle());

        var $this = this;
        setTimeout(function() {
            console.log("BackButton: attempt to press on the element: " + $this.selector);
            $this.retryOnFail();
        }, this.checkDelayMS);
    };

    this.getChecked = function() {
        console.log("BackButton: getChecked " + this.selector);
        return null; // no state
    };

    this.setChecked = function(doChecked) {
        console.log("BackButton: setChecked " + this.selector + " " + doChecked);
        if (doChecked) {
            ExoUtils.showPlayerBg();
            var $this = this;
            // 'likes not saved' fix
            setTimeout(function() {
                $this.retryOnFail();
            }, this.checkDelayMS);
        }
    };
}

BackButton.prototype = new ExoButton();