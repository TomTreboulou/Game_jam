var canvas  = document.querySelector('#canvas');

var context = canvas.getContext('2d');

var zozor = new Image();

    zozor.src = 'test.png';

    zozor.addEventListener('load', function() {

        context.drawImage(zozor, 35, 35);

    });