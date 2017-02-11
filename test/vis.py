from bibliopixel.drivers.SimPixel import DriverSimPixel
from bibliopixel import LEDMatrix, log, colors, LEDCube, Rotation, LEDCircle
from bibliopixel.led.coord_map import gen_cube, gen_circle, layout_from_rings
from bloom import Bloom
from cuby import cuby
from BiblioPixelAnimations.circle.diag import Diag
from spectrum import Spectrum
from simplex import Simplex
import time
import sys

log.setLogLevel(log.DEBUG)

driver = DriverSimPixel(1024, layout=None)
led = LEDMatrix(driver, width=32, height=32, coordMap=None,
                rotation=Rotation.ROTATE_0, vert_flip=False, serpentine=True,
                threadedUpdate=False, masterBrightness=255, pixelSize=(1, 1))

# x, y, z = (12, 12, 12)
# driver = DriverSimPixel(x * y * z, layout=None)
# led = LEDCube(driver, x, y, z, coordMap=None,
#               threadedUpdate=False, masterBrightness=255)

# pixels_per = [1, 4, 8, 12, 18, 24, 32, 40, 52, 64]
# rings, steps = gen_circle(rings=None, pixels_per=pixels_per, offset=0, invert=False)
# layout = layout_from_rings(rings, origin=(0, 0, 0), z_diff=8)
# driver = DriverSimPixel(sum(pixels_per), layout=layout)
# led = LEDCircle(driver, rings=rings, maxAngleDiff=0)


def shutdown():
    log.debug('Force close server')
    driver.server.close()
    time.sleep(2)
    sys.exit()


try:
    if isinstance(led, LEDMatrix):
        anim = Bloom(led, dir=True)
        anim.run(amt=2, fps=60)
    elif isinstance(led, LEDCube):
        # anim = cuby(led, color_list=c_list)
        # anim.run(amt=1, fps=8)
        anim = Simplex(led, freq=16, octaves=1)
        anim.run(amt=1, fps=30)
        # anim = Spectrum(led, vis_list=['Spread'], steps_per_vis=None,
        #                 bins=12, max_freq=4000, log_scale=True, auto_gain=False, gain=3)
        anim.run(amt=1, fps=8)
    elif isinstance(led, LEDCircle):
        anim = Diag(led, turns=1, angle=6, direction=False)
        anim.run(amt=6, fps=20)
except Exception as e:
    shutdown()
    raise
finally:
    shutdown()

shutdown()
