from bibliopixel.animation.matrix import BaseCubeAnim
import bibliopixel.colors as colors


class cuby(BaseCubeAnim):

    def __init__(self, led, color=[colors.Red]):
        super(cuby, self).__init__(led)
        self.colors = colors
        self.color_index = 0
        self.max = max([self.x, self.y, self.z])

    def step(self, amt=1):
        self._led.all_off()

        for x in range(self.max):
            for y in range(self.max):
                for z in range(self.max):
                    self._led.set(x, y, z, self.colors[self.color_index])

        self._step += amt
        if(self._step >= self.max):
            self._step = 0
            self.color_index += 1
            if self.color_index >= len(self.colors):
                self.color_index = 0
