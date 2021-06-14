/**
 * This utility binds a randomized hotkey to each element selected by `selector`. 
 * Also adds a visual reference indicating the hotkey right before the element's text node.
 * Then listens to `keyup` and handles the hotkeys assigned, by calling .click(), when fired.
 * @author Lautaro Capella <laucape@gmail.com>
 * @param {String} selector Parameter for querySelector to select elements to be random-hotkey-ized. Default: ".rHK"
 */
export function randomizeHotKeys(_selector) {
    var _keyBindingDict = {};
    document.querySelectorAll(_selector || '.rHK')
        .forEach(rhkEl => {
            var _randomizedKey;
            if (Object.keys(_keyBindingDict).length < 26) {
                do {
                    _randomizedKey = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' [Math.floor(Math.random() * 26)];
                } while (_randomizedKey in _keyBindingDict);
            } else {
                // TODO: All abecedary used: Implement another solution
                console.error("Nos quedamos sin letras!!!");
            }
            _keyBindingDict[_randomizedKey] = rhkEl;
            rhkEl.insertBefore(document.createTextNode(`[${_randomizedKey}] `),
                Array.from(rhkEl.childNodes).find(ch => ch.nodeType === Node.TEXT_NODE));
        });
    document.body.addEventListener('keyup', e => {
        var _pressedKey = e.key.toUpperCase();
        if (_pressedKey in _keyBindingDict) {
            // _keyBindingDict[_pressedKey].style = "transform:scale(1.2) rotate(-8deg)"; // TODO: Remove
            _keyBindingDict[_pressedKey].click();
        }
    });
    // console.log(_keyBindingDict); // TODO: Remove
}