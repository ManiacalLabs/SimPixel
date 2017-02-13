# Driving SimPixel with BiblioPixel

SimPixel looks like just another of the many output drivers available [BiblioPixel](https://github.com/ManiacalLabs/BiblioPixel), except that you do not need hardware to run it. 

You can find full details about BiblioPixel on the [BiblioPixel Wiki](https://github.com/ManiacalLabs/BiblioPixel/wiki). This document tells you how to use the SimPixel driver specifically. 

Note: As of this writing, only BiblioPixel 3 is supported - it is available on BiblioPixel's `dev` branch [here](https://github.com/ManiacalLabs/BiblioPixel/tree/dev).

## Basic Example

``` python
from bibliopixel.drivers.SimPixel import DriverSimPixel
from bibliopixel import LEDMatrix
from bibliopixel.animation import MatrixCalibrationTest

w = 16
h = 16

driver = DriverSimPixel(w*h, port=1337, layout=None)
led = LEDMatrix(driver, width=w, height=h)

anim = MatrixCalibrationTest(led)
anim.run()
```

## Layouts

If you're familiar with Bibliopixel, you'll see very little difference between a hardware output driver and SimPixel. 

The big difference is that SimPixel requires a layout defining where each LED is inside the 3D space. You can make your own custom layouts, or if you don't specify one, the base LED classes in BiblioPixel (LEDStrip, LEDMatrix, LEDCube, and LEDCircle) use functions from `bibliopixel.layout` to provide a default layout for you.

A custom layout might look like this:

```python
strip_layout = [
    [0,0,0],
    [1,0,0],
    [2,0,0],
    ...
]

driver = DriverSimPixel(num, layout=strip_layout)
```
Each entry in the layout list is just a 3 value `[x,y,z]` coordinate representing the placement of the pixel at that index in the layout list. Note that regardless of the type of LED layout desired, you must always provide all three coordinates for each pixel, even if just 0.

Internally, BiblioPixel uses the methods available in `bibliopixel.layout` to automatically generate the pixel mapping and then the 3D layout required by SimPixel.
