const Scene = require('Scene');
const Animation = require('Animation');
const Patches = require('Patches');
const Diagnostics = require('Diagnostics');

var driver = Animation.timeDriver({durationMilliseconds: 500});
var sampler = Animation.samplers.linear(0, - 0.5);

Promise.all([
    Scene.root.findFirst('bicycle'),
]).then(results => {
    var cycle = results[0];
    var numberText;

    Patches.outputs.getScalar('diceNum').then(val => {
        val.monitor().subscribe(({newValue}) => {
            numberText = newValue.toString();
            var lastPos = cycle.transform.z.lastValue;
            var newPos = lastPos - 0.5;
            Diagnostics.log(lastPos);
            driver = Animation.timeDriver({durationMilliseconds: 500});
            sampler = Animation.samplers.linear(lastPos, newPos);
            cycle.transform.z = Animation.animate(driver, sampler);
            driver.start();
            Patches.inputs.setString('diceText', numberText);
        })
    }) 
    
    
})

