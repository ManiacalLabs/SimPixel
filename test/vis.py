from bibliopixel.drivers.webvis import DriverWebVis
from bibliopixel import LEDMatrix, log, colors, LEDCube, Rotation
from bibliopixel.led.coord_map import gen_cube
from bloom import Bloom
from cuby import cuby
import time
import sys

log.setLogLevel(log.DEBUG)

driver = DriverWebVis(256, point_list=None)
led = LEDMatrix(driver, coordMap=None,
                rotation=Rotation.ROTATE_0, vert_flip=False, serpentine=True,
                threadedUpdate=False, masterBrightness=255, pixelSize=(1, 1))

# x, y, z = (6, 6, 6)
# driver = DriverWebVis(x * y * z, port=6666, point_list=None)
# led = LEDCube(driver, x, y, z, coordMap=gen_cube(x, y, z),
#               threadedUpdate=False, masterBrightness=255)


c_list = [colors.Red, colors.Green, colors.Blue, colors.White]


def shutdown():
    log.debug('Force close server')
    driver.server.close()
    time.sleep(2)
    sys.exit()


try:
    if isinstance(led, LEDMatrix):
        anim = Bloom(led, dir=True)
        anim.run(amt=6, fps=30)
    elif isinstance(led, LEDCube):
        anim = cuby(led, color_list=c_list)
        anim.run(amt=1, fps=4)
except Exception:
    shutdown()
    raise
finally:
    shutdown()

shutdown()
