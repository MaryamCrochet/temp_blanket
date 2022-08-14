//creates color picker
const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'monolith',
    default: '#9D9595',
    swatches: ['red'],
    comparison: false, //changes little square's color without having to save it
    components: {
        preview: true,
        hue: true,
        interaction: {
            input: true,
            save: true
        }
    }
});

const rectangle = document.querySelector('.rectangle-test');
pickr.on('change', (color) => { //changes the rectangle color in real time
    rectangle.style.backgroundColor = color.toRGBA();
    //console.log(rectangle.style.backgroundColor);
}).on('hide', () => {
    pickr.addSwatch(rectangle.style.backgroundColor); //creates swatch when exiting picker
    if (pickr._swatchColors.length > 16) { //16 swatches max
        pickr.removeSwatch(0);
    }
    //console.log(pickr._swatchColors);
}).on('save', () => {
    pickr.addSwatch(rectangle.style.backgroundColor);
});
