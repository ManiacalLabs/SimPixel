from bibliopixel.drivers.webvis import DriverWebVis
from bibliopixel import LEDMatrix, log, MatrixRotation, colors
from bloom import Bloom
import time
import sys

log.setLogLevel(log.DEBUG)

driver = DriverWebVis(9, port=6666)
led = LEDMatrix(driver, coordMap=None,
                rotation=MatrixRotation.ROTATE_0, vert_flip=False, serpentine=True,
                threadedUpdate=False, masterBrightness=255, pixelSize=(1, 1))

c_list = [colors.Red, colors.Green, colors.Blue, colors.White]

try:
    anim = Bloom(led, dir=True)
    anim.run(amt=6, fps=1)
    # pass
finally:
    log.debug('Force close server')
    driver.server.close()
    time.sleep(2)
    sys.exit()
