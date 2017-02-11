# Driving SimPixel with BiblioPixel

Just like any other output target for [BiblioPixel](https://github.com/ManiacalLabs/BiblioPixel), SimPixel is just another of the many output drivers available. As such, you can find full details about BiblioPixel usage on the [BiblioPixel Wiki](https://github.com/ManiacalLabs/BiblioPixel/wiki). Instead this will focus on the SimPixel output Driver usage. Note: As of the writing of this, only BiblioPixel 3 is supported and is available in the `dev` branch.

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

As you can see, there's not really much different

## Layouts

As you can see from above, there's very little difference between outputting to actual hardware and SimPixel. But one thing that SimPixel requires is a layout defining where each LED is inside the 3D space. All of the base LED classes in BiblioPixel (LEDStrip, LEDMatrix, LEDCube, and LEDCircle) will attempt to automatically generate a best guess layout and pass it to SimPixel.

However, you can also pass DriverSimPixel any layout you would like via the `layout` parameter.

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
