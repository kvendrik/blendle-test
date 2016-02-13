/**
    Smoothly scroll element to the given target (element.scrollTop)
    for the given duration

    Returns a promise that's fulfilled when done, or rejected if
    interrupted

    Source: https://coderwall.com/p/hujlhg/smooth-scrolling-without-jquery
    Modified by: Koen Vendrik <k.vendrik@gmail.com>
    Changes notes:
    * Removed Promise and theirby made it compatible with IE 9
    * Added optional success and error callback arguments
    * Added module.exports for Browsify
 */
module.exports = function(element, target, duration, success, error) {
    target = Math.round(target);
    duration = Math.round(duration);

    if(duration < 0) return;
    if(duration === 0) {
        element.scrollTop = target;
        return;
    }

    var resolve = function(msg){
        if(typeof success === 'function'){
            success(msg);
        }
    },
    reject = function(msg){
        if(typeof error === 'function'){
            error(msg);
        }
    };

    var start_time = Date.now();
    var end_time = start_time + duration;

    var start_top = element.scrollTop;
    var distance = target - start_top;

    // based on http://en.wikipedia.org/wiki/Smoothstep
    var smooth_step = function(start, end, point){
        if(point <= start) { return 0; }
        if(point >= end) { return 1; }
        var x = (point - start) / (end - start); // interpolation
        return x*x*(3 - 2*x);
    };

    // This is to keep track of where the element's scrollTop is
    // supposed to be, based on what we're doing
    var previous_top = element.scrollTop;

    // This is like a think function from a game loop
    var scroll_frame = function() {
        if(element.scrollTop != previous_top){
            reject("interrupted");
            return;
        }

        // set the scrollTop for this frame
        var now = Date.now();
        var point = smooth_step(start_time, end_time, now);
        var frameTop = Math.round(start_top + (distance * point));
        element.scrollTop = frameTop;

        // check if we're done!
        if(now >= end_time) {
            resolve();
            return;
        }

        // If we were supposed to scroll but didn't, then we
        // probably hit the limit, so consider it done; not
        // interrupted.
        if(element.scrollTop === previous_top
            && element.scrollTop !== frameTop) {
            resolve();
            return;
        }
        previous_top = element.scrollTop;

        // schedule next frame for execution
        setTimeout(scroll_frame, 0);
    }

    // boostrap the animation process
    setTimeout(scroll_frame, 0);
};