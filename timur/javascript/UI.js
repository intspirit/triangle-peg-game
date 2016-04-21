/**
 * Created with JetBrains PhpStorm.
 * User: timur
 * Date: 6/6/13
 * Time: 3:25 PM
 * To change this template use File | Settings | File Templates.
 */

function addHandler(el, event, handler){
    if (el.addEventListener) {
        el.addEventListener(event, handler, false);
    } else {
        el.attachEvent('on' + event, handler);
    }
}
